/**
 * @typedef LabelOptions
 * @type {object}
 * @property {string} label - Label
 * @property {string=} class - Optional class
 * 
 * @typedef InputHelper
 * @type {object}
 * @property {string} text - Text
 * @property {string=} class - Optional class
 * 
 * @typedef InputButtonOpt
 * @type {object}
 * @property {string=} class - Optional class
 * @property {string} text - Text
 * 
 * @typedef InputNumberOptions
 * @type {object}
 * @property {String} id    - ID
 * @property {String} name  - Name
 * @property {String} inputGroupClass   - Input Group concat Class
 * @property {Boolean} displayInputHelper   - Display input helper
 * @property {String} inputGroupPrepend - Input Group prepend class
 * @property {String} inputGroupAppend - Input Group prepend class
 * @property {Number} value - Input Group prepend class
 * @property {Number} min - Min value
 * @property {Number} max - Max value
 * @property {Number} step - Step jump
 * @property {Number} price - Price
 * @property {String} class - Input Group prepend class
 * 
 * @property {InputButtonOpt} prependButton -   Text button
 * @property {InputButtonOpt} appendButton -   Text button
 * 
 * @typedef InputTextOptions
 * @type {object}
 * @property {String} id    - ID
 * @property {String} name  - Name
 * @property {String} class  - Class
 * @property {String} ariaDescribedby  - 
 * @property {String} showPlaceholder  - 
 * @property {String} displayInputHelper  - 
 * 
 */

const defaultLabelOptions = { label: 'Default Label', class: '' };
const defaultInputHelper = { text: 'Descripcion helper or validation message.', class: 'form-text text-muted' };
const defaultInputNumberOptions = {
    id: 'defaultInputNumberId',
    name: 'defaultInputNumberName',
    class: 'form-control',
    value: 0,
    min: 0,
    max: 10,
    step: 1,
    price: 1,
    inputGroupClass: 'input-group',
    inputGroupPrepend: 'input-group-prepend',
    prependButton: { class: 'btn btn-primary', text: '<strong>-</strong>' },
    inputGroupAppend: 'input-group-append',
    appendButton: { class: 'btn btn-primary', text: '<strong>+</strong>' },
    displayInputHelper: true,
};


/**
 * Funcion para renderizar los Input tipo NUMBER
 * @param {Object} configOpt 
 * @param {String} configOpt.section
 * 
 * @param {LabelOptions} configOpt.labelOpt
 * @param {InputNumberOptions} configOpt.inputOpt
 * @param {InputHelper} configOpt.inputHelper
 */
function renderCustomInputNumber(configOpt) {
    const { section = 'default' } = configOpt;

    const labelOpt = Object.assign({}, defaultLabelOptions, configOpt.labelOpt); // Assign values
    const inputOpt = Object.assign({}, defaultInputNumberOptions, configOpt.inputOpt); // Assign values
    const inputHelper = Object.assign({}, defaultInputHelper, configOpt.inputHelper); // Assign values

    const inputName = section + inputOpt.name;
    const inputId = section + inputOpt.id;
    let render = ``;

    if (labelOpt) render += `<label for="${inputName}" ${(labelOpt.class) ? 'class="' + labelOpt.class + '"' : ''}>${labelOpt.label}</label>`;

    render += `<div class="${inputOpt.inputGroupClass}">`;

    // Render prepend
    render += `<div class="${inputOpt.inputGroupPrepend}">`;
    render += `<button class="${inputOpt.prependButton.class}" type="button" id="subtract-${inputName}" onclick="handlerSubtract('${inputId}')" disabled>${inputOpt.prependButton.text}</button>`;
    render += `</div>`;

    // Render input
    render += `<input type="number" class="${inputOpt.class}" id="${inputId}" name="${inputName}" data-name="${section}-${inputOpt.name}" data-price="${inputOpt.price}" min="${inputOpt.min}" max="${inputOpt.max}" step="${inputOpt.step}" value="${inputOpt.value}" readonly>`;

    // Render append
    render += `<div class="${inputOpt.inputGroupAppend}">`;
    render += `<button class="${inputOpt.appendButton.class}" type="button" id="addition-${inputName}" onclick="handlerAddition('${inputId}')">${inputOpt.appendButton.text}</button>`;
    render += `</div>`;

    render += `</div>`;

    // Render Helper text
    if (inputOpt.displayInputHelper && inputHelper) render += `<small id="${inputName}Helper" class="form-text text-muted">${(inputHelper.text) ? inputHelper.text : ''}</small>`;

    return render;
}





const defaultInputTextOptions = {
    class: 'form-control',
    name: 'defaultInputTextName',
    id: 'defaultInputTextId',
    ariaDescribedby: 'defaultInputTextNameHelper',
    showPlaceholder: true,
    placeholder: 'Default placeholder',
    displayInputHelper: true,
}

/**
 * Funcion para renderizar los campos Input tipo TEXT
 * @param {Object} configOpt
 * @param {String} configOpt.section
 *
 * @param {LabelOptions} configOpt.labelOpt
 * @param {InputTextOptions} configOpt.inputOpt
 * @param {InputHelper} configOpt.inputHelper
 */
function renderCustomInputText(configOpt) {
    const { section = 'default' } = configOpt;

    const labelOpt = Object.assign({}, defaultLabelOptions, configOpt.labelOpt); // Assign values
    const inputOpt = Object.assign({}, defaultInputTextOptions, configOpt.inputOpt); // Assign values
    const inputHelper = Object.assign({}, defaultInputHelper, configOpt.inputHelper); // Assign values

    const inputName = section + inputOpt.name;
    const inputId = section + inputOpt.id;
    let render = ``;

    if (labelOpt) render += `<label for="${inputName}" ${(labelOpt.class) ? 'class="' + labelOpt.class + '"' : ''}>${labelOpt.label}</label>`;

    render += `<input type="text" class="${inputOpt.class}" name="${inputName}" id="${inputId}" data-name="${section}-${inputOpt.name}" aria-describedby="${inputName}Helper" ${(inputOpt.showPlaceholder) ? 'placeholder="' + inputOpt.placeholder+'"':''} >`;

    if (inputOpt.displayInputHelper && inputHelper) render += `<small id="${inputName}Helper" class="form-text text-muted">${(inputHelper.text) ? inputHelper.text : ''}</small>`;

    return render;
}