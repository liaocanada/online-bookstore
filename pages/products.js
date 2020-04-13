import config from "../config/config";
import Layout from "../components/Layout";
import Product from "../components/products/Product";
import Search from "../components/products/Search";
import React from 'react';

class Products extends React.Component {

	// Query API Gateway for products
	static async getInitialProps(context) {
		const res = await fetch(config.API_GATEWAY_ENDPOINT + "/products");
		return {
			products: await res.json()
		};
	}

	// Define initial state
	constructor(props) {
		super(props);
		this.state = {
			products: props.products,
			genreSearch: ""
		};
	}

	// Render
	render() {
		// console.log(this.state);
		
		return (
			<Layout>
				<h1>Search Products</h1>
				<Search onSubmit={genre => this.searchByGenre(genre)} />
				{this.state.products.map(({ product_id, name, description, price, isbn, authors, genres }) => <Product key={name} id={product_id} name={name} description={description} price={parseFloat(price)} isbn={isbn} authors={authors} genres={genres} />)}
			</Layout>
		);
	}

	async searchByGenre(genre) {
		if (!genre) return;
		
		const url = "/products?genre=" + genre;
		const res = await fetch(config.API_GATEWAY_ENDPOINT + url);
		const products = await res.json();
		this.setState({ products });
	}
}

export default Products;