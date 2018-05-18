"use strict"

import React from 'react';
import { connect } from 'react-redux';

class BooksList extends React.Component {
    render() {
        // console.log('ARE WE ACCESSING THE STATE?? : ', this.props.books);
        const booksList = this.props.books.map(booksArr => {
            return(
                <div key={booksArr.id}>
                    <h2>{ booksArr.title }</h2>
                    <h2>{ booksArr.description }</h2>
                    <h2>{ booksArr.price}</h2>
                </div>
            )
        })
        return (
            <div>
                <h1>Hello React</h1>
                { booksList }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        books: state.books.books
    }
}

export default connect(mapStateToProps)(BooksList);