import Head from "next/head";
import Layout from '../components/Layout';

export default function Index() {
	return (
        <>
            <Head>
                <script type="text/javascript" src="/static/handleDynamicUrl.js"></script>
            </Head>

            <Layout>
                <p>Hello Next.js</p>
            </Layout>
        </>
	);
}
