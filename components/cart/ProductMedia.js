import Link from "next/link";
import Router from "next/router";
import { Media, Button, Form } from 'react-bootstrap';

import linkify from '../../helpers/linkify';
import capitalize from "../../helpers/capitalize";
import authenticationService from "../../services/authenticationService";
import config from "../../config/config";

class Product extends React.Component {

	// Process props
	static async getInitialProps(context) {
		const { username } = context.query;
		const res = await fetch(config.API_GATEWAY_ENDPOINT + "/cart/" + username);
		return {
			username: username,
			products: await res.json()  // TODO make sure 200
		};
	}

	constructor(props) {
		super(props);
		this.state = {
			newQuantity: parseInt(this.props.product.quantity),
			updated: false
		};
	}

	render() { // TODO move to didshow
		let { product_id, name, price, description, isbn, authors, genres,
			quantity, images, format } = this.props.product;

		price = parseFloat(price);
		quantity = parseInt(quantity);
		authors = linkify(authors, author => "/authors/" + author);
		genres = linkify(genres, genre => "/products?q=" + genre);

		const firstImage = images ?
			images.split(", ")[0] :
			"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRWcKnEBkzIjaZL1W1U6t8essNmhTcyZFJQdDK_MtiPPmIX1GOM&usqp=CAU";
		// TODO mv to config
		return (
			<Media>
				<img
					width={80}
					height={80}
					className="mr-3"
					src={firstImage}
				/>
				<Media.Body>
					<strong className="red float-right">${price.toFixed(2)} ea</strong>
					<Link href="/products/[id]" as={"/products/" + product_id}>
						<a><h5>{name}</h5></a>
					</Link>
					<Form inline>
						<Form.Label>Quantity:</Form.Label>
						{/* TODO make sure input is a positive integer */}
						<Form.Control
							value={this.state.newQuantity}
							onChange={event => this.setState({ newQuantity: event.target.value })}
							size="sm"
						/>

						{
							this.state.updated ? 
							<Button variant="success" size="sm" onClick={() => {}}>
								Updated!
							</Button>
								:
							<Button variant="outline-primary" size="sm" onClick={() => this.updateQuantity()}>
								Update
							</Button>
						}
					</Form>

					{!!authors && <>By {authors}<br /></>}
					{!!format && <>{capitalize(format)} format<br /></>}
					<a href="#" onClick={() => this.delete()}>Delete</a>
				</Media.Body>
			</Media>
		);
	}

	async updateQuantity() {
		const requestBody = {
			quantity: this.state.newQuantity
		};
		const fetchOptions = {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(requestBody),
		};
		const username = authenticationService.getCurrentUser().username;
		const productId = this.props.product.product_id;
		const url = config.API_GATEWAY_ENDPOINT + "/cart/" + username + "/" + productId;

		const res = await fetch(url, fetchOptions);

		this.setState({ updated: true });
		Router.reload();
	}

	async delete() {
		const requestBody = {
			quantity: 0
		};
		const fetchOptions = {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(requestBody),
		};
		const username = authenticationService.getCurrentUser().username;
		const productId = this.props.product.product_id;
		const url = config.API_GATEWAY_ENDPOINT + "/cart/" + username + "/" + productId;

		const res = await fetch(url, fetchOptions);

		Router.reload();
	}
}

export default Product;