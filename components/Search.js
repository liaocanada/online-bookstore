import React from 'react';
import { Form, Button } from 'react-bootstrap';
import Router from 'next/router';

class Search extends React.Component {

	constructor(props) {
		super(props);
		this.state = { text: "" };
	}

	render() {
		return (
			<Form inline>
				<Form.Control as="select" custom>
					<option>All Products</option>
					<option>Books</option>
					<option>Other Items</option>
				</Form.Control>
				<Form.Control
					value={this.state.text}
					onChange={event => this.setState({ text: event.target.value })}
				/>
				<Button variant="outline-primary" onClick={() => this.handleSubmit()}>Search</Button>
			</Form>
		);
	}

	handleSubmit() {
		const search = this.state.text;
		const query = search ? ("?q=" + search) : "";
		Router.push("/products" + query);
	}
};

export default Search;