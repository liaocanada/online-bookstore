import config from "../../config/config";
import Layout from "../../components/Layout";
import Product from "../../components/products/Product";
import React from 'react';
import fetch from 'isomorphic-unfetch';

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

		this.state = {
            username: props.username,
            products: props.products,
            price: this.calculatePrice(props.products)
		};
	}

	// Render
	render() {
		const { username, products, price } = this.state; 

		return (
			<Layout>
				<h1>{username}'s Cart</h1>
                <h3>Total: ${price}</h3>
				{products.map(product => <Product product={product} />)}
			</Layout>
		);
	}

	calculatePrice(products) {
		return products.reduce(
			(accumulator, current) => accumulator += (parseFloat(current.price) || 0),
			0
		);
	}
}

export default Cart;