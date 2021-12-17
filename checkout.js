"use strict";
document.addEventListener('readystatechange', event => {
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
});

function ready() {
    const removebtn = document.getElementsByClassName('re-btn')
    for (const i = 0; i < removebtn.length; i++) {
        const button = removebtn[i]
        button.addEventListener('click', reCh)
    }

    const itemamount = document.getElementsByClassName('it-btn')
    for (const i = 0; i < itemamount.length; i++) {
        const input = itemamount[i]
        input.addEventListener('change', qntAdd)
    }

    const addbtn = document.getElementsByClassName('cafemeniutembtn')
    for (var i = 0; i < addbtn.length; i++) {
        const button = addbtn[i]
        button.addEventListener('click', afterincart)
    }

    document.getElementsByClassName('buy-btn')[0].addEventListener('click', buybtnclicked)
}

function buybtnclicked() {
    alert('Thank you for your purchase')
    const ctitems = document.getElementsByClassName('itemsincart')[0]
    while (ctitems.hasChildNodes()) {
        ctitems.removeChild(ctitems.firstChild)
    }
    updatecart()
}

function reCh(event) {
    const buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updatecart()
}

function qntAdd(event) {
    const input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updatecart()
}

function afterincart(event) {
    const button = event.target
    const cafeItem = button.parentElement.parentElement
    const menuit = cafeItem.getElementsByClassName('menuitem')[0].innerText
    const price = cafeItem.getElementsByClassName('menuitemprice')[0].innerText
    const imageSrc = cafeItem.getElementsByClassName('menuitemimage')[0].src
    addItemToCart(menuit, price, imageSrc)
    updatecart()
}

function addItemToCart(menuit, price, imageSrc) {
    const cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    const ctitems = document.getElementsByClassName('itemsincart')[0]
    const cartItemNames = ctitems.getElementsByClassName('cart-item-menuit')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == menuit) {
            alert('This item is already added to the cart')
            return
        }
    }
    const cartrow = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-menuit">${menuit}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-amount cart-column">
            <input class="it-btn" type="number" value="1">
            <button class="btn re-btn" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartrow
    ctitems.append(cartRow)
    cartRow.getElementsByClassName('re-btn')[0].addEventListener('click', reCh)
    cartRow.getElementsByClassName('it-btn')[0].addEventListener('change', qntAdd)
}

function updatecart() {
    const cartItemContainer = document.getElementsByClassName('itemsincart')[0]
    const cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        const cartRow = cartRows[i]
        const priceElement = cartRow.getElementsByClassName('cart-price')[0]
        const amountElement = cartRow.getElementsByClassName('it-btn')[0]
        const price = parseFloat(priceElement.innerText.replace('$', ''))
        const amount = amountElement.value
        total = total + (price * amount)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('total')[0].innerText = '$' + total
}