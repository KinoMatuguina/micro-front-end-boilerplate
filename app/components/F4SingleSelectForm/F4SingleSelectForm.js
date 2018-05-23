/**
* F4SingleSelectForm.js
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import { BaseContext } from 'frontend-react-f4-base-commons';
const { connect } = BaseContext;

import { BaseComponents } from 'frontend-react-f4-base-ui';

const {
  F4Button,
  F4FormElementWrapper,
  F4FormSeparator,
  F4FormWrapper,
  F4InputCheckbox,
  F4InputCheckboxes,
  F4InputField,
  F4InputList,
  F4InputSelect,
  F4Modal,
  F4Select
} = BaseComponents;

const data = [
  'AAACORPS',
  'ABCCORPS',
  'BBCCORPS',
  'CONCATCORPS',
  'DONUTCORPS',
  'ELECTRICCORPS',
  'FOXTROTCORPS',
  'GOLFCORPS',
  'HOTELCORPS',
  'INDIACORPS',
  'JULIETCORPS',
  'KILOCORPS',
  'LIMACORPS',
  'BDO',
  'CHINABANK',
  'METROBANK',
  'DBP',
  'RCBC'
]

@observer
@connect
class F4SingleSelectForm extends Component {
  constructor(props) {
    super(props);
    this.corpsCodeOnChange = this.corpsCodeOnChange.bind(this);
    this.inputSelectOnChange = this.inputSelectOnChange.bind(this);
  }

  inputSelectOnChange(event) {
    const { inputSelectOnChange } = this.props;
    inputSelectOnChange(event);
    console.log(event);
  }

  // the onChange props of input F4InputField is passing the value on the second param 
  // onChange(name, value)
  corpsCodeOnChange(name, value) {
    const { corpCodeOnChange } = this.props;
    // if you want to get the value outside the component you need to pass the second param or on the first param
    corpCodeOnChange(name, value);
  }

  render() {
    const { corpCode, inputSelect } = this.props;
    return (
      <div>
        <F4FormWrapper>
          <F4FormElementWrapper>
            <Row>
              <Col sm={10}>
                <F4InputField
                  onChange={this.corpsCodeOnChange}
                  name="corp-code"
                  type="text"
                  value={corpCode}
                  fieldLabel="Corporate Code"
                  id="asd"/>
                  {/* <input type="text" onChange={this.corpsCodeOnChange}
                    value={corpCode} /> */}
          
              </Col>
              <br/>
              <Col sm={10}>
                <F4InputField
                  name="corp-name"
                  onChange={this.corpsCodeOnChange}
                  fieldLabel="Corporation Name"/>
              </Col>
            </Row>
            <br/>

            
            <F4InputSelect
              name="corp-select"
              onChange={this.inputSelectOnChange}
              options={data}
              value={inputSelect}
              />
            {/* <Row>
              <Col md={3}>
                <F4InputCheckbox
                  onChange={this.onChange}
                  name="hello"
                  text="Maker"/>
              </Col>    
              <Col md={3}>
                <F4InputCheckbox
                  onChange={this.onChange}
                  name="hello2"
                  text="Maker-Approver"/>
              </Col>
              <Col md={3}>
                <F4InputCheckbox
                  onChange={this.onChange}
                  name="hello3"
                  text="Approver"/>
              </Col>
            </Row>  */}
           
          </F4FormElementWrapper>  
        </F4FormWrapper>
      </div>
    );
  }
}

F4SingleSelectForm.propTypes = {
  // props definition
}

F4SingleSelectForm.defaultProps = {
  // default props
}


export default F4SingleSelectForm;