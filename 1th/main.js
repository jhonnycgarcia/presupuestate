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