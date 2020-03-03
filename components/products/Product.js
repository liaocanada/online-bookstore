import Link from "next/link";

const productStyle = {
  border: "1px solid #DDD",
  margin: 20,
	padding: 20,
	cursor: "pointer"
};

const Product = props => {
	const {id, name, price} = props;
	return (
		<Link href="/products/[id]" as={"/products/" + id}>
			<div style={productStyle}>
				<strong>{name}</strong>
				<p><i>${price.toFixed(2)}</i></p>
			</div>
		</Link>
	);
};

export default Product;