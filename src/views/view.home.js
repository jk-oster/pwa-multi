"use strict";
import KWM_Route from '../js/kwm-route.js?v=0.2';

/*******************************************************************************
 *     Home Page
 *
 *     KWM - 2022-03-30
 *******************************************************************************/

export let view = new KWM_Route("/home", async function(){
    await this.rendering();
});

view.rendering = async function(){
    await window.kwm.render("home", document.getElementById("kwmJS"));
};