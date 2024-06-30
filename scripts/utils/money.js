/** @format */

export function formatCurrency(priceCents) {
	//we use math.round  so the tofixed method doesn't  round anything
	return (Math.round(priceCents) / 100).toFixed(2);
}
// by using export default when we import we can only use the name
export default formatCurrency;
