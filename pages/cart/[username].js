import config from "../config/config";
import Layout from "../components/Layout";
import ProductCart from "../components/products/ProductCart";
import React from 'react';
import fetch from 'isomorphic-unfetch';

class Cart extends React.Component {

	// Query API Gateway for products
	static async getInitialProps(context) {
        const { username } = context.query;
		const res = await fetch(config.API_GATEWAY_ENDPOINT + "/cart/"+username);
		return {
            username: username, // TODO: change this so we actually get username
			products: await res.json()
		};
	}

	// Define initial state
	constructor(props) {
        super(props);
        // figure out total price using props.product
        let price = 0;
        for (let i=0; i<props.products.length; i++) {
            price += parseFloat(props.products[i].price);
        }
		this.state = {
            username: props.username,
            products: props.products,
            price: price
		};
	}

	// Render
	render() {
		return (
			<Layout>
				<h1>{this.state.username}'s Cart</h1>
                <h3>Total: ${this.state.price.toString()}</h3>
				{this.state.products.map(({ product_id, name, description, price, isbn, authors, genres, quantity }) => <ProductCart key={name} id={product_id} name={name} description={description} price={parseFloat(price)} isbn={isbn} authors={authors} genres={genres} quantity={quantity} />)}
			</Layout>
		);
	}
}

export default Products;