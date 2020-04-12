import { useRouter } from 'next/router';
import config from "../../config/config";
import Layout from '../../components/Layout';
import Link from "next/link";
import { Button } from '@material-ui/core';

const Product = ({products}) => {
	//const { isbn, name,  } = props;	
	let product = products[0];

  return (
    <Layout>
		<Link href="/products">
			<Button variant="contained">Back to Products</Button>
		</Link>
    	<h1>{product.name}</h1>
  		<p>{product.description}</p>
		<p><i>${parseFloat(product.price).toFixed(2)}</i></p>
		{product.isbn && <p>ISBN: {product.isbn}</p>}
		{product.authors && <p>Author(s): {product.authors}</p>}
		{product.genres && <p>Genre(s): {product.genres}</p>}
		{product.series && <p>Series: {product.series}</p>}
		
    </Layout>
  );
};

Product.getInitialProps = async context => {
	const { id } = context.query;
	// TODO get info about product with ID from DB
	const res = await fetch(config.API_GATEWAY_ENDPOINT + "/products/"+id);

	return {
		products: await res.json()
	};
};

export default Product;