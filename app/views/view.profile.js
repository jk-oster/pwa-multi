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
    await kwm.render("profile");

    view.DOM = {
        btn_logout: document.querySelector("#logout"),
    }

    view.DOM.btn_logout.addEventListener('click', function(){
        localStorage.clear();
    });
};