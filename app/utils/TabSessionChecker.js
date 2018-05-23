import { browserHistory } from 'react-router'
let currentLocalName;
let sessionLocalName;

export default class TabSessionChecker {
    static check() {
        currentLocalName = localStorage.getItem('LocalTabName')
        sessionLocalName = sessionStorage.getItem('SessionTabName')
        
        if (currentLocalName !== sessionLocalName) {
            browserHistory.replace('/login');
            window.location.pathname = '/login';
        }
    }
}
