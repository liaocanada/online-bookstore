import config from "../../config/config";
import Layout from "../../components/Layout";
import ProductCart from "../../components/products/ProductCart";
import React from 'react';
import fetch from 'isomorphic-unfetch';

class Cart extends React.Component {

	// Query API Gateway for products
	static async getInitialProps(context) {
        const { username } = context.query;
		const res = await fetch(config.API_GATEWAY_ENDPOINT + "/cart/"+username);
		console.log(res);
		return {
            username: username, // TODO: change this so we actually get username
			products: await res.json()
		};
	}

	// Define initial state
	constructor(props) {
        super(props);
		console.log(props.products);
		
		const products = props.products || [];

		// Figure out total price using props.product
		const price = products.reduce(
			(accumulator, current) => accumulator += current.price
		);

		this.state = {
            username: props.username,
            products,
            price
		};
	}

	// Render
	render() {
		return (
			<Layout>
				<h1>{this.state.username}'s Cart</h1>
                <h3>Total: ${this.state.price.toString()}</h3>
				{
					this.state.products.map(({ product_id, name, description, price, isbn, authors, genres, quantity }) => 
						<ProductCart id={product_id}
							key={name}  
							name={name} 
							description={description} 
							price={parseFloat(price)} 
							isbn={isbn} 
							authors={authors} 
							genres={genres} 
							quantity={quantity} 
						/>
					)
				}
			</Layout>
		);
	}
}

export default Cart;