/**
* F4SingleSelectFormCTR.js
*/

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Helmet from 'react-helmet';
import { BaseContainers, BaseComponents } from 'frontend-react-f4-base-ui';
import { BaseContext } from 'frontend-react-f4-base-commons';
import { observer } from 'mobx-react';

const { connect } = BaseContext;
const  { F4ContentContainer } = BaseContainers;
const {
  F4Card,
  F4Toolbar,
  F4ToolbarElement,
} = BaseComponents;

import ClientConfig from '../../config/ClientConfig';
import F4SingleSelectForm from '../../components/F4SingleSelectForm/F4SingleSelectForm';
import F4SingleSelectStore from '../../stores/F4SingleSelectStore';

@observer
@connect
class F4SingleSelectFormCTR extends Component {
  constructor(props) {
    super(props);
    this.corpCodeOnChange = this.corpCodeOnChange.bind(this);
    this.inputSelectOnChange = this.inputSelectOnChange.bind(this);
  }

  
  corpCodeOnChange(name, value) {
    const { auth, ui, F4SingleSelectStore } = this.context.store;
    // setting value to the store
    F4SingleSelectStore.corpCode = value;
    // Logging the corpCode store value
    console.log(F4SingleSelectStore.corpCode);
  }

  inputSelectOnChange(inputSelect) {
    const { auth, ui, F4SingleSelectStore } = this.context.store;
    F4SingleSelectStore.inputSelect = inputSelect;
  }

  handleSettingsClick() {
    alert('Settings clicked');
  }
  handleViewClick() {

    alert('View clicked');
  }
  render() {

    const { auth, ui, F4SingleSelectStore} = this.context.store;

    return (
      <F4ContentContainer>
        {/* top toolbar */}
        <Helmet title="TITLE HERE"/>
        {/* <F4Toolbar title={ "PAGE TITLE HERE" }>
          <F4ToolbarElement icon={"eye"} iconSize={18} text={"View"} onClick={this.handleViewClick} />
          <F4ToolbarElement icon={"cog"} iconSize={18} text={"Settings"} onClick={this.handleSettingsClick} />
        </F4Toolbar> */}
        {/* content */}
        <F4SingleSelectForm
          corpCodeOnChange={this.corpCodeOnChange} 
          corpCode={F4SingleSelectStore.corpCode}
          inputSelect={F4SingleSelectStore.inputSelect}
          inputSelectOnChange={this.inputSelectOnChange}/>
      </F4ContentContainer>
    );
  }
}

export default F4SingleSelectFormCTR;