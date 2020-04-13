import React from 'react';
import { Button, Form } from 'react-bootstrap';

class Search extends React.Component {

	constructor(props) {
		super(props);
		this.state = { text: "" };
	}

	render() {
		const submit = this.props.onSubmit;
		if (!submit) console.log("onsubmit is null!");
		
		return (
			<Form>
				<Form.Label>Genre</Form.Label>
				<Form.Control 
					value={this.state.text}
					onChange={event => this.setState({ text: event.target.value })}
				/>

				<Button variant="primary" onClick={() => submit(this.state.text)}>Search</Button>
			</Form>
		);
	}
};

export default Search;