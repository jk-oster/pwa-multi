/**
 * KWM Model
 *
 * - stores application data
 * - handles data requests, and data updates through REST
 *
 * @author Jakob Osterberger - 2022-04-05
 */
export default class KWM_Model {
    constructor() {
        this.user;          // id, nicename, first_name, last_name, display_name, description, group, image, lang
        this.group;         // id, course, country, adminId, school
        this.chat;          // id, chatstart, partners[objects], questions[ids], tasks[ids]
        // partners is an array of -> ID, display_name, nickname, description, ...
        this.questions = new Map();     // id, answers[], question
                                        // answers[] -> id, date, answer, userId, user
        this.tasks = new Map();         // id, taskAnswers[], title, description, type, order, icon
                                        // taskAnswers -> id, date, userId, image, audio, video
        this.currentTask;   // id of current question
        this.currQuestion;  // id of current question
    }

    set user(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    get user() {
        if (!localStorage.getItem('user')) return undefined;
        else return JSON.parse(localStorage.getItem('user'));
    }

    set group(group) {
        localStorage.setItem('group', JSON.stringify(group));
    }

    get group() {
        if (!localStorage.getItem('group')) return undefined;
        else return JSON.parse(localStorage.getItem('group'));
    }

    set chat(chat) {
        localStorage.setItem('chat', JSON.stringify(chat));
    }

    get chat() {
        if (!localStorage.getItem('chat')) return undefined;
        else return JSON.parse(localStorage.getItem('chat'));
    }

    get currQuestion() {
        if (!localStorage.getItem('currQuestion')) return undefined;
        else return JSON.parse(localStorage.getItem('currQuestion'));
    }

    set currQuestion(questionId) {
        localStorage.setItem('currQuestion', JSON.stringify(questionId));
    }

    logout() {
        localStorage.clear();
        this.questions = new Map();
        this.tasks = new Map();
    }

    async getUser(username = '', password = '') {
        if (!this.user) {
            const resp = await this.fetchToken(username, password);
            localStorage.setItem('token', resp.token);
            console.log(resp);
            console.log(this.user);
            this.user = {
                id: resp.id,
                // nicename: resp.nicename,
                first_name: resp.first_name,
                last_name: resp.last_name,
                // display_name: resp.display_name,
                nickname: resp.nickname,
                description: resp.description,
                image: resp.image ? resp.image.sizes.medium : '',
                group: resp.group,
                lang: 'en',
            }
            console.log(this.user);
        }
        return this.user;
    }

    async updateUser(nick_name, description, imgId = 0, language = 'en') {
        let user = this.user;
        let wpData = {
            nickname: nick_name ? nick_name : this.user.nickname,
            description: description ? description : this.user.description,
        };
        user.nickname = nick_name;
        user.description = description;

        // Update ACF image field with separate request because updating User ACF fields does not work with /wp/v2
        if (imgId) {
            let acfData = {
                fields: {
                    user_image: imgId,
                }
            };
            const acfBody = JSON.stringify(acfData);
            const resp = await kwm.utils.apiPUT('/acf/v3/users/' + this.user.id,
                kwm.utils.jsonBodyHeader(kwm.utils.authHeader()), acfBody);
            user.image = resp.acf.user_image.sizes.medium;
        }

        localStorage.setItem('user', JSON.stringify(user));
        const wpBody = JSON.stringify(wpData);
        return await kwm.utils.apiPOST('/wp/v2/users/' + this.user.id + '?context=edit',
            kwm.utils.jsonBodyHeader(kwm.utils.authHeader()), wpBody);
    }

    setLanguage(lang = 'en') {
        console.log(lang)
        let user = this.user;
        user.lang = lang;
        localStorage.setItem('user', JSON.stringify(user));
        console.log(this.user);
    }

    async fetchToken(username = '', password = '') {
        const headers = {
            'Content-Type': 'application/json'
        }
        const body = JSON.stringify({
            username: username,
            password: password,
        });
        const resp = await kwm.utils.apiPOST('/jwt-auth/v1/token', headers, body);
        if ('token' in resp) {
            return resp;
        } else throw Error(resp.message);
    }

    async getGroup() {
        if (!this.group) {
            const resp = await kwm.utils.apiGET('/jkoster/v1/usergroup');
            this.group = {
                id: resp.id,
                course: resp.course,
                country: resp.country,
                adminId: resp.admin,
                school: resp.school,
            }
            this.user.lang = resp.country.toLowerCase();
        }
        return this.group;
    }

    async getChat() {
        console.log('I have been called');
        if (!this.chat) {
            const resp = await kwm.utils.apiGET('/jkoster/v1/userchat');
            console.log(resp);
            if (!kwm.utils.isEmpty(resp)) {
                this.chat = {
                    id: resp.id,
                    chatstart: resp.startdate,
                    partners: resp.users, //.filter(user => user.id !== Number(this.user.id)),
                    questions: resp.questions ? resp.questions : [],
                    tasks: resp.tasks ? resp.tasks : [],
                }
            }
        }
        return this.chat;
    }

    async getAllPartners() {
        if (!this.chat || 'partners' in this.chat) {
            await this.getChat();
        }
        return this.chat.partners;
    }

    async getAllTasks() {
        if (!this.chat || !'tasks' in this.chat) {
            await this.getChat();
        } else {
            // TODO handle get all tasks
        }
        return this.tasks;
    }

    async getAllQuestions() {
        if (!this.chat || !'questions' in this.chat) {
            await this.getChat();
        } else {
            for (const id of this.chat.questions) {
                const resp = await kwm.utils.apiGET(`/wp/v2/question/${id}`);
                this.questions.set(id, {
                    id: id,
                    question: resp.acf.question,
                    date: resp.date,
                    answers: [],
                });
            }
        }
        return this.questions;
    }

    async getAllTaskAnswers(taskId) {
        if (!this.chat && !'answers' in this.chat.tasks[taskId]) {

        } else {
            for (const id of this.chat.questions) {
                const resp = await kwm.utils.apiGET(`/wp/v2/answer?question=${id}&user=${this.user.id}`);
                this.tasks[id] = {
                    id: resp.acf.id,
                    title: resp.acf.title,
                    description: resp.acf.description,
                    type: resp.acf.type,
                    userId: resp.acf.user,
                }
            }
        }
        return this.chat.tasks[taskId].answers;
    }

    async getAllQuestionAnswers(questionId) {
        if (!this.chat && !'answers' in this.chat.questions[questionId]) {
            // TODO Error handling
        } else if (!this.questions.get(questionId)) {
            // TODO Error handling
        } else {
            for (const partner of this.chat.partners) {
                console.log(partner);
                const answers = await kwm.utils.apiGET(`/wp/v2/answer?question=${questionId}&user=${partner.id}&orderby=date`);

                // Filter Answers that actually match question ID because WP meta query matches with "like" not "equals"
                answers.filter((answer) => { // return true to remove item from collection
                    return Number(answer.acf.question[0]) === questionId;
                }).forEach((answer) => {
                    this.questions.get(questionId).answers.push({
                        id: answer.id,
                        date: answer.date,
                        answer: answer.acf.text,
                        userId: answer.acf.user,
                        user: partner.nickname,
                    });
                });
            }
            this.questions.get(questionId).answers = this.questions.get(questionId).answers.sort((a, b) => {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(a.date) - new Date(b.date);
            });
        }
        return this.questions.get(questionId).answers;
    }

    async addAnswer(questionId, text) {
        let raw = JSON.stringify({
            title: "New Answer by REST API post",
            status: "publish",
            fields: {
                question: [
                    questionId
                ],
                user: this.user.id,
                text: text
            }
        });
        const resp = await kwm.utils.apiPOST('/wp/v2/answer', kwm.utils.jsonBodyHeader(kwm.utils.authHeader()), raw);
        const length = this.questions.get(questionId).answers.push({
            id: resp.id,
            date: resp.date,
            answer: resp.acf.text,
            userId: resp.acf.user,
            user: this.chat.partners.find(p => p.id == resp.acf.user).nickname,
        });
        return this.questions.get(questionId).answers[length - 1];
    }

    async addTaskAnswer(text, image = false, audio = false, video = false) {

    }

    async getNewQuestion() {
        try {
            const newQuestion = await kwm.utils.apiGET('/jkoster/v1/newquestion');
            if (!newQuestion) return;
            let chat = this.chat;
            chat.questions.push(newQuestion.id);
            localStorage.setItem('chat', JSON.stringify(chat));
            return newQuestion;
        } catch (e) {
            console.warn(e.message);
        }
        return;
    }

    /**
     *
     * @param fileInputElement file input element
     * @returns {Promise<*>}
     */
    async mediaUpload(fileInputElement) {
        const formData = new FormData();
        formData.append("file", fileInputElement.files[0]);
        return await kwm.utils.apiPOST('/wp/v2/media', kwm.utils.authHeader(), formData);
    }


}