import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DevTools from 'mobx-react-devtools';
import _ from 'underscore';


import Collapse from 'react-collapse';
import classnames from 'classnames';

const isDeveloping = process.env.NODE_ENV !== 'production'

import { BaseContainers, BaseComponents, F4Theme} from 'frontend-react-f4-base-ui';
import { BaseContext } from 'frontend-react-f4-base-commons';
import { MatchMediaProvider } from '../../utils/MatchMediaProvider';
const  {
  F4WithNavContainer,
  F4BaseContainer
} = BaseContainers;

const {
  F4MuiHeader
} = BaseComponents;

// console.log(F4Theme.baseTheme);/

const { connect } = BaseContext;


const menu = [
  {
      "id": 0,
      "name": "Portal",
      "icon": "dashboard",
      "isActive": false,
      "permission": "GLOBAL",
      "url": "/dashboard",
      "children": null
  },
  {
      "id": 1,
      "name": "Account Informatiion",
      "icon": "info-circle",
      "isActive": false,
      "permission": "GLOBAL",
      "url": null,
      "children": [{
          "id": "10",
          "name": "Account List",
          "icon": null,
          "isActive": false,
          "permission": "GLOBAL",
          "url": "/account-info/account-list",
          "children": null
      }, {
          "id": "11",
          "name": "Transaction List",
          "icon": null,
          "isActive": false,
          "permission": "GLOBAL",
          "url": "/account-info/transaction-list",
          "children": null
      }, {
          "id": "12",
          "name": "Activity History",
          "icon": null,
          "isActive": false,
          "permission": "GLOBAL",
          "url": "/account-info/activity-history",
          "children": null
      }]
  },
  {
      "id": 2,
      "name": "Financial Services",
      "icon": null,
      "isActive": false,
      "permission": "GLOBAL",
      "url": null,
      "children": [{
          "id": "21",
          "name": "Fund Transfer",
          "icon": null,
          "isActive": false,
          "permission": "GLOBAL",
          "url": "/fundtransfer/",
          "children": null
      }, {
          "id": "22",
          "name": "Bills Payment",
          "icon": null,
          "isActive": false,
          "permission": "GLOBAL",
          "url": "/bills-payment/",
          "children": null
      }, {
          "id": "23",
          "name": "Integrated Payments",
          "icon": null,
          "isActive": false,
          "permission": "GLOBAL",
          "url": "/integrated-payments/",
          "children": null
      }]
  },
  {
      "id": 5,
      "name": "Contact Management",
      "icon": null,
      "isActive": false,
      "permission": "GLOBAL",
      "url": "/contacts/",
      "children": null
  },
  {
      "id": 6,
      "name": "Logout",
      "icon": "sign-out",
      "isActive": false,
      "permission": "GLOBAL",
      "url": null,
      "children": null
  }
  ]

import ClientConfig from '../../config/ClientConfig';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Scrollbars } from 'react-custom-scrollbars';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Fonticon from 'react-fontawesome';
import { browserHistory } from 'react-router'
import TabSessionChecker from '../../utils/TabSessionChecker';

// TEMPORARY
const baseTheme = {
  userAgent: "all",
  fontFamily: "daxFont",
  palette: {
    primary1Color: "#AD0101",
    accent1Color: "#7f8c8d"
  },
  tabs: {
    backgroundColor: "#FFF",
    textColor: "#AD0101",
    selectedTextColor: "#AD0101"
  },
  datePicker: {
    selectColor: "#bb141b"
  },
  tabs: {
    textColor: "#888",
    selectedTextColor: "#333"
  },
  inkBar: {
    backgroundColor: "#7f8c8d"
  },
  textField: {
    borderColor: "#e9e9e9",
    floatingLabelColor: "#333",
    focusColor: "#7f8c8d"
  }
}

// TEMPORARY

@connect
export default class App extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.toggleMobxDevTool = this.toggleMobxDevTool.bind(this);
    this.updateScreenWidth = this.updateScreenWidth.bind(this);
    this._handleDrawer = this._handleDrawer.bind(this);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    this.state = {
      isMobxDevToolVisible: false,
      open: false,
      childOpen: false,
      newChildOpen: 0
    };
  }



  _handleAccordion(i) {
    // console.log(i)
    this.setState({
      newChildOpen: i,
      childOpen: !this.state.childOpen
    })
  }




  _handleDrawer() {
    if(!this.state.open) {
      this.setState({
        open: !this.state.open
      })
    }
  }

  logout() {
    const { auth } = this.context.store;
  }

  updateScreenWidth(width) {
    const { ui } = this.context.store;
    ui.updateScreenWidth(width);

  }

  componentWillMount() {

  }

  componentDidMount() {
    const { auth, AccountOpeningStore, BasicInfoStore, FatcaStore, FileMaintenanceStore } = this.context.store;
    const apiUrl = ClientConfig.sideMenuUrl;

    //browserHistory.replace('/dashboard/');
    document.addEventListener('contextmenu', event => event.preventDefault());
    

  }

  toggleMobxDevTool() {
    this.setState({
      isMobxDevToolVisible: !this.state.isMobxDevToolVisible
    });
  }
  getMobxDevTool() {

    let mobxTool;

    if (isDeveloping && this.state.isMobxDevToolVisible) {
      mobxTool = (
        <DevTools/>
      );
    }

    return mobxTool;
  }

  reset() {
    const { AccountOpeningStore } = this.context.store;
    AccountOpeningStore.idleTime = 0
  }

  render() {

    const { auth, ui, AccountOpeningStore } = this.context.store;
    const { router } = this.context;
    const childrenProp = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, { router: router });
    });


      return  (
      <MatchMediaProvider breakpoints={ui.breakpoints} updateScreenWidth={this.updateScreenWidth}>
            { this.getMobxDevTool() }
              {/*START BODY*/}
              <F4WithNavContainer
                appContext={ClientConfig.context}
                logout={this.logout}
                user={auth.sessionUser}
                menuData={menu}
                isFetching={false}
                handleBurgerIconClick={() => { ui.navbar.toggleSideDrawer() }}
                isDrawerOpen={ui.navbar.sideDrawerIsOpen}
                screenWidth={ui.screenWidth}
                uiStore={ui}
              >
                { childrenProp }
              </F4WithNavContainer>  
              {/*END MAIN*/}
        </MatchMediaProvider>
      );
  }
}

