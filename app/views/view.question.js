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
    const questionData = kwm.model.currQuestion;
    console.log(questionData);
    await kwm.render("question-detail", kwm.conf.appContainer, questionData);

    view.DOM = {
        container: document.querySelector('#answer-container'),
        load_more: document.querySelector('#load_more'),
        btn_send: document.querySelector('#send'),
        text: document.querySelector('#new_answer_text')
    }

    const answers = await kwm.model.getAllQuestionAnswers(questionData.id);
    view.DOM.container.innerHTML = '';
    console.log(answers);

    for(const answer of answers) {
        await kwm.render('components/answer', view.DOM.container, answer, 'append');
    }
    
    kwm.utils.setSingleEventListener(view.DOM.btn_send, 'click', sendAnswerHandler);
    kwm.utils.scrollToBottom();
    // TODO implement pagination
}

async function sendAnswerHandler() {
    const text = view.DOM.text.innerText;
    let answer = await kwm.model.addAnswer(kwm.model.currQuestion.id, text);
    await kwm.render('components/answer', view.DOM.container, answer, 'append');
    view.DOM.text.innerText = '';
    kwm.utils.scrollToBottom();
}