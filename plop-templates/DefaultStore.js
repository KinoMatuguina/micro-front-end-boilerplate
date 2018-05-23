/**
* {{ properCase name }}Store.js
*/

import { observable, extendObservable, action, asMap, reaction, autorunm, toJS } from "mobx";
import _ from 'underscore';
import StringUtil from 'string';
import { BaseMiddlewares } from 'frontend-react-f4-base-commons';
const { ClientMiddleware } = BaseMiddlewares;
import RequestUtils from '../utils/RequestUtils';
import scrollToTop from '../utils/scrollToTop';
import ScrollUtils from '../utils/ScrollUtils';

export default class {{ properCase name }}Store {

  constructor({{ properCase name }}Store) {
    if({{ properCase name }}Store) {
      Object.assign(this, {{ properCase name }}Store);
    }
  }

}
