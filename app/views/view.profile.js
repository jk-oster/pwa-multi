"use strict";
import KWM_Route from '../js/kwm-route.js?v=0.2';

/*******************************************************************************
 *     Profile Page
 *
 *     KWM - 2022-03-30
 *******************************************************************************/

export let view = new KWM_Route("/profile", async function(){
    await this.rendering();
});

view.rendering = async function(){
    await kwm.render("profile",kwm.conf.appContainer,kwm.model.user);

    view.DOM = {
        btn_logout: document.querySelector("#logout"),
        save_and_back: document.querySelector("#save_and_back"),
        input_name: document.querySelector("#name"),
        input_description: document.querySelector("#description"),
        lang: document.querySelector('#lang')
    }

    kwm.utils.setSingleEventListener(view.DOM.btn_logout,'click', () => kwm.model.logout());

    kwm.utils.setSingleEventListener(view.DOM.save_and_back,'click', async function(event){
        event.preventDefault();
        try {
            let imgId = 0;
            let imgUrl = '';
            if(document.getElementById("avatar").files.length !== 0){
                try {
                    const media = document.querySelector('#avatar');
                    const resp = await kwm.model.mediaUpload(media);
                    imgId = resp.id;
                    imgUrl = resp.media_details.sizes.medium.source_url;
                    document.querySelector('#img_avatar').src = imgUrl;
                } catch (e) {
                    console.error(e);
                }
            }
            kwm.model.updateUser(view.DOM.input_name.value, view.DOM.input_description.value, imgId);
            kwm.router.changeView('/app');
        }
        catch (e) {
            console.error(e);
        }
    });

    kwm.utils.setSingleEventListener(view.DOM.lang,'change', () => {
        kwm.translator.currentLanguage = view.DOM.lang.value;
        kwm.model.setLanguage(view.DOM.lang.value);
        view.rendering();
    });
};