import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

export default function Post() {
  const router = useRouter();

  return (
    <Layout>
      <h1>Some Product</h1>
      <p>ID: {router.query.id}</p>
    </Layout>
  );
}