import config from "../../config/config";
import Layout from "../../components/Layout";
import ProductMedia from "../../components/cart/ProductMedia";
import React from 'react';
import fetch from 'isomorphic-unfetch';
import { Button } from "react-bootstrap";

class Cart extends React.Component {

	// Query API Gateway for products
	static async getInitialProps(context) {
        const { username } = context.query;
		const res = await fetch(config.API_GATEWAY_ENDPOINT + "/cart/"+username);
		return {
            username: username,
			products: await res.json()  // TODO make sure 200
		};
	}

	// Define initial state
	constructor(props) {
        super(props);

		const subtotal = this.calculatePrice(props.products);
		const taxes = subtotal * config.TAX_RATIO
		const total = subtotal + taxes;

		this.state = {
            username: props.username,
            products: props.products,
			subtotal,
			taxes,
			total,
			numItems: this.calculateNumItems(props.products)
		};
	}

	// Render
	render() {
		const { username, products, subtotal, taxes, total, numItems } = this.state; 

		return (
			<Layout>
				<h1>{username}'s Cart</h1>
				{products.map((product, i) => <>
						<ProductMedia key={i} product={product} />
						<hr />
					</>
				)}
				<h5 className="float-right">CAD ${subtotal.toFixed(2)}</h5>
                <h5>Subtotal ({numItems} items)</h5>

				<h5 className="float-right">CAD ${taxes.toFixed(2)}</h5>
                <h5>Taxes</h5>

				<hr />
				<h5 className="red float-right">CAD ${total.toFixed(2)}</h5>
                <h5>Total (excl. shipping)</h5>

				{/* To take up space for the right-floating button */}
				<Button className="hidden"></Button>
				<Button variant="outline-success float-right" onClick={() => this.checkOut()}>
					Check Out
				</Button>
			</Layout>
		);
	}

	calculatePrice(products) {
		return products.reduce(
			(accumulator, current) => accumulator += (parseFloat(current.price) || 0),
			0
		);
	}

	calculateNumItems(products) {
		return products.reduce(
			(accumulator, current) => accumulator += parseInt(current.quantity),
			0
		);
	}

	checkOut() {

	}
}

export default Cart;