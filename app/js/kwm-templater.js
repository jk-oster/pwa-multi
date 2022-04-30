"use strict";
/*******************************************************
 *     Template Engine of kwmJS.
 *
 *     renderTemplate is a method to render any given Template into any given DOM-Container.
 *     Optional values argument serves for dynamic-data-storage.
 *     
 *     Translates %{key} and inserts &{key} values from passed in Data
 *
 *     @author Jakob Osterberger - 2022-03-28
 *******************************************************/

export default class KWM_Templater {
    constructor(templatePath) {
        this.templatePath = templatePath;
        this.langRegex = /%{(.*?)}/g;
        this.valueRegex = /&{(.*?)}/g;
    }

    renderTemplate(templateName, container, values = false) {
        return new Promise((resolve, reject) => {
            fetch(this.templatePath + templateName + ".tpl?v=0.2")
                .then(response => response.text())
                .then(template => {
                    if (!container || !container['innerHTML']) {
                        reject(new Error('no valid container specified for render'));
                    }
                    if (!template || typeof template !== 'string') {
                        reject(new Error('template invalid'));
                    }
                    container.innerHTML = this.translateTemplateValues(template, values);
                    resolve();
                })
        });
    }

    translateTemplateValues(template, values) {
        let result = template;
        for (const match of template.matchAll(this.langRegex)) {
            result = result.replace(match[0], kwm.translator.translate(match[1]));
        }
        for (const match of template.matchAll(this.valueRegex)) {
            result = result.replace(match[0], this.insertValue(match[1], values));
        }
        return result;
    }

    insertValue(key, values) {
        if (!values) return ` --Missing data: values property is "${values}"-- `;
        if (!key in values) return ` --Missing data: non_existing_key "${key}"-- `;
        return values[key];
    }
}

/*

// Example-Code for Testing:
const templater = new KWM_Templater("./templates/");
const template = "";
const container = document.getElementById("target_for_template"); //You can find this container in your index.html
const values = {my_name: "Ronald McDonald", my_age: 45};
console.log(templater.translateTemplateValues(template, values));
console.log(templater.renderTemplate(template, container, values));

 */


/*export default class KWM_Templater {
    constructor(templatePath) {
        this.templatePath = templatePath;
    }

    renderTemplate(templateName, container, values = false) {
        return new Promise((resolve, reject) => {
            fetch(this.templatePath + templateName + ".tpl?v=0.2")
                .then(response => response.text())
                .then(template => {
                    let translations = /<%>/gi,
                        data = /<&>/gi,
                        translations_open = [],
                        translations_close = [],
                        data_open = [],
                        data_close = [];

                    let rendered = this.findAndFillEscapings(data, data_open, data_close, "fill", template);
                    rendered = this.findAndFillEscapings(translations, translations_open, translations_close, "translate", rendered);
                    container.innerHTML = rendered;
                    resolve();
                });
        });
    }

    findAndFillEscapings(regex, open, close, mode, template) {
        let even = true;
        let rendered = template;
        let result;
        while (result = regex.exec(template)) {
            even ? open.push(result.index) : close.push(result.index);
            even = !even;
        }
        for (let i = 0; i < open.length; i++) {
            let toReplace = template.substring(open[i] + 3, close[i]);
            let replacing = mode === "translate" ? kwm.translator.translate(toReplace) : values[toReplace];
            rendered = rendered.replace(template.substring(open[i], close[i] + 3), replacing);
        }
        return rendered;
    }
}*/
