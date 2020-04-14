import Link from "next/link";
import Router from "next/router";
import { Media, Button, Form } from 'react-bootstrap';

import linkify from '../../helpers/linkify';
import capitalize from "../../helpers/capitalize";

class Product extends React.Component {

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
					<strong className="red float-right">${price.toFixed(2)}</strong>
					<Link href="/products/[id]" as={"/products/" + product_id}>
						<a><h5>{name}</h5></a>
					</Link>
					<p>
						<Form inline>
							<Form.Label>Quantity:</Form.Label>
							<Form.Control value={quantity} size="sm" />
							<Button variant="outline-primary" size="sm" onClick={() => this.updateQuantity()}>
								Update
						</Button>
						</Form>

						{!!authors && <>By {authors}<br /></>}
						{!!format && <>{capitalize(format)} format<br /></>}
						<a href="#" onClick={() => this.delete()}>Delete</a>
					</p>
				</Media.Body>
			</Media>
		);
	}

	updateQuantity() {
		
	}

	delete() {

	}
}

export default Product;