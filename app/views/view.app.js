"use strict";
import KWM_Route from '../js/kwm-route.js?v=0.2';
import {comp as question_overview} from "./components/component.question-overview.js";

/*******************************************************************************
 *     Main App Page
 *
 *     KWM - 2022-03-30
 *******************************************************************************/

export let view = new KWM_Route("/app", async function () {
    await this.rendering();
});

view.rendering = async function () {
    if (true) { // !kwm.utils.noLoginReRoute()
        // Render Template
        try{
            await kwm.render("app");
        }
        catch (err){
            kwm.router.changeView('/404');
        }

        // Cache DOM
        view.DOM = {
            tasks: document.querySelector('#tasks'),
            questions: document.querySelector('#questions'),
            tasks_overview: document.querySelector('#tasks_overview'),
            questions_overview: document.querySelector('#questions_overview'),
            questions_container: document.querySelector('#question_container'),
        }
        // Register Events
        kwm.utils.setSingleEventListener(view.DOM.tasks, 'click', toggleView);
        kwm.utils.setSingleEventListener(view.DOM.questions, 'click', toggleView);

        await question_overview.render(view.DOM.questions_container);
        // await renderQuestionCards();

        // TODO Implement Tasks
        // TODO Implement New Question
        // TODO Implement Pagination

    }
};

function toggleView(event) {
    if(!event.currentTarget.classList.contains('active')){
        view.DOM.questions.classList.toggle('active');
        view.DOM.tasks.classList.toggle('active');
        view.DOM.tasks_overview.classList.toggle('visually-hidden');
        view.DOM.questions_overview.classList.toggle('visually-hidden');
    }
}