/** @format */

import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let productsHTML = "";
//looping  the arrays using the foreach method
products.forEach((product) => {
	productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${formatCurrency(product.priceCents)}
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
	/*
  data attribute  an html attribute 
  attach any information to an element
  data-name(only uses kebab case) = value 
  have to start with data-
  and after data- we use a name .
  getting it is with .dataset
  */
});
//take the element and put inside the js so that we can change it
//with .innerHTML and we change it to the generated html that  that we created
document.querySelector(".js-products-grid").innerHTML = productsHTML;

function updateCartQuantity() {
	/**
	 * now we are trying to change the the number of the cart quantity
	 * to do that we should loop through the cart array and add  the
	 * the cart quantity properties together
	 * 1- create an variable
	 * 2- loop through the array and get the quantities properties
	 * 3- add them together
	 * 4- find the html element for the cart number
	 * 5- get the element from html using dom
	 * 6- change it by .innerHTML to be equal to the said variable
	 */
	let cartQuantity = 0;

	cart.forEach((cartItem) => {
		cartQuantity += cartItem.quantity;
	});

	document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}
//selecting all of the add to car buttons
//lopping all of of the buttons
//using the functions that are in other pages
//event listener : the event that we want to listen to  , function after the event
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
	button.addEventListener("click", () => {
		const productId = button.dataset.productId;
		addToCart(productId);
		updateCartQuantity();
	});
});
