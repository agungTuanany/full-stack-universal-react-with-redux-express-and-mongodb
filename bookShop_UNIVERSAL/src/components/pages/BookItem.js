import React, { Component } from "react";
import { Image, Row, Col, Well, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
    deleteCartItem,
    addToCart,
    updateCart
} from "../../actions/cartActions";

class BookItem extends Component {
    handleCart() {
        const book = [
            ...this.props.cart,
            {
                _id: this.props._id,
                title: this.props.title,
                description: this.props.description,
                images: this.props.images,
                price: this.props.price,
                quantity: 1
            }
        ];
        // CHECK IF CART IS EMPTY
        if (this.props.cart.length > 0) {
            // CART IS NOT EMPTY
            let _id = this.props._id;
            let cartIndex = this.props.cart.findIndex(cart => cart._id === _id);

            // IF RETURNS -1 THERE ARE NO ITEMS WITH SAME ID
            if (cartIndex === -1) {
                this.props.addToCart(book);
            } else {
                // WE NEED TO UPDATE QUANTITY
                this.props.updateCart(_id, 1, this.props.cart);
            }
        }
        // CART IS EMPTY
        this.props.addToCart(book);
    }

    constructor() {
        super();
        this.state = {
            isClicked: false
        };
    }
    onReadMore() {
        this.setState({ isClicked: true });
    }

    render() {
        return (
            <Well>
                <Row>
                    <Col>
                        <Image src={this.props.images} responsive />
                    </Col>
                    <Col xs={6} sm={8}>
                        <h6>{this.props.title}</h6>
                        <p>
                            {this.props.description.length > 50 &&
                            this.state.isClicked === false
                                ? this.props.description.substring(0, 50)
                                : this.props.description}
                            <button
                                className="link"
                                onClick={this.onReadMore.bind(this)}
                            >
                                {this.state.isClicked === false &&
                                this.props.description !== null &&
                                this.props.description.length > 50
                                    ? "...read more"
                                    : ""}
                            </button>
                        </p>
                        <h6>usd. {this.props.price}</h6>
                        <Button
                            onClick={this.handleCart.bind(this)}
                            bsStyle="primary"
                        >
                            Buy Now
                        </Button>
                    </Col>
                </Row>
            </Well>
        );
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart.cart
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            deleteCartItem,
            addToCart,
            updateCart
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(BookItem);
