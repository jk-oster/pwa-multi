"use strict";
import KWM_Route from '../js/kwm-route.js?v=0.2';

/*******************************************************************************
 *     404 Page
 *
 *     KWM - 2022-03-30
 *******************************************************************************/

export let view = new KWM_Route("/404", async function(){
    await this.rendering();
});

view.rendering = async function(){
    await kwm.render("404", kwm.config.appContainer);
};

