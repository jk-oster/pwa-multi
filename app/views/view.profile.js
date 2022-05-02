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
        input_name: document.querySelector("#name"),
        input_description: document.querySelector("#description"),
    }

    view.DOM.btn_logout.addEventListener('click', function(){
        localStorage.clear();
    });
    view.DOM.save_and_back.addEventListener('click', async function(){
        const body = JSON.stringify({
            display_name: view.DOM.input_name.value,
            description: view.DOM.input_description.value,
        });
        try {
            await kwm.utils.apiPOST('/wp/v2/users/'+localStorage.id + '?context=edit', kwm.utils.authHeader(), body);
            localStorage.setItem('display_name', body.display_name);
            localStorage.setItem('description', body.description);
            history.back();
        }
        catch (e) {
            console.log(e);
        }
    });
};