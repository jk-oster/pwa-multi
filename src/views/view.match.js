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
        await kwm.model.getGroup();
        await kwm.model.getChat();
        const templateData = {
            nickname: kwm.model.user.nickname,
            description: kwm.model.user.description,
            partnername: kwm.model.chat.partners.find(p => p.id !== kwm.model.user.id).nickname,
            partnerdescription: kwm.model.chat.partners.find(p => p.id !== kwm.model.user.id).user_description,
        };
        setTimeout(async () => {
            await kwm.render("components/match-details", view.DOM.container, templateData);
        }, 1000);
    }
    catch (err){
        // TODO implement matching
        const text = 'TODO implement matching mechanism -> this user is in no Group / Chat <br><br>';
        kwm.utils.showErrorMessage(text + err.message, view.DOM.msg_error);
    }
};
