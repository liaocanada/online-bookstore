import { useRouter } from 'next/router';

import Layout from "../components/Layout";
import Product from "../components/products/Product";

export default function Products() {
	const router = useRouter();

	const dummyProducts = [
		{id: "pid001", name: "product1", price: 1.00}, 
		{id: "pid002", name: "product2", price: 2.00}, 
		{id: "pid003", name: "product3", price: 3.00},
	];

	return (
		<Layout>
			<h1>All Products</h1>
			{router.query.name &&
				<p>There was a name filter for {router.query.name} but this is not supported yet.</p>
			}
			{dummyProducts.map(({id, name, price}) => <Product key={id} id={id} name={name} price={price} />)}
		</Layout>
	);
}