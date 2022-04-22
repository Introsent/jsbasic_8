'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

fitlerLabel.addEventListener('click', function () {
    fitlerPopup.classList.toggle('hidden');
    fitlerLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg') {
        filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
        filterIcon.setAttribute('src', 'images/filter.svg')
    }
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function (header) {
    header.addEventListener('click', function (event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function () {
    filterSizes.classList.toggle('hidden');
});

/*Корзина*/

let click_count = 0;
let el = document.querySelector(`.hidden`)
document.querySelector(`.cartIcon`).addEventListener(`click`, () => {
    el.classList.toggle('hidden');
}
);

let click_item_count = 0;
let product_count = document.querySelector('.count');
product_count.textContent = "0"
document.querySelectorAll(`.addToCart`).forEach(buttonclick => {
    buttonclick.addEventListener(`click`, () => {
        click_item_count += 1;
        product_count.textContent = "" + click_item_count;

    });
});

const elBasket = document.querySelector('.basket');
const elBasketTotal = document.querySelector('.basketTotal');
const elBasketTotalValue = document.querySelector('.basketTotalValue');
const elBasketCounter = document.querySelector('.cartIconWrap span');

const basket = {};

document.querySelector('.featuredItems').addEventListener('click', event => {
    if (!event.target.closest('.addToCart')) {
        return;
    }
    const featuredItemEl = event.target.closest('.featuredItem');
    const id = +featuredItemEl.dataset.id;
    const name = featuredItemEl.dataset.name;
    const price = +featuredItemEl.dataset.price;
    appendCart(id, name, price);
});

function appendCart(id, name, price) {
    if (!(id in basket)) {
        basket[id] = { id: id, name: name, price: price, count: 0 };
    }
    basket[id].count++;
    elBasketCounter.textContent = TotalCount().toString();
    elBasketTotalValue.textContent = TotalPrice().toFixed(2);
    renderProduct(id);
}

function TotalCount() {
    return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
}

function TotalPrice() {
    return Object.values(basket).reduce((acc, product) => acc + product.price * product.count, 0);
}

function renderProduct(productId) {
    const elBasketLine = elBasket.querySelector(`.basketRow[data-id="${productId}"]`);
    if (!elBasketLine) {
        newProduct(productId);
    }
    const product = basket[productId];
    elBasketLine.querySelector('.productCount').textContent = product.count;
    elBasketLine
        .querySelector('.productTotalRow')
        .textContent = (product.price * product.count).toFixed(2);
}

function newProduct(productId) {
    const productLine = `
      <div class="basketRow" data-id="${productId}">
        <div>${basket[productId].name}</div>
        <div>
          <span class="productCount">${basket[productId].count}</span>
        </div>
        <div>$${basket[productId].price}</div>
        <div>
          $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
        </div>
      </div>
      `;
    elBasketTotal.insertAdjacentHTML("beforebegin", productLine);
}

