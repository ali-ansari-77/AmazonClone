/**
 * we can
 *
 * @format
 */

export const deliveryOptions = [
	{
		id: "1",
		deliveryDays: 7,
		priceCents: 0,
	},
	{
		id: "2",
		deliveryDays: 3,
		priceCents: 499,
	},
	{
		id: "3",
		deliveryDays: 1,
		priceCents: 999,
	},
];
//create a function to get the full delivery option details and store to use it
export function getDeliveryOption(deliveryOptionId) {
	// create a variable to store the result
	let deliveryOption;

	deliveryOptions.forEach((option) => {
		if (option.id === deliveryOptionId) {
			deliveryOption = option;
		}
	});
	// we return the deliveryOption so that we can use this outside of the function
	//we give it a default value to be safe
	//
	return deliveryOption || deliveryOptions[0];
}
