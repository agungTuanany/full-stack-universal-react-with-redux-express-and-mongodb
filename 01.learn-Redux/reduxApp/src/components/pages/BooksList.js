"use strict"

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Col, Row, Button } from 'react-bootstrap';

import { getBooks } from '../../actions/booksActions';

class BooksList extends React.Component {
    componentDidMount() {
        // Dispatch an action
        this.props.getBooks();
    }

    render() {
        // console.log('ARE WE ACCESSING THE STATE?? : ', this.props.books);
        const booksList = this.props.books.map(booksArr => {
            return(
                <div key={booksArr.id}>
                    <h2>{ booksArr.title }</h2>
                    <h2>{ booksArr.description }</h2>
                    <h2>{ booksArr.price}</h2>
                    <Button bsStyle='primary'>Buy Now</Button>
                </div>
            )
        })
        return (
            <Grid>
                <Row style={{marginTop:'15px'}}>
                    {booksList}
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