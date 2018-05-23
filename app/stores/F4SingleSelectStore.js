/**
* F4SingleSelectStore.js
*/

import { observable, extendObservable, action, asMap, reaction, autorunm, toJS } from "mobx";
import _ from 'underscore';
import StringUtil from 'string';
import { BaseMiddlewares } from 'frontend-react-f4-base-commons';
const { ClientMiddleware } = BaseMiddlewares;
import RequestUtils from '../utils/RequestUtils';
import scrollToTop from '../utils/scrollToTop';
import ScrollUtils from '../utils/ScrollUtils';

export default class F4SingleSelectStore {

  constructor(F4SingleSelectStore) {
    if(F4SingleSelectStore) {
      Object.assign(this, F4SingleSelectStore);
    }
  }

  @observable
  corpCode = '';

  @observable
  corpCodeName = "";

  @observable
  corpName = "";

  @observable
  inputSelect = [];

  @action
  printConsole() {
    console.log(this.corpCode);
  }
}
