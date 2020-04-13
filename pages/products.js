import useSWR from "swr";

import config from "../config/config";
import Layout from "../components/Layout";
import Product from "../components/products/Product";
import Search from "../components/products/Search";
import Link from "next/link";
import { Button, TextField } from '@material-ui/core';
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
		console.log("constructor");
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
				<TextField id="standard-basic" 
					label="Genre" 
					value={this.state.genreSearch}
					onChange={event => this.setState({ genreSearch: event.target.value })}
				/>
				<Button variant="contained" onClick={event => this.searchByGenre()}>Search</Button>
				{this.state.products.map(({ product_id, name, description, price, isbn, authors, genres }) => <Product key={name} id={product_id} name={name} description={description} price={parseFloat(price)} isbn={isbn} authors={authors} genres={genres} />)}
			</Layout>
		);
	}

	async searchByGenre() {
		if (!this.state.genreSearch) return;
		
		const url = "/products?genre=" + this.state.genreSearch;
		const res = await fetch(config.API_GATEWAY_ENDPOINT + url);
		const products = await res.json();
		this.setState({ products });
	}
}

/*
const Products = props => {
	console.log(products);
	const { products } = props;
	
	
	return (
		<Layout>
			<h1>Search Products</h1>
			{products.map(({product_id, name, description, price, isbn, authors, genres}) => <Product key={name} id={product_id} name={name} description={description} price={parseFloat(price) }  isbn={isbn} authors={authors} genres={genres} />)}
		</Layout>
	);
};

Products.getInitialProps = async context => {
	let req = config.API_GATEWAY_ENDPOINT + "/products";

	const filters = [];
    Object.keys(context.query).forEach(key => {
        if (context.query[key]) {
            filters.push(key + "=" + context.query[key]);
        }
    });
    // Join the parts into a query
    const filtersString = (filters.length === 0) ? "" : ("/?" + filters.join("&"));

    const res = await fetch(req+filtersString);
	console.log(res);
	return {
		products: await res.json()
	};
};*/



/*const Products = props => {
    const { products, filter } = props;
	
	return (
		<Layout>
			<h1>Search Products</h1>
			{filter.name &&
				<p>There was a name filter for {filter.name} but this is not supported yet.</p>
			}
			//{ {products.map(({id, name, price}) => <Product key={id} id={id} name={name} price={parseFloat(price)} />)} }
			{products.map(({name, price}) => <Product key={name} id={name} name={name} price={parseFloat(price)} />)}
		</Layout>
	);
};

Products.getInitialProps = async context => {
	const { name, id, minPrice, maxPrice } = context.query;

    const res = await fetch(config.API_GATEWAY_ENDPOINT + "/getAllProducts");

	return {
		products: await res.json(),
		filter: {
			name, id, minPrice, maxPrice
		}
	};
};*/

export default Products;