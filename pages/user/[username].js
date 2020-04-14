import config from "../../config/config";
import Layout from "../../components/Layout";
import Order from "../../components/orders/Order";
import { Image } from 'react-bootstrap';
import React from 'react';
import fetch from 'isomorphic-unfetch';

class User extends React.Component {

	// Query API Gateway for products
	static async getInitialProps(context) {
        const { username } = context.query;
        const res = await fetch(config.API_GATEWAY_ENDPOINT + "/users/"+username);
		return {
            user: await res.json()
		};
	}

	// Define initial state
	constructor(props) {
        super(props);
		this.state = {
            username: props.user.user.username,
            user: props.user.user,
            orders: props.user.orders
		};
	}

	// Render
	render() {
		return (
			<Layout>
				<h1>Hello, {this.state.username}</h1>
                <Image
                    src={this.state.user.picture}
                    rounded
                />
                <h3>Real name: {this.state.user.first_name+" "+this.state.user.last_name}</h3>
                <h3>Email: {this.state.user.email}</h3>
                <h3>Address: {this.state.user.address}</h3>
                <h3>Time last logged in: {this.state.user.time_last_login}</h3>
				{this.state.orders.map(({ order_number, status, time_placed }) => <Order order_number={order_number} status={status} time_placed={time_placed} />)}
			</Layout>
		);
	}
}

export default User;