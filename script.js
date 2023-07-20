const items = [
    {
        name: "Casque",
        price: 75.0,
        quantity: 2,
        imageSrc:
            "https://images.unsplash.com/photo-1615375834706-98afda0d534f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FzcXVlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    },
    {
        name: "Iphone 15 Pro Ma",
        price: 1800.0,
        quantity: 1,
        imageSrc:
            "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    },
];

function removeItem(itemIndex) {
    items.splice(itemIndex, 1);
    renderItems();
}

function increment(btn) {
    const itemIndex = btn.closest(".elem-data").dataset.itemIndex;
    const inputElm = btn.previousElementSibling;
    let calcVal = parseInt(inputElm.value);
    calcVal += 1;
    inputElm.value = calcVal;
    items[itemIndex].quantity = calcVal;
    updateTotal();
}

function decrement(btn) {
    const itemIndex = btn.closest(".elem-data").dataset.itemIndex;
    const inputElm = btn.nextElementSibling;
    let calcVal = parseInt(inputElm.value);
    if (calcVal > 0) {
        calcVal -= 1;
        inputElm.value = calcVal;
        items[itemIndex].quantity = calcVal;
        updateTotal();
    }
}

function updateTotal() {
    let subtotal = 0;
    items.forEach((item) => {
        subtotal += item.price * item.quantity;
    });

    const shippingCost = 8.0;
    const total = subtotal + shippingCost;

    document.querySelector("#sub_total").textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector("#shipping_price").textContent = `$${shippingCost.toFixed(2)}`;
    document.querySelector("#total").textContent = `$${total.toFixed(2)}`;
}

function renderItems() {
    const container = document.querySelector(".card-items");
    container.innerHTML = "";

    items.forEach((item, index) => {
        const itemHTML = `
        <div class="d-flex justify-content-between elem-data" data-item-index="${index}">
          <div class="card mb-3 border-0 w-50">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${item.imageSrc}" class="img-fluid rounded-start" alt="..." />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${item.name}</h5>
                  <h6 class="card-text">$${item.price.toFixed(2)}</h6>
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-3 border-0">
            <div class="row d-flex">
                <div class="col-12" style="cursor: pointer;" onclick="removeItem(${index})">
                    <span class="fa fa-remove"></span>
                </div>
              <div class="col-md-12">
                <div class="card-body">
                  <div class="col-md-4 mb-3">
                    <div class="qty-container">
                      <button class="qty-btn-minus btn-light" type="button" onclick="decrement(this)">
                        <i class="fa fa-minus"></i>
                      </button>
                      <input type="text" name="qty" value="${item.quantity}" class="input-qty" />
                      <button class="qty-btn-plus btn-light" type="button" onclick="increment(this)">
                        <i class="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

        container.insertAdjacentHTML("beforeend", itemHTML);
    });

    updateTotal();
}

renderItems();
