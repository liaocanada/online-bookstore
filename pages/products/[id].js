import config from "../../config/config";
import Layout from '../../components/Layout';
import Link from "next/link";
import Button from 'react-bootstrap/Button';
import React from 'react';

class Product extends React.Component {

	static async getInitialProps(context) {
		const { id } = context.query;
		const res = await fetch(config.API_GATEWAY_ENDPOINT + "/products/"+id);
	
		return {
			product: (await res.json())[0]
		};
	};

	render() {
		let product = this.props.product;

		return (
		  <Layout>
			  <Link href="/products">
				  <Button class="btn btn-secondary btn-sm">Back to Products</Button>
			  </Link>
			  <h1>{product.name}</h1>
				<p>{product.description}</p>
			  <p><i>${parseFloat(product.price).toFixed(2)}</i></p>
			  {product.isbn && <p>ISBN: {product.isbn}</p>}
			  {product.authors && <p>Author(s): {product.authors}</p>}
			  {product.genres && <p>Genre(s): {product.genres}</p>}
			  {product.series && <p>Series: {product.series}</p>}
			  
		  </Layout>
		);
	}
}

export default Product;