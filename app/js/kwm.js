"use strict";
import KWM_Utils from './kwm-utils.js?v=0.2';
import KWM_Translator from './kwm-translator.js?v=0.2';
import KWM_Templater from './kwm-templater.js?v=0.2';
import KWM_Router from "./kwm-router.js?v=0.2";
/**********************************************************************
 *     Class-Bundle for KWM-Applications.
 *     App-Shell needs an ID "#kwmJS".
 *
 *     @param:
 *     appContainer - This is where the App is rendered into
 *     debugMode - Enables console.log
 *     webRoot - Give me the root-URL of your App
 *     apiRoot - Give me the root-URL of your API
 *
 *     KWM - 2022-03-28
 **********************************************************************/

export default class KWMJS{
    constructor(){
        // Make it a singleton
        if (KWMJS._instance) {
            return KWMJS._instance
        }
        KWMJS._instance = this;

        window.kwm = this;

        // Options config
        this.conf = {
            appContainer: document.getElementById('kwmJS'),
            debugMode: true,
            webRoot: window.location.origin + window.location.pathname.replace('/index.html',''),
            apiRoot: 'https://api.s2010456022.student.kwmhgb.at/jk-json',
            serviceworkerLocation: './serviceworker.js',
        };
        this.registerServiceWorker().then(() => {});
        this.utils = KWM_Utils;
        this.translator = new KWM_Translator("de", "en");
        this.templater = new KWM_Templater(this.conf.webRoot+"/templates/");
        this.router = new KWM_Router();
    }

    async registerServiceWorker(){
        // Check if serviceworker is supported
        if ('serviceWorker' in navigator) {
            try {
                // register Serviceworker
                await navigator.serviceWorker.register(this.conf.serviceworkerLocation);
                console.log("serviceWorker registered");
            } catch (error) {
                console.log("serviceWorker registration failed", error);
            }
        } else console.log('serviceWorker is not supported');
    }

    // Convenience Methods for easy calling
    t(key){
        return this.translator.translate(key);
    }

    async render(templateName, container = this.conf.appContainer, values = false){
        await this.templater.renderTemplate(templateName, container, values);
    }
}