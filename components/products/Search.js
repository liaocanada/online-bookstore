import React from 'react';
import { Button, TextField } from '@material-ui/core';

class Search extends React.Component {

	constructor(props) {
		super(props);
		this.state = { text: "" };
	}

	render() {
		const submit = this.props.onSubmit;
		if (!submit) console.log("onsubmit is null!");
		
		return (
			<>
				<TextField id="standard-basic" 
					label="Genre" 
					value={this.state.text}
					onChange={event => this.setState({ text: event.target.value })}
				/>
				<Button variant="contained" onClick={() => submit(this.state.text)}>Search</Button>
			</>
		);
	}
};

export default Search;