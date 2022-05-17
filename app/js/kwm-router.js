"use strict";

//Import and rename your views here:
import {view as app} from '../views/view.app.js?v=0.2';
import {view as home} from '../views/view.home.js?v=0.2';
import {view as route404} from '../views/view.404.js?v=0.2';
import {view as login} from '../views/view.login.js?v=0.2';
import {view as profile} from '../views/view.profile.js?v=0.2';
import {view as match} from '../views/view.match.js?v=0.2';
import {view as question} from '../views/view.question.js?v=0.2';

/*******************************************************
 *     Hash-based router for Single Page Applications.
 *     Handles Routes behind a '/#/' to your convenience.
 *
 *     @param routes - Give me all the views you have
 *     @param routeHome - Default route for page load
 *     @param route404 - Default route when unidentified slug is put into URL
 *
 *     @author Jakob Osterberger - 2022-03-30
 *******************************************************/
export default class KWM_Router {
    constructor() {
        this.routes = [home, route404, app, login, profile, match, question];
        this.routeHome = home;
        this.route404 = route404;

        this.init();
    }

    init() {
        window.removeEventListener('hashchange', this.changeViewHandler);
        window.addEventListener('hashchange', this.changeViewHandler.bind(this));
        this.changeViewHandler();
    }

    changeView(route=''){
        location.hash = route;
    }

    changeViewHandler() {
        // Switch by e.q. '?lang=de'
        const params = kwm.utils.getGetParameters();
        if(!kwm.utils.isEmpty(params) && 'lang' in params.params){
            kwm.translator.currentLanguage = params.params.lang;
        }

        // Handle view change
        if (location.hash === '#/' || location.hash === '' || location.hash === '#/home') {
            this.routeHome.init();
            return;
        } 
        else {
            const activeRoute = this.routes.find(route => route.isActive());
            if (activeRoute) activeRoute.init();
            else {
                this.route404.init();
                console.error(`Page ${location.hash} could not be found`);
                location.hash = '/404';
            }
        }
    }
}