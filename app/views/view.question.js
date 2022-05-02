"use strict";
import KWM_Route from '../js/kwm-route.js?v=0.2';

/*******************************************************************************
 *     Question Detail Page
 *
 *     KWM - 2022-03-30
 *******************************************************************************/

export let view = new KWM_Route("/question", async function () {
    await this.rendering();
});

view.rendering = async function () {
    const questionData = kwm.cache.question;
    console.log(questionData);
    await kwm.render("question-detail", kwm.conf.appContainer, questionData);

    view.DOM = {
        container: document.querySelector('#answer-container'),
        load_more: document.querySelector('#load_more'),
        new_answer: document.querySelector('#new_answer'),
    }

    const answers = await kwm.utils.apiGET(`/wp/v2/answer?question=${questionData.id}&user=${localStorage.id}`);
    view.DOM.container.innerHTML = '';
    console.log(answers);
    for(const answer of answers) {
        if(Number(answer.acf.question[0]) === Number(questionData.id)) {
            const answerData = {
                id: answer.id,
                date: answer.date,
                answer: answer.acf.text,
                userid: answer.acf.user,
            }
            await kwm.render('components/answer', view.DOM.container, answerData, 'append');
        }
    }

    // TODO implement posting answers
    // TODO implement pagination
}