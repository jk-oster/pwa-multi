"use strict";

import KWM_Component from "../../js/kwm-component.js";

export const comp = new KWM_Component({
    template: 'components/question-card',
    renderFn: getAndRenderQuestions,
});

async function getAndRenderQuestions(container){
    const questionIds = JSON.parse(localStorage.questions)
    console.log(questionIds);
    if (!kwm.utils.isEmpty(questionIds)) {
        console.log(questionIds);
        for (const id of questionIds) {
            const question = await kwm.utils.apiGET('/wp/v2/question/' + Number(id));
            await renderQuestionCard(question, container);
        }
    }
    container.querySelector('.lds-ring').remove();
}

async function renderQuestionCard(apiResponseQuestion, container, mode) {
    const questionData = {
        id: apiResponseQuestion.id,
        question: apiResponseQuestion.acf.question,
        date: apiResponseQuestion.date,
    };
    await kwm.render(comp.template, container, questionData, mode = 'append');
    const questionCard = document.querySelector('#question_' + questionData.id);
    kwm.utils.setSingleEventListener(questionCard, 'click', cardClickHandler);
}

function cardClickHandler(event) {
    event.preventDefault();
    kwm.cache = {
        question: {
            id: event.currentTarget.dataset.id,
            question: event.currentTarget.querySelector('.card-title').innerText,
            description: event.currentTarget.dataset.description,
        }
    }
    kwm.router.changeView('/question');
}

