"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Grid, Col, Row, Button } from "react-bootstrap";

import { getBooks } from "../../actions/booksActions";
import BookItem from "./BookItem";
import BooksForm from "./BooksForm";
import Cart from "./Cart";
import BooksCarousel from "./BooksCarousel";

class BooksList extends Component {
    componentDidMount() {
        // Dispatch an action
        this.props.getBooks();
    }

    render() {
        const booksList = this.props.books.map(booksArr => {
            return (
                <Col key={booksArr._id} xs={12} sm={6} md={4}>
                    <BookItem
                        _id={booksArr._id}
                        title={booksArr.title}
                        description={booksArr.description}
                        images={booksArr.images}
                        price={booksArr.price}
                    />
                </Col>
            );
        });
        return (
            <Grid>
                <Row style={{ margin: "0 160px", padding: "30px 110px" }}>
                    <BooksCarousel />
                </Row>
                <Row>
                    <Cart />
                </Row>
                <Row style={{ marginTop: "15px" }}>{booksList}</Row>
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    return {
        books: state.books.books
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getBooks
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
