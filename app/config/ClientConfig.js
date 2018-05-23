module.exports = Object.assign({
  title: 'BOILERPLATE',
  logo: 'ogo.png',
  context: process.env.APP_CONTEXT,
  sideMenuUrl: '/' + process.env.APP_CONTEXT + '/cl/loadMenu',
  logoutUrl: '/' + process.env.APP_CONTEXT + '/logout',
  logoutRedir: process.env.LOGOUT_REDIR || 'http://localhost:3000/login/',
  googleMapsApiKey: "AIzaSyBYERLfZ7ZEy1ZD2NKNmLB2XmHTuNO7fCA",
  socketIO: {
    path: '/' + process.env.APP_CONTEXT + '/io/socket'
  },
  apiEndpoints: {
    // plop will import client config here

  },
  fileUploadEndpoints: {
    single: '/' + process.env.APP_CONTEXT + '/api/file/document/post',
    link: '/' + process.env.APP_CONTEXT + '/api/file/document/link',
  }
});
