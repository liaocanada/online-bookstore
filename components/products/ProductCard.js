import Link from "next/link";
import { Card } from 'react-bootstrap';

import linkify from '../../helpers/linkify';
import config from "../../config/config";

const productStyle = {
	border: "1px solid #DDD",
	margin: 20,
	padding: 20,
	cursor: "pointer"
};

const Product = props => {
	let { product_id, name, price, description, isbn, authors, genres, quantity, images } = props.product;

	price = parseFloat(price);
	quantity = parseInt(quantity);
	authors = linkify(authors, author => "/authors/" + author);
	genres = linkify(genres, genre => "/products?q=" + genre);

	const firstImage = images ?
		images.split(", ")[0] : 
		config.BOOK_PLACEHOLDER_IMAGE;

	return (
		<Link href="/products/[id]" as={"/products/" + product_id}>
			<Card style={productStyle}>
				<Card.Img variant="top" src={firstImage} />
				<Card.Body>
					<Card.Title>{name}</Card.Title>
					<Card.Subtitle className="mb-2 text-muted">${price.toFixed(2)}</Card.Subtitle>
					{!!quantity && <Card.Text>Quantity: {quantity}</Card.Text>}
					{!!authors && <Card.Text>By {authors}</Card.Text>}
					{!!genres && <Card.Text>Genre(s): {genres}</Card.Text>}
				</Card.Body>
			</Card>
		</Link>
	);
};

export default Product;