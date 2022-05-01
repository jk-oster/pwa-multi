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

    const partners = JSON.parse(localStorage.partners);
    const templateData = {
        username: localStorage.display_name,
        description: localStorage.description,
        partnername: partners[0].display_name,
        partnerdescription: partners[0].user_description,
    };
    await kwm.render("match", kwm.conf.appContainer, templateData);
};