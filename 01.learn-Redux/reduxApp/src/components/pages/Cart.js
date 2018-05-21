"use strict"

import React from 'react';
import { connect } from "react-redux";
import { Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label } from 'react-bootstrap';
import { bindActionCreators } from 'redux';

import { deleteCartItem, updateCart } from '../../actions/cartActions';

class Cart extends React.Component {

    onDelete(_id) {
        const currentBookToDelete = this.props.cart;
        const indexToDelete = currentBookToDelete.findIndex((cart) => cart._id === _id)
        let cartAfterDelete = [...currentBookToDelete.slice(0, indexToDelete),
            ...currentBookToDelete.slice(indexToDelete + 1)];

        this.props.deleteCartItem(cartAfterDelete);
    }

    onIncrement(_id) {
        this.props.updateCart(_id, 1);
    }

    onDecrement(_id, quantity) {
        if (quantity > 1) {
            this.props.updateCart(_id, -1);
        }
    }
    constructor() {
        super();
        this.state = {
            showModal: false
        }
    }

    open() {
        this.setState({ showModal: true })
    }

    close() {
        this.setState({ showModal: false })
    }

    render() {
        if (this.props.cart[0]) {
            return this.renderCart();
        }
        return this.renderEmpty();
    }

    renderEmpty() {
        return (
        <div></div>
        )
    }

    renderCart() {
        const cartItemsList = this.props.cart.map((cartArr) => {
            return(
                <Panel.Body key={cartArr._id}>
                    <Row>
                        <Col xs={12} sm={4}>
                            <h6> { cartArr.title } </h6><span>    </span>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>usd. { cartArr.price } </h6>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>qty. <Label bsStyle='success'> { cartArr.quantity } </Label></h6>
                        </Col>
                        <Col>
                            <ButtonGroup>
                                <Button onClick={this.onDecrement.bind(this, cartArr._id, cartArr.quantity)} bsStyle='default' bsSize='small'>-</Button>
                                <Button onClick={this.onIncrement.bind(this, cartArr._id)} bsStyle='default' bsSize='small'>+</Button>
                                <span>    </span>
                                <Button onClick={this.onDelete.bind(this, cartArr._id)} bsStyle='danger' bsSize='small'>DELETE</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Panel.Body>
            )
        }, this) // this: to make sure onClick event it's in right context
        return (
            <Panel bsStyle="primary">
                <Panel.Heading>
                    <Panel.Title componentClass='h3'></Panel.Title>
                </Panel.Heading>
                { cartItemsList }
                <Row>
                    <Col xs={12}>
                        <h6>Total Amount: { this.props.totalAmount }</h6>
                        <Button onClick={this.open.bind(this)} bsStyle='success' bsSize='small'>PROCEED TO CHECKOUT</Button>
                    </Col>
                </Row>
                <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thank you!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>Your order has been saved</h6>
                        <p> You will recieve an email confirmation</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Col xs={6}>
                            <h6>total $: { this.props.totalAmount }</h6>
                        </Col>
                        <Button onClick={this.close.bind(this)} bsStyle='primary' bsSize='small'>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Panel>
        )
    }
}

function mapStateToProps(state){
    return {
        cart: state.cart.cart,
        totalAmount: state.cart.totalAmount,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteCartItem,
        updateCart
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);