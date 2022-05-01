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

    renderTemplate(templateName, container, values = false, mode='overwrite') {
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
                    if(mode === "append") container.innerHTML += this.translateTemplateValues(template, values);
                    else container.innerHTML = this.translateTemplateValues(template, values);
                    resolve();
                });
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