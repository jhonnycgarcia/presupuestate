/**
 * Orden de importaciones
 * 1- Definiciones
 * 2- renderComponents
 * 3- main
 */
var data = {}; // Data Global

function handlerInputsAmount(target) {
    const item = document.getElementById(target);
    const price = document.getElementById(target).getAttribute('data-price');
    const dataName = document.getElementById(target).getAttribute('data-name');
    const [section, name] = dataName.split('-')

    if (data.hasOwnProperty(section)) { // ya existe la propiedad
        data[section] = Object.assign({}, {...data[section] }, {
            [name]: { value: item.value, price, amount: (item.value * price) }
        });
    } else { // No existe la propiedad
        data = Object.assign({}, {...data }, {
            [section]: {
                [name]: { value: item.value, price, amount: (item.value * price) }
            }
        });
    }
    calcAmount(); // Realizar calculo
}

function calcAmount() {
    let totalAmoun = 30;
    let sectionData = Object.assign({}, {...data });
    for (const section in sectionData) { // Recorrer secciones
        let sectionItems = sectionData[section];

        for (const item in sectionItems) { // Recorrer items de la seccion
            const { amount } = sectionItems[item];
            totalAmoun = totalAmoun + amount;
        }
    }

    document.getElementById('amount').innerText = totalAmoun; // Actualizar valor total
}

function handlerChange(target) {
    const item = document.getElementById(target);
    const dataName = document.getElementById(target).getAttribute('data-name');

    if (item.type === 'number') { // Handler number type
        const { value, min, max } = item;
        if (value === min) handlerInputNumberButtons(`subtract-${target}`, true);
        if (value === max) handlerInputNumberButtons(`addition-${target}`, true);
        if (value > min) handlerInputNumberButtons(`subtract-${target}`);
        if (value < max) handlerInputNumberButtons(`addition-${target}`);
    } else {
        console.log('another type of input');
    }

    handlerInputsAmount(target);
}

function handlerChangesSwitches(target) {
    const { checked, id } = target;
    const child = document.getElementById(id).getAttribute('data-target');
    if (checked) {
        document.getElementById(child).classList.remove('d-none');
    } else {
        document.getElementById(child).classList.add('d-none');
    }
}

/**
 * Funcion para habilitar o deshabilitar botones en los campos input number
 * @param {String} target 
 * @param {Boolean} value 
 */
function handlerInputNumberButtons(target, value = false) {
    const { disabled } = document.getElementById(target);
    if (disabled !== value) document.getElementById(target).disabled = value;
}

/**
 * 
 * @param {String} target - ID of target
 */
function handlerSubtract(target) {
    const oldValue = document.getElementById(target).value;
    document.getElementById(target).stepDown();
    handlerChange(target);
}

/**
 *
 * @param {String} target - ID of target
 */
function handlerAddition(target) {
    const oldValue = document.getElementById(target).value;
    document.getElementById(target).stepUp();
    handlerChange(target);
}









/**
 * @param {Object} containers 
 * @param {String} containers.section
 * @param {Array[]} containers.items
 */
function renderSections(containers) {
    for (const key in containers) {
        const { section, items } = containers[key];

        for (const idx in items) {
            const { inputOpt, type } = items[idx];

            if (type === 1) { // Input type Number
                const render = renderCustomInputNumber({...items[idx], section });
                document.getElementById(`container-${section}-${inputOpt.id}`).innerHTML = render;
            } else if (type === 3) { // Input type Text
                const render = renderCustomInputText({...items[idx], section });
                document.getElementById(`container-${section}-${inputOpt.id}`).innerHTML = render;
            } else {
                console.log(inputOpt.id);
            }
        }
    }
}


const sections = [
    { section: 'dormitorioPrincipal', items: dormitorioPrincipalItems, },
    { section: 'dormitorios', items: dormitoriosItems, },
    { section: 'comedor', items: comedorItems, },
    { section: 'cocina', items: cocinaItems, },
    { section: 'oficina', items: oficinaItems, },
    { section: 'recibidor', items: recibidorItems, },
    { section: 'trastero', items: trasteroItems, },
    { section: 'terraza', items: terrazaItems, },
    { section: 'bano', items: banoItems, },
    { section: 'cajas', items: cajasItems, },
    { section: 'lamparas', items: lamparasItems, },
];
renderSections(sections);