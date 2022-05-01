"use strict";
import KWM_Route from '../js/kwm-route.js?v=0.2';

/*******************************************************************************
 *     Matching Page
 *
 *     KWM - 2022-03-30
 *******************************************************************************/

export let view = new KWM_Route("/match", async function(){
    await this.rendering();
});

view.rendering = async function(){
    // Render Template
    await kwm.render("match");

    // Cache DOM
    view.DOM = {
        container: document.querySelector("#container"),
        msg_error: document.querySelector("#msg_error"),
    }

    // Init
    try{
        await fetchGroup();
        await fetchChats();
        const partners = JSON.parse(localStorage.partners);
        const templateData = {
            username: localStorage.display_name,
            description: localStorage.description,
            partnername: partners[0].display_name,
            partnerdescription: partners[0].user_description,
        };
        setTimeout(async () => {
            await kwm.render("components/match-details", view.DOM.container, templateData);
        }, 5000);
    }
    catch (err){
        // TODO implement matching
        const text = 'TODO implement matching mechanism -> this user is in no Group / Chat <br><br>';
        kwm.utils.showErrorMessage(text + err.message, view.DOM.msg_error);
    }
};

async function fetchGroup() {
    const group = await kwm.utils.apiGET('/wp/v2/group/' + localStorage.group);
    localStorage.setItem('course', group.acf.course[0]);
    localStorage.setItem('country', group.acf.country);
    localStorage.setItem('admin', group.acf.admin[0]);
    localStorage.setItem('school', group.acf.school);
    console.log(group);
}

async function fetchChats() {
    const chats = await kwm.utils.apiGET('/wp/v2/chat?users=' + localStorage.id);
    console.log(chats);
    let userChat = {Chat: 'Has no user chat'};
    if (!kwm.utils.isEmpty(chats)) {
        for (const chat of chats) {
            console.log(chat.acf);
            for (const user of chat.acf.users) {
                console.log(user);
                if (user.ID === Number(localStorage.id)) {
                    userChat = chat;
                }
            }
        }
        if (!kwm.utils.isEmpty(userChat)) {
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