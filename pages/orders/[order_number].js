import config from "../../config/config";
import Layout from "../../components/Layout";
import Product from "../../components/products/Product";
import React from 'react';
import fetch from 'isomorphic-unfetch';

class Order extends React.Component {

	// Query API Gateway for products
	static async getInitialProps(context) {
        const { order_number } = context.query;
		const res = await fetch(config.API_GATEWAY_ENDPOINT + "/order/"+order_number);
		return {
            order_number: order_number,
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
            order_number: props.order_number,
            products: props.products,
            price: price
		};
	}

	// Render
	render() {
		return (
			<Layout>
				<h1>Order #{this.state.order_number}</h1>
                <h3>Total: ${this.state.price.toString()}</h3>
				{this.state.products.map(({ product_id, name, description, price, isbn, authors, genres, quantity }) => <Product key={name} id={product_id} name={name} description={description} price={parseFloat(price)} isbn={isbn} authors={authors} genres={genres} quantity={quantity} />)}
			</Layout>
		);
	}
}

export default Order;