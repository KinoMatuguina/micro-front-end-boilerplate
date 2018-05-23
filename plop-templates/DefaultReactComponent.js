/**
* {{ properCase name }}.js
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import { BaseContext } from 'frontend-react-f4-base-commons';
const { connect } = BaseContext;

{{#if baseComponentImports}}
import { BaseComponents } from 'frontend-react-f4-base-ui';

const {
{{#each baseComponentImports}}
  {{#if @last}}
  {{this}}
  {{else}}
  {{this}},
  {{/if}}
{{/each}}
} = BaseComponents;
{{/if}}

@observer
@connect
class {{ properCase name }} extends Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <div>
        <p>Change my content</p>
      </div>
    );
  }
}

{{ properCase name }}.propTypes = {
  // props definition
}

{{ properCase name }}.defaultProps = {
  // default props
}


export default {{ properCase name }};