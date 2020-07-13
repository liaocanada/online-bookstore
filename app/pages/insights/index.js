import React from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import { Button } from "react-bootstrap";

class Insights extends React.Component {
    render() {
        return (
            <Layout>
                <h1>Performance Insights</h1>
                <h5>Pick one:</h5>
                <Link href="/insights/income">
                    <Button variant="primary">Income</Button>
                </Link><br />
                <strong>or</strong><br />
                <Link href="/insights/sales">
                    <Button variant="primary">Sales</Button>
                </Link>
            </Layout>
        );
    }
}

export default Insights;