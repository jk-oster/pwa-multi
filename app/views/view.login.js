"use strict";
import KWM_Route from '../js/kwm-route.js?v=0.2';

/*******************************************************************************
 *     Login Page
 *
 *     KWM - 2022-03-30
 *******************************************************************************/

export let view = new KWM_Route("/login", async function () {
    await this.rendering();
});

view.rendering = async function () {
    // Check if user is logged in
    if (localStorage.getItem('token') && localStorage.token !== 'undefined' && localStorage.getItem('chat')) {
        kwm.router.changeView('/app');
    }
    else {
        // Render Template
        await kwm.render("login", kwm.conf.appContainer, {});

        // Cache DOM
        view.DOM = {
            btn_login: document.querySelector('#btn_login'),
            btn_logout: document.querySelector('#btn_logout'),
            form_login: document.querySelector('#frm_login'),
            input_username: document.querySelector('#username'),
            input_password: document.querySelector('#password'),
            user_display_name: document.querySelector('#user_display_name'),
            login_state: document.querySelector('#login_state'),
            msg_error: document.querySelector('#msg_error'),
        };

        // Register Listeners
        kwm.utils.setSingleEventListener(view.DOM.btn_login, 'click', loginClickHandler);
    }
};

async function loginClickHandler(e) {
    e.preventDefault(); // Prevent "Submit Action"
    try {
        localStorage.clear();
        await kwm.model.getUser(view.DOM.input_username.value, view.DOM.input_password.value);
        // view.DOM.user_display_name.innerText = kwm.t('welcome') + " " + localStorage.display_name;
        view.DOM.form_login.classList.add('visually-hidden');
        setTimeout(() => {
            kwm.router.changeView('/match');
        }, 0);
    } catch (err) {
        kwm.utils.showErrorMessage(err.message, view.DOM.msg_error);
    }
}

