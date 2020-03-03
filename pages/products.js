import Layout from "../components/Layout";
import Product from "../components/products/Product";

const Products = props => {
	const { dummyProducts, filter } = props;
	console.log(filter);
	
	return (
		<Layout>
			<h1>All Products</h1>
			{filter.name &&
				<p>There was a name filter for {filter.name} but this is not supported yet.</p>
			}
			{dummyProducts.map(({id, name, price}) => <Product key={id} id={id} name={name} price={price} />)}
		</Layout>
	);
};

Products.getInitialProps = async context => {
	const { name, id, minPrice, maxPrice } = context.query;

	// TEST: page doesn't load until props are retrieved
	await new Promise(r => setTimeout(r, 5000));

	// TODO get info about all products that fit the filter from DB
	return {
		dummyProducts: [
			{id: "pid001", name: "product1", price: 1.00}, 
			{id: "pid002", name: "product2", price: 2.00}, 
			{id: "pid003", name: "product3", price: 3.00},
		],
		filter: {
			name, id, minPrice, maxPrice
		}
	};
};

export default Products;