"user strict"
import _ from 'lodash';
import React from 'react';
import { Well, Panel, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';

import formFields from './formFields';

class BooksForm extends React.Component {
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
                </Panel>
            </Well>
        )
    }
}

export default BooksForm;