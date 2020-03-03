import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

const Product = props => {
	const { isbn, name } = props;	

  return (
    <Layout>
      <h1>{name}</h1>
      <p>ID: {isbn}</p>
    </Layout>
  );
};

Product.getInitialProps = async context => {
	const { id } = context.query;
	// TODO get info about product with ID from DB

	return {
		isbn: id,
		name: "Product with name " + id
	};
};

export default Product;