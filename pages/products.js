import useSWR from "swr";

import config from "../config/config";
import Layout from "../components/Layout";
import Product from "../components/products/Product";
import Search from "../components/products/Search";
import Link from "next/link";
import { Button } from '@material-ui/core';
import React from 'react';

class Products extends React.Component {
	constructor(props) {
	  super(props);
	//   console.log(props.products);
	//   console.log("poopoo");
	  this.state = {value: '', products: props.products};
	}

	static async getInitialProps(context) {
		console.log("getInitialProps", context);
		let req = config.API_GATEWAY_ENDPOINT + "/products";
		const filters = [];
		Object.keys(context.query).forEach(key => {
			if (context.query[key]) {
				filters.push(key + "=" + context.query[key]);
			}
		});
		// Join the parts into a query
		const filtersString = (filters.length === 0) ? "" : ("?" + filters.join("&"));

		const res = await fetch(req+filtersString);
		console.log("fetch finished", res);
		return {
			products: await res.json()
		};
	};

	/*async updateProducts(query) {
		let req = config.API_GATEWAY_ENDPOINT + "/products";

		const filters = [];
		Object.keys(query).forEach(key => {
			if (query[key]) {
				filters.push(key + "=" + query[key]);
			}
		});
		// Join the parts into a query
		const filtersString = (filters.length === 0) ? "" : ("/?" + filters.join("&"));

		const res = await fetch(req+filtersString);
		console.log(res);
		this.state.products = await res.json();

	}*/
  
	handleChange(event) {
	  this.setState({value: event.target.value});
	}
  
	render() {
			return (
				<Layout>
					<h1>Search Products</h1>
						<p>{this.state.value}</p>
						<label>
							<input type="text" onChange={() => this.handleChange()} />
						</label>
						<Link href={"/products?"+this.state.value}>
							<Button variant="contained">Search</Button>
						</Link>
					{this.state.products.map(({product_id, name, description, price, isbn, authors, genres}) => <Product key={name} id={product_id} name={name} description={description} price={parseFloat(price) }  isbn={isbn} authors={authors} genres={genres} />)}
				</Layout>
			  );
		
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