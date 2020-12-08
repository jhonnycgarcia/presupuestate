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

            if (amount === 0) delete data[section][item]; // Limpiar arreglo de datos de items
        }

        if (Object.keys(sectionData[section]).length === 0) delete data[section]; // Limpiar arreglo de secciones
    }

    console.log(data);
    document.getElementById('amount').innerText = totalAmoun; // Actualizar valor total
}

/**
 * 
 * @param {String} id  - Target ID
 */
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
    if (document.getElementById(id).hasAttribute('data-target')) { // Validar si tiene el atributo
        const child = document.getElementById(id).getAttribute('data-target');
        if (checked) {
            document.getElementById(id).value = 1;
            try {
                document.getElementById(child).classList.remove('d-none');
            } catch (error) {
                console.log('cannot target child', chil);
            }
        } else {
            document.getElementById(id).value = 0;
            try {
                document.getElementById(child).classList.add('d-none');
            } catch (error) {
                console.log('cannot target child', chil);
            }
        }
    }

    handlerChange(target.id); // Set to save into Data
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
 * Disminuir input Number
 * @param {String} target - ID of target
 */
function handlerSubtract(target) {
    document.getElementById(target).stepDown();
    handlerChange(target);
}

/**
 * Aumentar input Number
 * @param {String} target - ID of target
 */
function handlerAddition(target) {
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
                try {
                    document.getElementById(`container-${section}-${inputOpt.id}`).innerHTML = render;
                } catch (error) {
                    console.log('cannot inner HTML to', inputOpt.id);
                }
            } else if (type === 2) { // Input type Switche
                try {
                    const render = renderCustomInputSwitche({...items[idx], section })
                    document.getElementById(`container-${section}-${inputOpt.id}`).innerHTML = render;
                } catch (error) {
                    console.log('cannot inner HTML to', inputOpt.id);
                }
            } else if (type === 3) { // Input type Text
                try {
                    const render = renderCustomInputText({...items[idx], section });
                    document.getElementById(`container-${section}-${inputOpt.id}`).innerHTML = render;
                } catch (error) {
                    console.log('cannot inner HTML to', inputOpt.id);
                }
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