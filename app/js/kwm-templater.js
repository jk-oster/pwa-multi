"use strict";
/*******************************************************
 *     Template Engine of kwmJS.
 *
 *     renderTemplate is a method to render any given Template into any given DOM-Container.
 *     Optional values argument serves for dynamic-data-storage.
 *
 *     - translates %{key}
 *     - inserts values of &{key} passed in Data
 *     - inserts other templates with <f:template>
 *     - inserts a loop of other components with <f:for>
 *
 *     @author Jakob Osterberger - 2022-03-28
 *******************************************************/
export default class KWM_Templater {
    constructor(templatePath) {
        this.templatePath = templatePath;
        this.langRegex = /%{(.*?)}/g;
        this.valueRegex = /&{(.*?)}/g;
        this.templRegex = /<f:template name="(.*?)"><\/f:template>/g;
        this.forRegex = /<f:for var="(.*?)">(.*?)<\/f:for>/g;
    }

    async renderTemplate(templateName, container, values = false, mode = 'overwrite') {
        if (!container) {
            console.error(container);
            throw new Error(`no valid container ${container} specified for rendering : '${templateName}'`);
        }
        const htmlString = await this.insertTemplate(templateName, values);
        if (mode === "append") container.innerHTML += htmlString;
        else if(mode === "fill") {
            container.innerHTML = '';
            container.innerHTML += htmlString;
        }
        else container.innerHTML = htmlString;
        console.log(container);
    }

    async insertTemplate(templateName, values) {
        const templateString = await fetch(this.templatePath + templateName + ".tpl?v=0.2").then(response => response.text());
        if (!templateString || typeof templateString !== 'string')  throw new Error(`template '${templateName}' invalid: ${templateString}`);
        const result = await this.translateTemplateValues(templateString, values);
        return result;
    }

    async translateTemplateValues(template, values) {
        let result = template;
        for (const match of template.matchAll(this.langRegex)) {
            result = result.replace(match[0], kwm.translator.translate(match[1]));
        }
        for (const match of template.matchAll(this.valueRegex)) {
            result = result.replace(match[0], this.insertValue(match[1], values));
        }
        for (const match of template.matchAll(this.forRegex)) {
            result = result.replace(match[0], await this.insertForLoop(match[1], values, match[2], 'html'));
        }
        for (const match of template.matchAll(this.templRegex)) {
            result = result.replace(match[0], await this.insertTemplate(match[1], values));
        }
        console.log(result);
        return result;
    }

    insertValue(key, values) {
        if (!values) return ` --Missing data: values property is "${values}"-- `;
        if (!key in values) return ` --Missing data: non_existing_key "${key}"-- `;
        return values[key];
    }

    async insertForLoop(key, values = {}, templateName) {
        let result = '';
        if (kwm.utils.isEmpty(values)) throw new Error(` ---No values provided in Loop with '${key}'--- `);
        if (typeof key !== 'string') throw new Error(` ---No valid key provided '${key}'--- `);
        if (!key in values && kwm.utils.isEmpty(values[key])) {
            console.error(values);
            throw new Error(` ---Key is not provided in values: '${key}'--- `);
        }
        if (!templateName) throw new Error(` ---No valid template provided for Loop with '${key}'--- `);
        else {
            const array = values[key];
            for (const values of array) {
                try {
                    result += await this.insertTemplate(templateName, values);
                } catch (err) {
                    throw new Error(err.message);
                }
            }
        }
        return result;
    }
}