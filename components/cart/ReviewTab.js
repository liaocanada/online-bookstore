import config from "../../config/config";
import ProductMedia from "../../components/cart/ProductMedia";
import React from 'react';
import { Button, Tab } from "react-bootstrap";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

class ReviewTab extends React.Component {

	// Define initial state
	constructor(props) {
		super(props);

		const subtotal = this.calculatePrice(props.products);
		const taxes = subtotal * config.TAX_RATIO
		const total = subtotal + taxes;

		this.state = {
			products: props.products,
			subtotal,
			taxes,
			total,
			numItems: this.calculateNumItems(props.products)
		};
	}

	// Render
	render() {
		const { products, subtotal, taxes, total, numItems } = this.state;

		return (
			<Tab.Pane eventKey={this.props.eventKey}>
				{products.map((product, i) => <>
					<ProductMedia key={i} product={product} editable={false} />
					<hr />
				</>
				)}
				<h5 className="float-right">CAD ${subtotal.toFixed(2)}</h5>
				<h5>Subtotal ({numItems} items)</h5>

				<h5 className="float-right">CAD ${taxes.toFixed(2)}</h5>
				<h5>Taxes</h5>

				<hr />
				<h5 className="red float-right">CAD ${total.toFixed(2)}</h5>
				<h5>Total (excl. shipping)</h5>

                {/* TODO previous button */}
                <Button variant="success" onClick={() => {}}>
                    <FontAwesomeIcon icon={faAngleLeft} /> Prev: Shipping & Billing
                </Button>

                <Button variant="success float-right" onClick={() => this.props.next()}>
                    Place Order <FontAwesomeIcon icon={faAngleDoubleRight} />
                </Button>

			</Tab.Pane>
		);
	}

	calculatePrice(products) {
		return products
			.map(product => (parseFloat(product.price) * parseInt(product.quantity) || 0))
			.reduce(
				(accumulator, current) => accumulator += current,
				0
			);
	}

	calculateNumItems(products) {
		return products.reduce(
			(accumulator, current) => accumulator += parseInt(current.quantity),
			0
		);
	}
}

export default ReviewTab;