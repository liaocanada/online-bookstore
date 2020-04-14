import config from "../../../config/config";
import Layout from "../../../components/Layout";
import ProductsSummaryTab from "../../../components/cart/ProductsSummaryTab";
import React from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Tab, Row, Col, Nav } from "react-bootstrap";
import Link from "next/link";

class Cart extends React.Component {

	// Query API Gateway for products
	static async getInitialProps(context) {
		const { username } = context.query;
		const res = await fetch(config.API_GATEWAY_ENDPOINT + "/cart/" + username);
		return {
			username: username,
			products: await res.json()  // TODO make sure 200
		};
	}

	// Define initial state
	constructor(props) {
		super(props);
	}

	// Render
	render() {
		return (
			<Layout>
				<h1>{this.props.username}'s Cart</h1>

				<Tab.Container defaultActiveKey="product-summary">
					<Row>
						<Col sm={3}>
							<Nav variant="pills" className="flex-column">
								<Nav.Item>
									<Nav.Link eventKey="product-summary">1. Product Summary</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="second">2. Shipping & Billing</Nav.Link>
								</Nav.Item>
							</Nav>
						</Col>
						<Col sm={9}>
							<Tab.Content>
								<ProductsSummaryTab products={this.props.products} />
								<Tab.Pane eventKey="second">
									{/* <Sonnet /> */}
								</Tab.Pane>
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
			</Layout>
		);
	}

	checkOut() {

	}
}

export default Cart;