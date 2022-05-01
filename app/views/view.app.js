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
    await kwm.render("app");

    view.DOM = {
        container: document.querySelector('#container'),
        tasks: document.querySelector('#tasks'),
        questions: document.querySelector('#questions'),
    }

    view.DOM.tasks.addEventListener('click', async (event) => {
        event.preventDefault();
        const taskOverviewData = {};
        await kwm.render('components/task-overview', view.DOM.container, taskOverviewData);
        // TODO populate tasks
    });

    view.DOM.questions.addEventListener('click', async (event) => {
        event.preventDefault();
        const questionOverviewData = {};
        await kwm.render('components/question-overview', view.DOM.container, questionOverviewData);
        // TODO populate filter
        // TODO populate cards
    });
};