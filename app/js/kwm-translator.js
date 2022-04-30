'use strict';

/**********************************************************************
 *     Translation-Engine for KWM-JS
 *     Just add your key:"value" Pairs down by.
 *
 *     @author Jakob Osterberger - 2022-03-28
 **********************************************************************/
export default class KWM_Translator {
    constructor(...languages) {
        if (languages.length === 0) return console.error('Error: No languages specified');
        for (const lang of languages) {
            this[lang] = KWM_Resources[lang];
        }
        this.currentLanguage = languages[0];
    }

    translate(key, language = this.currentLanguage) {
        if (!this[language]) return ` --Missing translation: non_existing_language "${language}"-- `;
        if (!this[language][key]) return ` --Missing translation: non_existing_key "${key}"-- `;
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


        my_name_is: "Mein Name ist",
        hello_world: "Hallo Welt",
        it_is_me: "Ich bin's",
        welcome_message: "Willkommen bei kwmJS",
        click_me: "Klick mich!",
        whoops: "Upsi, da ist wohl was schief gegangen!",
        our_shop: "Unser Shop",
        lets_go_shopping: "Lass uns shoppen gehen",
        contact_headline: "Unsere Kontaktdaten",
        contact_me: "Kontaktiere uns",

    },
    "en": {
        my_name_is: "My name is",
        hello_world: "Hello world",
        it_is_me: "It's me",
        welcome_message: "Welcome to kwmJS!",
        click_me: "Click me!",
        whoops: "Whoopsy Daisy! Something went wrong!",
        our_shop: "Our Shop",
        lets_go_shopping: "Lets go shopping",
        contact_headline: "Our Contact Data",
        contact_me: "Contact us",
    },
    "ru": {
        my_name_is: "Mein name auf Russisch",
        hello_world: "Здравствуйте мир",
        it_is_me: "Это я",
    }
};

/* Expected result:

Hallo Welt
It's me
Здравствуйте мир
--Missing translation: non_existing_key--

 */
