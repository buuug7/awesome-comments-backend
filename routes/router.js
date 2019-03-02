// registry all you router here
module.exports = (router) => {
  require('./auth')(router);
  require('./awesome-comments')(router);
};