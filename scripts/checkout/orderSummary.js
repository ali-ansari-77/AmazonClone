/** @format */

import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {
	deliveryOptions,
	getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary() {
	let cartSummaryHTML = "";

	cart.forEach((cartItem) => {
		const productId = cartItem.productId;

		const matchingProduct = getProduct(productId);
		// deliveryOptionId out of the cart
		const deliveryOptionId = cartItem.deliveryOptionId;
		//a function to get the full delivery option and save it in a variable

		const deliveryOption = getDeliveryOption(deliveryOptionId);
		/**
		 * we can use day.js to get the todays date
		 * and according to the dayjs Documentation to get the todays date we can use
		 * day.js();
		 * it will give us and object that shows the todays date
		 * then we save it in a variable called today
		 */
		const today = dayjs();
		/**
		 * the we have to do the calculations of delivery dates
		 * to do that we use .add method of dayjs
		 * .add method has 2 parameters
		 * 1- number the days that we want to add
		 * 2- the length of time that we want to add like (7 , days)
		 * then we save it in a variable
		 */
		const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
		/**
		 * step 3 is to display the calculated date in an easy to read format
		 * we can use the .format  method of the dayjs
		 * Documentation shows us some special characters to put in the strings
		 * in this case we use dddd to shows the name of the day of the week
		 * we use MMMM to show the name of the month
		 * we use D to show the number of the day of the month
		 */
		const dateString = deliveryDate.format("dddd, MMMM D");

		cartSummaryHTML += `
      <div class="cart-item-container
        js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${
									cartItem.quantity
								}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
								matchingProduct.id
							}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
	});
	//  matchingProduct and cartItem  are not available if the function so use
	// put them in with parameters
	function deliveryOptionsHTML(matchingProduct, cartItem) {
		//create a variable to save the result of generated html
		let html = "";

		deliveryOptions.forEach((deliveryOption) => {
			/**
			 * we can use day.js to get the todays date
			 * and according to the dayjs Documentation to get the todays date we can use
			 * day.js();
			 * it will give us and object that shows the todays date
			 * then we save it in a variable called today
			 */
			const today = dayjs();
			/**
			 * the we have to do the calculations of delivery dates
			 * to do that we use .add method of dayjs
			 * .add method has 2 parameters
			 * 1- number the days that we want to add
			 * 2- the length of time that we want to add like (7 , days)
			 * then we save it in a variable
			 */
			const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
			/**
			 * step 3 is to display the calculated date in an easy to read format
			 * we can use the .format  method of the dayjs
			 * Documentation shows us some special characters to put in the strings
			 * in this case we use dddd to shows the name of the day of the week
			 * we use MMMM to show the name of the month
			 * we use D to show the number of the day of the month
			 */
			const dateString = deliveryDate.format("dddd, MMMM D");
			/**
			 * if the price cent is 0 we want to display free
			 * otherwise we want to use the formatCurrency function with delivery option price
			 */
			const priceString =
				/**
				 * if the condition is true  the value is what comes after ?
				 * if its false the value is what comes after :
				 */
				deliveryOption.priceCents === 0
					? "FREE"
					: `$${formatCurrency(deliveryOption.priceCents)} -`;

			const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
			/**
			 * we use this  data-product-id="${matchingProduct.id}
			 * so that in the updateDeliveryOption() we can use the productId
			 * we use this data-delivery-option-id="${deliveryOption.id}
			 * so that in the updateDeliveryOption() we can use the deliveryOptionId
			 */
			html += `
        <div class="delivery-option js-delivery-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? "checked" : ""}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `;
			/**
			 * Radio selector :
			 * <input type="radio" class="" name="">
			 * if the name in the radio selectors are the same we have to use it at same time so
			 * we should use the id of the products as names (generated id) to avoid this problem
			 */
		});

		return html;
	}
	/**
	 * up top we wrote a code for generating an html for order list
	 * and by dom we are get the div from the html page
	 * by .innerHTML  we are changing it to the generated html up top
	 */
	document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;
	/**
	 * delete links
	 *
	 * using dom to get the html for delete links  {querySelectorAll}
	 * use foreach to get link parameter and add the event listeners to the links by every click
	 * by every click run a function (removeFromCart)
	 *
	 * using the data attribute to attach the product id to the delete link so that we can use it
	 * in the function by dataset
	 *
	 *
	 */
	document.querySelectorAll(".js-delete-link").forEach((link) => {
		link.addEventListener("click", () => {
			/**
			 * using productId as a parameter allows it to be used
			 * as a variable in the created function
			 */
			const productId = link.dataset.productId;
			//update the data
			removeFromCart(productId);
			/**
			 * we ant to remove the html for the removed product
			 * use DOM to get the element that we want to remove
			 * use   .remove method of the DOM to remove the element
			 */
			const container = document.querySelector(
				`.js-cart-item-container-${productId}`
			);
			container.remove();
			// regenerate payment summery
			renderPaymentSummary();
		});
	});
	/**
	 * adding event listeners:
	 * select the class of the delivery options
	 * for the click of each button we run a function
	 *
	 * so what does the function do :
	 * 1- update the delivery option and give it the productId, deliveryOptionId
	 * 2-
	 */
	document.querySelectorAll(".js-delivery-option").forEach((element) => {
		element.addEventListener("click", () => {
			/**
			 * getting the attributes with dataset from the delivery option html
			 * const productId = element.dataset.productId
			 * const deliveryOptionId = element.dataset.deliveryOptionId
			 * but there is a shortcut for it down there
			 */
			const { productId, deliveryOptionId } = element.dataset;

			updateDeliveryOption(productId, deliveryOptionId);
			renderOrderSummary();
			renderPaymentSummary();
		});
	});
}
