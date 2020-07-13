import React from 'react';
import { Toast } from 'react-bootstrap';

class ConfirmationModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isShowing: true };
    }

    render() {
        const { headerIcon, title, contents } = this.props;
        const { isShowing } = this.state;

        const toastPositionStyle = {
            position: 'absolute',
            top: 100,
            right: 0,
        };

        return (
            <Toast style={toastPositionStyle} show={isShowing} onClose={() => this.setState({ isShowing: false })}>
                <Toast.Header>
                    {headerIcon}  <strong className="mr-auto">{title}</strong>
                </Toast.Header>
                <Toast.Body>{contents}</Toast.Body>
            </Toast>
        );
    }

};

export default ConfirmationModal;