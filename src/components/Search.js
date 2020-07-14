import React from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

class Search extends React.Component {

	constructor(props) {
		super(props);
		this.state = { text: "" };
	}

	render() {
		return (
			<InputGroup>
				<InputGroup.Prepend>
					<Form.Control as="select" custom>
						<option>All Products</option>
						<option>Books</option>
						<option>Other Items</option>
					</Form.Control>
				</InputGroup.Prepend>
				<Form.Control
					value={this.state.text}
					onChange={event => this.setState({ text: event.target.value })}
				/>
				<InputGroup.Append>
					<Button variant="outline-primary" onClick={() => this.handleSubmit()}>
						Search
					</Button>
				</InputGroup.Append>
			</InputGroup>


			// <Form inline>


			// </Form>
		);
	}

	handleSubmit() {
		const search = this.state.text;
		const query = search ? ("?q=" + search) : "";
		// Router.push("/products" + query);
	}
};

export default Search;