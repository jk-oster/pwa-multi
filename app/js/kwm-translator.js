'use strict';

/**********************************************************************
 *     Translation-Engine for KWM-JS
 *     Just add your ressource key:"value" Pairs down by.
 *
 *     @param languages - Give me an array of languages supported e.q. ['de','en'],
 *     the fist value is the default language
 *
 *     @author Jakob Osterberger - 2022-03-28
 **********************************************************************/
export default class KWM_Translator {
    constructor(languages = []) {
        if (languages.length === 0) return console.error('Error: No languages specified');
        for (const lang of languages) {
            this[lang] = KWM_Resources[lang];
        }
        this.currentLanguage = languages[0];
    }

    translate(key, language = this.currentLanguage) {
        if (!this[language]) return ` --Missing translation: non_existing_language "${language}"-- `;
        if (!this[language][key]) return ` --Missing translation: "${key}"-- `;
        return this[language][key];
    }
}

/****************************
 *
 *         RESOURCES
 *
 ***************************/
const KWM_Resources = {
    "de": {
        username: "Benutzername",
        password: "Passwort",
        login: "Einloggen",
        logout: "Ausloggen",
        loginError: "Benutzername oder Passwort ungültig",
        welcome: "Willkommen",
        filter: "Filter",
        new_question: "Neue Frage",
        load_more: "Mehr laden",
        save_and_back: "Speichern und zurück",
        back: "Zurück",
        profil: "Profil",
        forward_to_app: "Los geht's, starte jetzt",
        new_answer: "Neue Antwort",
        asc: "Aufsteigend",
        desc: "Absteigend",
        search: "Suche",
        choose_profile_pic: "Wähle dein Profilbild aus",
        profile_description: "Beschreibe dich mit einem Satz",
        select_lang: "Sprache auswählen",
        home: "Startseite",
        tasks: "Aufgaben",
        questions: "Fragen",
    },
    "en": {
        username: "Username",
        password: "Password",
        login: "Login",
        logout: "Logout",
        loginError: "Username or password incorrect",
        welcome: "Welcome",
        filter: "Filter",
        new_question: "New Question",
        load_more: "Load more",
        save_and_back: "Save and back",
        back: "Back",
        profil: "Profile",
        forward_to_app: "Everything ready, let's go",
        new_answer: "New Answer",
        asc: "Ascending",
        desc: "Descending",
        search: "Search",
        choose_profile_pic: "Choose a profile picture",
        profile_description: "Tell something about yourself in one sentence",
        select_lang: "Select language",
        home: "Home",
        tasks: "Tasks",
        questions: "Questions",

    },
};