"use strict";

import KWM_Component from "../../js/kwm-component.js";

export const comp = new KWM_Component('components/question-card', async function (container) {
    await this.rendering(container);
});

comp.rendering = async function (container) {
    const questions = await kwm.model.getAllQuestions();
    for (const question of questions.values()) {
        await kwm.render(comp.template, container, question, 'append');
        const questionCard = document.querySelector('#question_' + question.id);
        kwm.utils.setSingleEventListener(questionCard, 'click', cardClickHandler);
    }

    comp.DOM = {
        container: container,
        search: document.querySelector('#search'),
        sort: document.querySelector('#sort'),
        new_question: document.querySelector('#new_question'),
    }

    kwm.utils.setSingleEventListener(comp.DOM.search, 'change', searchHandler);
    kwm.utils.setSingleEventListener(comp.DOM.new_question, 'click', newQuestionHandler);
    container.querySelector('.lds-ring').classList.add('visually-hidden');
    window.addEventListener('scroll',onScroll);
}

function cardClickHandler(event) {
    event.preventDefault();
    kwm.model.currQuestion = kwm.model.questions.get(Number(event.currentTarget.dataset.id));
    kwm.router.changeView('/question');
}

async function newQuestionHandler(event) {
    event.preventDefault();
    try {
        const newQuestion = await kwm.model.getNewQuestion();
        if(!newQuestion.message) {
            await kwm.render(comp.template, comp.DOM.container, newQuestion, 'append');
            const questionCard = document.querySelector('#question_' + newQuestion.id);
            kwm.utils.setSingleEventListener(questionCard, 'click', cardClickHandler);
        } else {
            alert('There are no more questions available at the moment.');
        }
    }
    catch(err){
        console.warn(err.message);
    }
}

function onScroll() {
    if (window.pageYOffset + window.innerHeight >= document.documentElement.scrollHeight) {
        console.log('Reached scroll bottom')
    }
}

function searchHandler(){
    // Hide all elements
    const filterable = document.querySelectorAll('.filterable') ? [...document.querySelectorAll('.filterable')] : [];
    filterable.forEach(elem => elem.classList.add('visually-hidden'));
    let filteredSelection = filterable;

    if (search.value) {
        filteredSelection = filteredSelection.filter(elem => {
            return elem.dataset.question.toLocaleLowerCase().includes(search.value.toLocaleLowerCase());
        });
    }
    filteredSelection.forEach(elem => elem.classList.remove('visually-hidden'));
}


