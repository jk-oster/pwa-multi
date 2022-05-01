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
    if(true){ // !kwm.utils.noLoginReRoute()
        // Render Template
        await kwm.render("app");

        // Cache DOM
        view.DOM = {
            container: document.querySelector('#container'),
            tasks: document.querySelector('#tasks'),
            questions: document.querySelector('#questions'),
        }

        // Register Events
        kwm.utils.setSingleEventListener(view.DOM.tasks, 'click', renderTaskOverview);
        kwm.utils.setSingleEventListener(view.DOM.questions, 'click', renderQuestionOverview);

        // Init handling
    }
};

async function renderTaskOverview(event) {
    event.preventDefault();
    view.DOM.questions.classList.remove('active');
    view.DOM.tasks.classList.add('active');
    const taskOverviewData = {};
    await kwm.render('components/task-overview', view.DOM.container, taskOverviewData);
    // TODO populate tasks
}

async function renderQuestionOverview(event) {
    event.preventDefault();
    view.DOM.questions.classList.add('active');
    view.DOM.tasks.classList.remove('active');
    const questionOverviewData = {};
    await kwm.render('components/question-overview', view.DOM.container, questionOverviewData);
    view.DOM.question_container = document.querySelector('#question_container');

    console.log(view.DOM.question_container);
    // TODO populate filter
    await renderQuestionCards();

}

async function renderQuestionCards(){
    const questionIds = JSON.parse(localStorage.questions);
    console.log(questionIds);
    if(!kwm.utils.isEmpty(questionIds)){
        for(const id of questionIds){
            const question = await kwm.utils.apiGET('/wp/v2/question/' + Number(id));
            await renderQuestionCard(question);
        }
    }
}

async function renderQuestionCard(apiResponseQuestion){
    const questionData = {
        id: apiResponseQuestion.id,
        question: apiResponseQuestion.acf.question,
        date: apiResponseQuestion.date,
    };
    console.log(questionData);
    await kwm.render('components/question-card', view.DOM.question_container, questionData, 'append');
    const questionCard = document.querySelector('#question_'+ questionData.id);
    kwm.utils.setSingleEventListener(questionCard, 'click', cardClickHandler);
}

function cardClickHandler(event) {
    // TODO fetch Question Data & Answers
    kwm.globalData = {
        question: {
            id: event.target.dataset.id,
            question: event.target.querySelector('.card-title').innerText,
            description: event.dataset.description,
        }
    }
    console.log(kwm.globalData);
}
