function handlerChange(event) {
    console.log('inside handleChange event', event);
}

function handlerSubtract(target) {
    const oldValue = document.getElementById(target).value;
    if (oldValue > 0) document.getElementById(target).value = Number(oldValue) - 1;
}

function handlerAddition(target, limit = 5) {
    const oldValue = document.getElementById(target).value;
    if (oldValue < limit) document.getElementById(target).value = Number(oldValue) + 1;
}


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
 * @typedef InputOptions
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
 * @property {String} class - Input Group prepend class
 * 
 * @property {InputButtonOpt} prependButton -   Text button
 * @property {InputButtonOpt} appendButton -   Text button
 */

const defaultLabelOptions = { label: 'Default Label', class: '' };
const defaultInputHelper = { text: 'Descripcion helper or validation message.', class: 'form-text text-muted' };
const defaultInputOptions = {
    id: 'defaultId',
    name: 'defaultName',
    class: 'form-control',
    value: 0,
    min: 0,
    max: 10,
    step: 1,
    inputGroupClass: 'input-group',
    inputGroupPrepend: 'input-group-prepend',
    prependButton: { class: 'btn btn-primary', text: '<strong>-</strong>' },
    inputGroupAppend: 'input-group-append',
    appendButton: { class: 'btn btn-primary', text: '<strong>+</strong>' },
    displayInputHelper: true
};


/**
 * 
 * @param {Object} configOpt 
 * @param {String} configOpt.section
 * 
 * @param {LabelOptions} configOpt.labelOpt
 * @param {InputOptions} configOpt.inputOpt
 * @param {InputHelper} configOpt.inputHelper
 * 
 * 
 */
function renderCustomInputNumber(configOpt) {
    const { section = 'default' } = configOpt;

    const labelOpt = Object.assign({}, defaultLabelOptions, configOpt.labelOpt); // Assign values
    const inputOpt = Object.assign({}, defaultInputOptions, configOpt.inputOpt); // Assign values
    const inputHelper = Object.assign({}, defaultInputHelper, configOpt.inputHelper); // Assign values

    const inputName = section + inputOpt.name;
    const inputId = section + inputOpt.id;
    let render = ``;

    if (labelOpt) render += `<label for="${inputName}" ${(labelOpt.class) ? 'class="' + labelOpt.class+'"':''}>${labelOpt.label}</label>`;

    render += `<div class="${inputOpt.inputGroupClass}">`;

    // Render prepend
    render += `<div class="${inputOpt.inputGroupPrepend}">`;
    render += `<button class="${inputOpt.prependButton.class}" type="button" onclick="document.getElementById('${inputName}').stepDown()">${inputOpt.prependButton.text}</button>`;
    render += `</div>`;

    // Render input
    render += `<input type="number" class="${inputOpt.class}" id="${inputId}" name="${inputName}" min="${inputOpt.min}" max="${inputOpt.max}" step="${inputOpt.step}" value="${inputOpt.value}" readonly>`;

    // Render append
    render += `<div class="${inputOpt.inputGroupAppend}">`;
    render += `<button class="${inputOpt.appendButton.class}" type="button" onclick="document.getElementById('${inputId}').stepUp()">${inputOpt.appendButton.text}</button>`;
    render += `</div>`;

    render += `</div>`;

    // Render Helper text
    if (inputOpt.displayInputHelper && inputHelper) render += `<small id="${inputName}Helper" class="form-text text-muted">${(inputHelper.text) ? inputHelper.text:''}</small>`;

    return render;
}

const testOpt = {
    section: 'dormitorios',
    inputOpt: {
        id: 'Test',
        name: 'Test',
        step: 2,
        displayInputHelper: true,
    },
    labelOpt: { label: 'Test Input' }
}

const a = renderCustomInputNumber(testOpt);
console.log(a);
document.getElementById('rellenar').innerHTML = a;