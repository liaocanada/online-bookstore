import Link from "next/link";
import { Media } from 'react-bootstrap';

import linkify from '../../helpers/linkify';
import capitalize from "../../helpers/capitalize";

const Product = props => {
	let { product_id, name, price, description, isbn, authors, genres, quantity, images, format } = props.product;

	price = parseFloat(price);
	quantity = parseInt(quantity);
	authors = linkify(authors, author => "/authors/" + author);
	genres = linkify(genres, genre => "/products?q=" + genre);

	const firstImage = images ?
		images.split(", ")[0] :
		"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRWcKnEBkzIjaZL1W1U6t8essNmhTcyZFJQdDK_MtiPPmIX1GOM&usqp=CAU";

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
					Quantity: {quantity} <br />
					{!!authors && "By " + authors} <br />
					{!!genres && "Genre(s): " + genres} <br />
					{!!format && capitalize(format) + " format"} <br />
				</p>
			</Media.Body>
		</Media>
	);
};

export default Product;