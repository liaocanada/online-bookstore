import useSWR from "swr";

import config from "../config/config";
import Layout from "../components/Layout";
import Product from "../components/products/Product";

const Products = props => {
    const { products, filter } = props;
	
	return (
		<Layout>
			<h1>All Products</h1>
			{filter.name &&
				<p>There was a name filter for {filter.name} but this is not supported yet.</p>
			}
			{/* {products.map(({id, name, price}) => <Product key={id} id={id} name={name} price={parseFloat(price)} />)} */}
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
};

export default Products;