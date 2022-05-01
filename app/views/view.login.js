"use strict";
import KWM_Route from '../js/kwm-route.js?v=0.2';

/*******************************************************************************
 *     Login Page
 *
 *     KWM - 2022-03-30
 *******************************************************************************/

export let view = new KWM_Route("/login", async function () {
    await this.rendering();
});

view.rendering = async function () {
    await kwm.render("login", kwm.conf.appContainer, {});

    // Check if user is logged in
    if (localStorage.token) {
        // Forward user
        kwm.router.changeView('/app');
    }
    // Render Login form
    else {
        view.DOM = {
            btn_login: document.querySelector('#btn_login'),
            btn_logout: document.querySelector('#btn_logout'),
            input_username: document.querySelector('#username'),
            input_password: document.querySelector('#password'),
            user_display_name: document.querySelector('#user_display_name'),
            login_state: document.querySelector('#login_state'),
            msg_error: document.querySelector('#msg_error'),
        };

        view.DOM.btn_login.addEventListener('click', async function (e) {
            e.preventDefault(); // Prevent "Submit Action"
            try {
                await login(view.DOM.input_username.value, view.DOM.input_password.value);
                view.DOM.user_display_name.innerText = kwm.t('welcome') + localStorage.display_name;
                setTimeout(() => {
                    kwm.router.changeView('/match');
                }, 2500);
            } catch (err) {
                console.error(err);
                view.DOM.msg_error.innerText = kwm.t('loginError');
            }
        });
    }
};


async function login(username = '', password = '') {
    const headers = {
        'Content-Type': 'application/json'
    }
    const body = JSON.stringify({
        username: username,
        password: password,
    });
    const response = await kwm.utils.apiPOST('/jwt-auth/v1/token', headers, body);
    localStorage.setItem('token', response.token);
    localStorage.setItem('id', response.id);
    localStorage.setItem('nicename', response.nicename);
    localStorage.setItem('first_name', response.first_name);
    localStorage.setItem('last_name', response.last_name);
    localStorage.setItem('display_name', response.display_name);
    localStorage.setItem('description', response.description);
    localStorage.setItem('group', response.group);
    console.log(response);

    const group = await kwm.utils.apiGET('/wp/v2/group/' + localStorage.group);
    localStorage.setItem('course', group.acf.course[0]);
    localStorage.setItem('country', group.acf.country);
    localStorage.setItem('admin', group.acf.admin[0]);
    localStorage.setItem('school', group.acf.school);
    console.log(group);

    const chats = await kwm.utils.apiGET('/wp/v2/chat?users=' + localStorage.id);
    console.log(chats);
    let userChat = { Chat: 'Has no user chat'};
    if(!kwm.utils.isEmpty(chats)){
        for(const chat of chats){
            console.log(chat.acf);
            for(const user of chat.acf.users){
                console.log(user);
                if(user.ID === Number(localStorage.id)){
                    userChat = chat;
                }
            }
        }
        if(!kwm.utils.isEmpty(userChat)){
            localStorage.setItem('chat', userChat.id);
            localStorage.setItem('chatstart', userChat.acf.stardate);
            localStorage.setItem('questions', JSON.stringify(userChat.acf.questions));
            localStorage.setItem('tasks', JSON.stringify(userChat.acf.tasks));
            const partners = userChat.acf.users.filter(user => user.ID !== Number(localStorage.id));
            localStorage.setItem('partners', JSON.stringify(partners));
        }
        console.log(userChat);
    }
}

