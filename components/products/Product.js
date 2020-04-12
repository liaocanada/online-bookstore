import Link from "next/link";
const fetch = require("node-fetch");

const productStyle = {
  border: "1px solid #DDD",
  margin: 20,
	padding: 20,
	cursor: "pointer"
};

const Product = ({id, name, price, description,isbn, authors, genres}) => {
	//const {id, name, price} = props;
	return (
		<Link href="/products/[id]" as={"/products/" + id}>
			<div style={productStyle}>
				<strong>{name}</strong>
				<p><i>${price.toFixed(2)}</i></p>
				<p>{description}</p>
				{isbn && <p>ISBN: {isbn}</p>}
				{authors && <p>Author(s): {authors}</p>}
				{genres && <p>Genre(s): {genres}</p>}
			</div>
		</Link>
	);
};

export default Product;