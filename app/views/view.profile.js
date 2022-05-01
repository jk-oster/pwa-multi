"use strict";
import KWM_Route from '../js/kwm-route.js?v=0.2';

/*******************************************************************************
 *     404 Page
 *
 *     KWM - 2022-03-30
 *******************************************************************************/

export let view = new KWM_Route("/profile", async function(){
    await this.rendering();
});

view.rendering = async function(){

    const templateData = {
        name: localStorage.display_name,
        description: localStorage.description,
    }

    await kwm.render("profile",kwm.conf.appContainer,templateData);

    view.DOM = {
        btn_logout: document.querySelector("#logout"),
        save_and_back: document.querySelector("#save_and_back"),
    }

    view.DOM.btn_logout.addEventListener('click', function(){
        localStorage.clear();
    });
    view.DOM.save_and_back.addEventListener('click', function(){
        // TODO POST Profile data
        history.back();
    });
};