import config from "../../config";
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
        
		return {
            info: await res.json()
		};
	}

	// Define initial state
	constructor(props) {
        super(props);
        console.log(props);
		this.state = {
            name: props.info.author.name,
            picture: props.info.author.picture,
            summary: props.info.author.summary
		};
	}

	// Render
	render() {
		return (
			<Layout>
				<h1>{this.state.name}'s Books</h1>
                <Image
                    src={this.state.picture}
                    rounded
                />
                <br/>
                <h3>Summary: {this.state.summary}</h3>
                <Link href={"/products?q="+this.state.name}><a><u>Check out their books!</u></a></Link>
			</Layout>
		);
	}
}

export default Author;