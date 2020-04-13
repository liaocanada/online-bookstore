import config from "../config/config";
import Layout from "../components/Layout";
import Product from "../components/products/Product";
import Search from "../components/Search";
import React from 'react';
import fetch from 'isomorphic-unfetch';

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

	// Define initial state
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		products: props.products
	// 	};
	// }

	// Render
	render() {
		return (
			<Layout>
				{this.props.search ? 
					<h1>Results for {this.props.search}</h1> :
					<h1>Products</h1>
				}
				
				{
					this.props.products.map(({ product_id, name, description, price, isbn, authors, genres }) => 
						<Product id={product_id} 
							key={name} 
							name={name} 
							description={description} 
							price={parseFloat(price)} 
							isbn={isbn} 
							authors={authors} 
							genres={genres} 
						/>
					)
				}

				{this.props.products.length === 0 ? 
					<p>No results found.</p> : 
					<></>
				}
			</Layout>
		);
	}

}

export default Products;