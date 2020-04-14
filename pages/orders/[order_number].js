import config from "../../config/config";
import Layout from "../../components/Layout";
import Product from "../../components/products/ProductCard";
import React from 'react';
import fetch from 'isomorphic-unfetch';

class Order extends React.Component {

	// Query API Gateway for products
	static async getInitialProps(context) {
        const { order_number } = context.query;
		const res = await fetch(config.API_GATEWAY_ENDPOINT + "/order/"+order_number);
		return res;
	}

	// Define initial state
	constructor(props) {
        super(props);
		// figure out total price using props.product
		console.log(props);
        let price = 0;
        for (let i=0; i<props.products.length; i++) {
            price += parseFloat(props.products[i].price);
        }
		this.state = {
			order_number: props.order_number,
			order_info:order_info,
            products: props.products,
            price: price
		};
	}

	// Render
	render() {
		return (
			<Layout>
				<h1>Order #{this.state.order_number}</h1>
                <h3>Total: ${(this.state.price+parseFloat(this.state.order_info.delivery_fee)).toString()}</h3>
				<h3>Ordered by: {this.state.order_info.username}</h3>
				<h3>Status: {this.state.order_info.status}</h3>
				<h3>Billed to: {this.state.order_info.billed_to}</h3>
				<h3>Shipped to: {this.state.order_info.shipped_to}</h3>
				<h3>Time placed: {this.state.order_info.time_placed}</h3>
				{this.state.products.map(({ product_id, name, description, price, isbn, authors, genres, quantity }) => <Product key={name} id={product_id} name={name} description={description} price={parseFloat(price)} isbn={isbn} authors={authors} genres={genres} quantity={quantity} />)}
			</Layout>
		);
	}
}

export default Order;