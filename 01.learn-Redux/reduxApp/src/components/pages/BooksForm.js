"user strict"
import _ from 'lodash';
import React, { Component } from 'react';
import { MenuItem, InputGroup, DropdownButton, Image, Col, Row ,Well, Panel, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findDOMNode } from 'react-dom';
import axios from 'axios';

import { postBooks, deleteBooks, getBooks, resetButton } from '../../actions/booksActions';
import formFields from './formFields';

class BooksForm extends Component {
    constructor() {
        super();
        this.state = {
            images: [{}],
            img: ''
        }
    }

    async componentDidMount() {
        this.props.getBooks();
        try{
            const res = await axios.get('/api/images');
            await this.setState({ images: res.data });
        } catch (err) {
            await this.setState({ images: "ERROR loading image take from the server", img: '' });
            console.log(err);
        }
    }

    handleSubmit() {
        const book= [{
            title: findDOMNode(this.refs.title).value,
            description: findDOMNode(this.refs.description).value,
            images: findDOMNode(this.refs.image).value,
            price: findDOMNode(this.refs.price).value
        }]
        this.props.postBooks(book);
    }

    onDelete() {
        let bookId = findDOMNode(this.refs.delete).value;

        this.props.deleteBooks(bookId);
    }

    handleSelect(img) {
        this.setState({
            img: '/images/' + img
        })
    }

    resetForm() {
        // RESET THE Button
        this.props.resetButton();

        findDOMNode(this.refs.title).value = '';
        findDOMNode(this.refs.description).value = '';
        findDOMNode(this.refs.price).value = '';
        this.setState({ img: '' });
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

        const imgList = this.state.images.map((imgArr, i) => {
            return <MenuItem
                key={i}
                eventKey={imgArr.name}
                onClick={this.handleSelect.bind(this, imgArr.name)}
            >
            { imgArr.name }
            </MenuItem>
        }, this)

        return(
            <Well>
                <Row>
                    <Col xs={12} sm={6}>
                        <Panel>
                            <InputGroup>
                                <FormControl type='text' ref='image' value={this.state.img} />
                                <DropdownButton
                                    componentClass={InputGroup.Button}
                                    id='input-dropdown-addon'
                                    title='Select an image'
                                    bsStyle='primary'
                                >
                                    { imgList }
                                </DropdownButton>
                            </InputGroup>
                        </Panel>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Panel>
                            {this.renderFields()}
                            <Button
                                onClick={(!this.props.msg)?(this.handleSubmit.bind(this)):(this.resetForm.bind(this))}
                                bsStyle={(!this.props.style)?('primary'):(this.props.style)}>
                                { (!this.props.msg)?('Save book'):(this.props.msg) }
                            </Button>
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
                    </Col>
                </Row>
            </Well>
        )
    }
}

function mapStateToProps(state) {
    return {
        books: state.books.books,
        msg: state.books.msg,
        style: state.books.style
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        postBooks,
        deleteBooks,
        getBooks,
        resetButton
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);