"use strict"

import React from 'react';
import { connect } from "react-redux";
import { Panel, Col, Row, Well, Button, ButtonGroup, Label } from 'react-bootstrap';

class Cart extends React.Component {
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
                <Panel.Body key={cartArr.id}>
                    <Row>
                        <Col xs={12} sm={4}>
                            <h6>{cartArr.title}</h6><span>    </span>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>usd. {cartArr.price}</h6>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>qty. <Label bsStyle='success'></Label></h6>
                        </Col>
                        <Col>
                            <ButtonGroup>
                                <Button bsStyle='default' bsSize='small'>-</Button>
                                <Button bsStyle='default' bsSize='small'>+</Button>
                                <Button bsStyle='danger' bsSize='small'>DELETE</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Panel.Body>
            )
        })
        return (
            <Panel bsStyle="primary">
                <Panel.Heading>
                    <Panel.Title componentClass='h3'></Panel.Title>
                </Panel.Heading>
                { cartItemsList }
            </Panel>
        )
    }
}

function mapStateToProps(state){
    return {
        cart: state.cart.cart
    }
}
export default connect(mapStateToProps)(Cart);