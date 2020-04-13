import config from "../../config/config";
import Layout from '../../components/Layout';
import Router from 'next/router';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import React from 'react';

class Product extends React.Component {

	static async getInitialProps(context) {
		const id = context.query.id;
		const res = await fetch(config.API_GATEWAY_ENDPOINT + "/products/" + id);
		return {
			product: (await res.json())
		};
	};

	render() {
		let product = this.props.product;

		return (
		  <Layout>
			  <Button variant="light" size="sm" onClick={() => Router.back()}>Back</Button>
			  <h1>{product.name}</h1>
			  {product.images && <Image src={product.images}/>}
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