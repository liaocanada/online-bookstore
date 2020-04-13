import Link from "next/link";
import { Card } from 'react-bootstrap';

const productStyle = {
  border: "1px solid #DDD",
  margin: 20,
	padding: 20,
	cursor: "pointer"
};

const Product = ({id, name, price, description,isbn, authors, genres, quantity}) => {
	return (
		<Link href="/products/[id]" as={"/products/" + id}>
			<Card style={productStyle}>
			<Card.Body>
				<Card.Title>{name}</Card.Title>
				<Card.Subtitle className="mb-2 text-muted">${price.toFixed(2)}</Card.Subtitle>
                <Card.Text>{quantity}</Card.Text>
				<Card.Text>{description}</Card.Text>
				{isbn && <Card.Text>ISBN: {isbn}</Card.Text>}
				{authors && <Card.Text>Author(s): {authors}</Card.Text>}
				{genres && <Card.Text>Genre(s): {genres}</Card.Text>}
			</Card.Body>
			</Card>
		</Link>
		
	);
};

export default Product;