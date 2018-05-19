"use strict"

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Col, Row, Button } from 'react-bootstrap';

import { getBooks } from '../../actions/booksActions';
import BookItem from './BookItem';
import BooksForm from './BooksForm';
import Cart from './Cart';

class BooksList extends React.Component {
    componentDidMount() {
        // Dispatch an action
        this.props.getBooks(
            [{
                id: 1,
                title: 'this is book title',
                description: 'this is the book description',
                price: 55.33
            }, {
                id: 2,
                title: 'this is the second book title',
                description: 'this is the second book description',
                price: 66
            }]
        );
    }

    render() {
        const booksList = this.props.books.map((booksArr) => {
            return(
                <Col key={booksArr.id} xs={12} sm={6} md={4}>
                <BookItem
                    id={booksArr.id}
                    title={booksArr.title}
                    description={booksArr.description}
                    price={booksArr.price}
                />
                </Col>
            )
        })
        return (
            <Grid>
                <Row>
                    <Cart />
                </Row>
                <Row style={{marginTop:'15px'}}>
                    <Col>
                        <BooksForm />
                    </Col>
                    { booksList }
                </Row>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return {
        books: state.books.books
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
    getBooks
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);