"user strict"
import _ from 'lodash';
import React from 'react';
import { Well, Panel, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findDOMNode } from 'react-dom';

import { postBooks } from '../../actions/booksActions';
import formFields from './formFields';

class BooksForm extends React.Component {
    handleSubmit() {
        const book= [{
            title: findDOMNode(this.refs.title).value,
            description: findDOMNode(this.refs.description).value,
            price: findDOMNode(this.refs.price).value
        }]
        this.props.postBooks(book);
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
        return(
            <Well>
                <Panel>
                    {this.renderFields()}
                    <Button onClick={this.handleSubmit.bind(this)} bsStyle='primary'>Save Book</Button>
                </Panel>
            </Well>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ postBooks }, dispatch);
};

export default connect(null, mapDispatchToProps) (BooksForm);