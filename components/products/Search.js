import React from 'react';
import { Form } from 'react-bootstrap';

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
                <div class="form-group mx-sm-3 mb-2">
                    <Form.Label>Genre</Form.Label>
                    <Form.Control 
                        value={this.state.text}
                        onChange={event => this.setState({ text: event.target.value })}
                    />
                </div>
				

				<button class="btn btn-primary mx-sm-3 mb-2" onClick={() => submit(this.state.text)}>Search</button>
			</Form>
		);
	}
};

export default Search;