import Head from "next/head";
import Layout from '../components/Layout';
import { Jumbotron, Button } from "react-bootstrap";

export default function Index() {
	return (
        <>
            <Head>
                <script type="text/javascript" src="/static/handleDynamicUrl.js"></script>
            </Head>

            <Layout>
                <Jumbotron>
                    <h1>Welcome</h1>
                    <p>Welcome to the BookStore. Get started by browsing through the collection.</p>
                    <p>
                        <Button variant="primary">See all products</Button>
                    </p>
                </Jumbotron>
            </Layout>
        </>
	);
}
