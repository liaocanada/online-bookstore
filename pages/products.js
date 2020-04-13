import config from "../config/config";
import Layout from "../components/Layout";
import Product from "../components/products/Product";
import React from 'react';
import fetch from 'isomorphic-unfetch';
import { CardColumns } from "react-bootstrap";

class Products extends React.Component {

	// Query API Gateway for products
	static async getInitialProps(context) {
		const q = context.query.q;
		const query = q ? 
			`?name=${q}&genre=${q}&isbn=${q}&author_name=${q}&series=${q}&format=${q}` :
			"";
		
		const res = await fetch(config.API_GATEWAY_ENDPOINT + "/products" + query);
		return {
			search: q,
			products: await res.json()
		};
	}

	// Render
	render() {
		return (
			<Layout>
				{this.props.search ? 
					<h1>Results for {this.props.search}</h1> :
					<h1>Products</h1>
				}
				
				<CardColumns>
					{products.map(product => <Product product={product} />)}
				</CardColumns>

				{this.props.products.length === 0 ? 
					<p>No results found.</p> : 
					<></>
				}
			</Layout>
		);
	}

}

export default Products;