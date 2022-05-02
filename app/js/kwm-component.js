"use strict";
/*******************************************************
 *
 *
 *     KWM - 2022-03-30
 *******************************************************/
export default class KWM_Component {
    constructor({template, renderFn}) {
        this.template = template;
        this.renderFn = renderFn;
    }

    render(container, data, mode){
        this.renderFn(container, data, mode);
    }
}