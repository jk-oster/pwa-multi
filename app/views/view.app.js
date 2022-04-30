"use strict";
import KWM_Route from '../js/kwm-route.js?v=0.2';

/*******************************************************************************
 *     Main App Page
 *
 *     KWM - 2022-03-30
 *******************************************************************************/

export let view = new KWM_Route("/app", async function(){
    await this.rendering();
});

view.rendering = async function(){
    await kwm.render("app", document.getElementById("kwmJS"));
};