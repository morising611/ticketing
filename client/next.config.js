module.exports = {
  wabpackDevMiddleware: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
};
