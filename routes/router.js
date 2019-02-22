// registry all you router here
module.exports = (router) => {
  require('./basic')(router);
  require('./awesome-comments')(router);
};