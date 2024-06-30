/** @format */

//we need to get the updated and saved cart from local storage so that we can change and save it again
/**
 * to get the saved cart from the local storage we use .getItem  method
 * but we change the cart to String so that we can save it in local storage
 * so we have to change back the cart to an array by using JSON.parse
 *  JSON.parse(localStorage.getItem("what ever we want to get from the local storage"))
 */
export let cart = JSON.parse(localStorage.getItem("cart"));
/**
 * if we don't have anything in our cart localStorage will give us null
 * so to avoid that problem we give the cart a default value to start if its empty
 * if !cart  means nothing saved in cart = null for cart
 */
if (!cart) {
	cart = [
		{
			productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
			quantity: 2,
			deliveryOptionId: "1",
		},
		{
			productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
			quantity: 1,
			deliveryOptionId: "2",
		},
	];
}
/**
 * to save the orders
 * create a function
 * save the created cart in to the local storage by  localStorage.setItem()
 * localStorage.setItem("name of what ever we want to save" JSON.stringify(what ever we want to save)
 * using JSON.stringify to change what ever we want to save to String so that we can save it in local storage )
 */
function saveToStorage() {
	localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
	let matchingItem;

	cart.forEach((cartItem) => {
		if (productId === cartItem.productId) {
			matchingItem = cartItem;
		}
	});

	if (matchingItem) {
		matchingItem.quantity += 1;
	} else {
		cart.push({
			productId: productId,
			quantity: 1,
			deliveryOptionId: "1",
		});
	}
	// we are updating te cart so we have to save it  in local storage
	saveToStorage();
}
/**
 * for the delete link
 * 1- create a new array
 * 2- loop through the cart
 * 3- add the each product to the new array except for this productId
 *
 */
export function removeFromCart(productId) {
	const newCart = [];
	//create a new array
	cart.forEach((cartItem) => {
		// add the cartItem to the new array except if it has the productId
		if (cartItem.productId !== productId) {
			newCart.push(cartItem);
		}
	});
	//change the cart array the the new array
	cart = newCart;
	// we are updating te cart so we have to save it  in local storage
	saveToStorage();
}
/**
 *  know the product  (productId)
 *  know delivery option that we chose (deliveryOptionId)
 * steps
 * 1- loop through the cart and find the product
 * 2- update the deliveryOptionId of that product
 * 3- we export it to use it in order summery in event listeners
 */
export function updateDeliveryOption(productId, deliveryOptionId) {
	//create a variable so that we we find the product we save it in to the variable
	let matchingItem;
	//loop through the cart to find the product and save it in to the variable
	cart.forEach((cartItem) => {
		if (productId === cartItem.productId) {
			matchingItem = cartItem;
		}
	});

	matchingItem.deliveryOptionId = deliveryOptionId;

	saveToStorage();
}
