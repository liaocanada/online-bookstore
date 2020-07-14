import config from "../../config";
import Layout from "../../components/Layout";
import ProductCard from "../../components/products/ProductCard";
import React from 'react';
import fetch from 'isomorphic-unfetch';

// /orders/[order_number]

class Order extends React.Component {

	// Query API Gateway for products
	static async getInitialProps(context) {
        const { order_number } = context.query;
		const res = await fetch(config.API_GATEWAY_ENDPOINT + "/orders/"+order_number);
		return res.json();
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
			order_info:props.order_info,
            products: props.products,
            price: price
		};
	}

	// Render
	render() {
		return (
			<Layout>
				<h1>Order #{this.state.order_number}</h1>
				<h4>Delivery fee: ${parseFloat(this.state.order_info.delivery_fee)}</h4>
                <h3>Total: ${(this.state.price+parseFloat(this.state.order_info.delivery_fee)).toString()}</h3>
				<h3>Ordered by: {this.state.order_info.username}</h3>
				<h3>Status: {this.state.order_info.status}</h3>
				<h3>Billed to: {this.state.order_info.billed_to}</h3>
				<h3>Shipped to: {this.state.order_info.shipped_to}</h3>
				<h3>Time placed: {this.state.order_info.time_placed}</h3>
				{this.state.products.map((product, i) => 
					<ProductCard key={i} product={product} />)}
			</Layout>
		);
	}
}

export default Order;