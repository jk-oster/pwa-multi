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
        let data = answer;
        data.userImg = kwm.model.chat.partners.find(p => p.id === answer.userId).image?.sizes?.thumbnail || 'https://placekitten.com/150/150';
        data.isSelf = kwm.model.user.id === answer.userId;
        await kwm.render('components/answer', view.DOM.container, data, 'append');
    }
    
    kwm.utils.setSingleEventListener(view.DOM.btn_send, 'click', sendAnswerHandler);
    kwm.utils.scrollToBottom();
    // TODO implement pagination
}

async function sendAnswerHandler() {
    let text = view.DOM.text.innerHTML;
    // Remove script and style tags
    text = text.replace(/(?:<style.+?>.+?<\/style>|<script.+?>.+?<\/script>)/gi, '');
    // Replace div with p
    console.log(text);
    for (const match of text.matchAll(/<div.*?>(.*?)<\/div>/gi)) {
        console.log(match);
        text = text.replace(match[0], `<p class="msg">${match[1]}</p>`);
    }
    console.log(text);
    let answer = await kwm.model.addAnswer(kwm.model.currQuestion.id, text);
    answer.userImg = kwm.model.chat.partners.find(p => p.id === answer.userId).image?.sizes?.thumbnail || 'https://placekitten.com/150/150';
    answer.isSelf = kwm.model.user.id;
    await kwm.render('components/answer', view.DOM.container, answer, 'append');
    view.DOM.text.innerText = '';
    kwm.utils.scrollToBottom();
}