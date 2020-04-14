import config from "../../../config/config";
import Layout from "../../../components/Layout";
import ProductsSummaryTab from "../../../components/cart/ProductsSummaryTab";
import ShippingBillingTab from "../../../components/cart/ShippingBillingTab";
import React from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Tab, Row, Col, Nav, Tabs } from "react-bootstrap";
import authenticationService from "../../../services/authenticationService";

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

		this.tabKeys = ["product-summary", "shipping-billing", "review"];

		const defaultAddress = authenticationService.getCurrentUser().address;
		const deepCopy = obj => JSON.parse(JSON.stringify(obj));

		this.state = {
			activeTab: this.tabKeys[0],
			shippingAddress: deepCopy(defaultAddress),
			billingAddress: deepCopy(defaultAddress),
		};
	}

	// Render
	render() {
		const activeTabIndex = this.tabKeys.indexOf(this.state.activeTab);

		return (
			<Layout>
				<h1>{this.props.username}'s Cart</h1>

				<Tab.Container 
					activeKey={this.state.activeTab} 
					onSelect={key => this.setState({ activeTab: key })}>
					<Row>
						<Col sm={3}>
							<Nav variant="pills" className="flex-column">
								<Nav.Item>
									<Nav.Link eventKey={this.tabKeys[0]}>
										1. Product Summary
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey={this.tabKeys[1]}>
										2. Shipping & Billing
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey={this.tabKeys[2]} disabled={!(activeTabIndex+1 >= 2)}>
										3. Review Order
									</Nav.Link>
								</Nav.Item>
							</Nav>
						</Col>
						<Col sm={9}>
							<Tab.Content>
								
								<ProductsSummaryTab 
									eventKey={this.tabKeys[0]}
									products={this.props.products}
									next={() => this.advanceTab()} 
								/>

								<ShippingBillingTab 
									eventKey={this.tabKeys[1]}
									shippingAddress={this.state.shippingAddress}
									billingAddress={this.state.billingAddress}
									setShippingAddress={shippingAddress => this.setState({ shippingAddress })}
									setBillingAddress={billingAddress => this.setState({ billingAddress })}
									next={() => this.advanceTab()} 
								/>

								<Tab.Pane eventKey="third">
									{/* <Sonnet /> */}
								</Tab.Pane>

							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
			</Layout>
		);
	}

	advanceTab() {
		const activeTabIndex = this.tabKeys.indexOf(this.state.activeTab);
		if (activeTabIndex >= this.tabKeys.length) throw new Error("Invalid tab index");

		if (activeTabIndex === this.tabKeys.length-1) {
			this.submitOrder();
			return;
		}
		
		this.setState({
			activeTab: this.tabKeys[activeTabIndex+1]
		});
	}

	submitOrder() {

	}
}

export default Cart;