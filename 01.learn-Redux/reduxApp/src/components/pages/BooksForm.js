"user strict"
import _ from 'lodash';
import React, { Component } from 'react';
import { Well, Panel, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findDOMNode } from 'react-dom';

import { postBooks, deleteBooks } from '../../actions/booksActions';
import formFields from './formFields';

class BooksForm extends Component {
    handleSubmit() {
        const book= [{
            title: findDOMNode(this.refs.title).value,
            description: findDOMNode(this.refs.description).value,
            price: findDOMNode(this.refs.price).value
        }]
        this.props.postBooks(book);
    }

    onDelete() {
        let bookId = findDOMNode(this.refs.delete).value;

        this.props.deleteBooks(bookId);
    }

    renderFields() {
        return _.map(formFields, ({ controlId, placeholder, ref }) => {
            return (
                <FormGroup key={controlId} controlId={controlId}>
                <ControlLabel>{controlId}</ControlLabel>
                    <FormControl
                        type='text'
                        placeholder={placeholder}
                        ref={ref}
                    />
            </FormGroup>
            );
        });
    }

    render() {
        const booksList = this.props.books.map(
            (booksArr) => <option key={booksArr._id}>{ booksArr._id }</option>
        );

        return(
            <Well>
                <Panel>
                    {this.renderFields()}
                    <Button onClick={this.handleSubmit.bind(this)} bsStyle='primary'>Save Book</Button>
                </Panel>
                <Panel sytle={{marginTop:'25px'}}>
                    <FormGroup controlId='formControlsSelect'>
                        <ControlLabel>Select a book id to delete</ControlLabel>
                        <FormControl ref='delete' componentClass='select' placeholder='select'>
                            <option value='select'>select</option>
                            { booksList }
                        </FormControl>
                    </FormGroup>
                    <Button onClick={this.onDelete.bind(this)} bsStyle='danger' bsSize='small'>Delete book</Button>
                </Panel>
            </Well>
        )
    }
}

function mapStateToProps(state) {
    return {
        books: state.books.books
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        postBooks,
        deleteBooks
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps) (BooksForm);