/** @format */

import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary() {
	//create a variable for the price of every product (0 as default)
	let productPriceCents = 0;
	// create a variable for the price of the shipping of every product(0 as default)
	let shippingPriceCents = 0;
	/**
	 * loop through the cart
	 * for each product : price * quantity
	 * add every thing together
	 */
	cart.forEach((cartItem) => {
		// use the product id so we can get the full product details
		// we import the getProduct() and use it to do that
		const product = getProduct(cartItem.productId);
		// every time we loop we add the price the the productPriceCents variable
		productPriceCents += product.priceCents * cartItem.quantity;
		/**
		 * calculate the shipping cost
		 * we use the get deliveryOption ()
		 * we put the delivery option id of each cart item as parameters
		 * then we add the delivery option priceCents property of each product to the
		 * shippingPriceCents variable
		 */
		const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
		shippingPriceCents += deliveryOption.priceCents;
	});
	/**
	 * so now we have the shipping price and the product price
	 * so add then together to get the total before the tax
	 * we get tax for the total by  totalBeforeTaxCents * 0.1;
	 * then we calculate the all total with  totalBeforeTaxCents + taxCents;
	 * save save every one of them in a variable so that we can use them in html
	 */
	const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
	const taxCents = totalBeforeTaxCents * 0.1;
	const totalCents = totalBeforeTaxCents + taxCents;

	const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (3):</div>
      <div class="payment-summary-money">
        $${formatCurrency(productPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
        $${formatCurrency(shippingPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalBeforeTaxCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
        $${formatCurrency(taxCents)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalCents)}
      </div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;

	document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
}
