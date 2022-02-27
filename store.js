if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var removeCardItemButtons = document.getElementsByClassName("btn-danger");
  //console.log(removeCardItemButtons);
  for (var i = 0; i < removeCardItemButtons.length; i++) {
    var button = removeCardItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  var addToCartButtons = document.getElementsByClassName("shop-item-button");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }
}

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
  console.log(title, price, imageSrc);
  addItemToCart(title, price, imageSrc);
  ready();
  updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  //console.log(cartItems.getElementsByClassName("cart-item-title")[0]);
  // if (cartItems.getElementsByClassName("cart-item-title").includes(title))
  //   return;

  var cartItemEls = [...cartItems.getElementsByClassName("cart-item-title")];
  var cartItemTitles = cartItemEls.map((item) => {
    return item.innerText;
  });
  //console.log(cartItemTitles);

  //console.log(cartItemEls);

  if (cartItemTitles.includes(title)) {
    alert("This item is already added to the cart");
    return;
  }
  var cartRowContent = `
       <div class="cart-item cart-column">
            <img
              class="cart-item-image"
              src="${imageSrc}"
              width="100"
              height="100"
            />
            <span class="cart-item-title">${title}</span>
          </div>
          <span class="cart-price cart-column">${price}</span>
          <div class="cart-quantity cart-column">
            <input
              class="cart-quantity-input"
              type="number"
              value="2"
              min="1"
            />
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>
  `;
  cartRow.innerHTML = cartRowContent;
  cartItems.append(cartRow);
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;

  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];

    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100; //round 2 decimal places
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
}
