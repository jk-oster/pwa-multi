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

    const templateData = {

    };

    await kwm.render("match", kwm.conf.appContainer, templateData);
};