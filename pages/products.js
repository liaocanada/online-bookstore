import useSWR from "swr";

import config from "../config/config";
import Layout from "../components/Layout";
import Product from "../components/products/Product";
import Search from "../components/products/Search";

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

    const res = await fetch(config.API_GATEWAY_ENDPOINT + "/products");
	console.log(res);
	return {
		products: await res.json()
	};
};

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