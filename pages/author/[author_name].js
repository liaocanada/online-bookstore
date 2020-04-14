import config from "../../config/config";
import Layout from "../../components/Layout";
import Link from "next/link";
import { Image } from 'react-bootstrap';
import React from 'react';
import fetch from 'isomorphic-unfetch';

class Author extends React.Component {

	// Query API Gateway for products
	static async getInitialProps(context) {
        const { author_name } = context.query;
        const res = await fetch(config.API_GATEWAY_ENDPOINT + "/authors/"+author_name);
        const info = await res.json();
		return {
            name: info.name,
            picture: info.picture,
            summary: info.summary
		};
	}

	// Define initial state
	constructor(props) {
        super(props);
		this.state = {
            name: props.name,
            picture: props.picture,
            summary: props.summary
		};
	}

	// Render
	render() {
		return (
			<Layout>
				<h1>{this.state.name}'s Books</h1>
                <Image
                    className="d-block w-100"
                    src={this.state.picture}
                    rounded
                />
                <h3>Summary: {this.state.summary}</h3>
                <Link href={"/products?q="+this.state.name}><h4>Check out their books!</h4></Link>
			</Layout>
		);
	}
}

export default Author;