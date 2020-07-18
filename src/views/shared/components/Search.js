import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, InputGroup } from 'react-bootstrap';

const handleSubmit = (search, history) => {
  const query = search ? (`?q=${search}`) : '';
  history.push(`/products${query}`);
};

const Search = () => {
  const [text, setText] = useState('');
  const history = useHistory();

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
        value={text}
        onChange={event => setText(event.target.value)}
      />
      <InputGroup.Append>
        <Button variant="outline-primary" onClick={() => handleSubmit(text, history)}>
          Search
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default Search;
