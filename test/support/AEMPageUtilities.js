/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const options = {
  string: ['hostname', 'port', 'username', 'password'],
  boolean: ['isAuthor', 'isWcmModeDisabled'],
  default: {
    scheme: 'http',
    hostname: 'localhost',
    username: 'admin',
    password: 'admin',
  },
};
const args = require('minimist')(process.argv.slice(2), options);

class AEMPageUtilities {
  constructor(browser, path) {
    this.path = path;
    this.browser = browser;
    this.context = null;
    this.argv = args;
    this.options = {
      scheme: args.scheme,
      hostname: args.hostname,
      port: args.port,
      isAuthor: args.isAuthor,
      isWcmModeDisabled: args.isWcmModeDisabled,
      username: args.username,
      password: args.password,
    };
  }

  set scheme(scheme) {
    this.options.scheme = scheme;
  }

  get scheme() {
    return this.options.scheme;
  }

  set hostname(hostname) {
    this.options.hostname = hostname;
  }

  get hostname() {
    return this.options.hostname;
  }

  set port(port) {
    this.options.port = port;
  }

  get port() {
    return this.options.port;
  }

  set isAuthor(isAuthor) {
    this.options.isAuthor = isAuthor;
  }

  get isAuthor() {
    return this.options.isAuthor;
  }

  set isWcmModeDisabled(isWcmModeDisabled) {
    this.options.isWcmModeDisabled = isWcmModeDisabled;
  }

  get isWcmModeDisabled() {
    return this.options.isWcmModeDisabled;
  }

  set username(username) {
    this.options.username = username;
  }

  get username() {
    return this.options.username;
  }

  set password(password) {
    this.options.password = password;
  }

  get password() {
    return this.options.password;
  }

  setPath(path) {
    this.path = path;
  }

  getPath() {
    return this.setupPath();
  }

  setupPath() {
    let url = `${this.scheme}://${this.hostname}${this.path}`;
    if (typeof this.port !== 'undefined') {
      url = `${this.scheme}://${this.hostname}:${this.port}${this.path}`;
    }
    if (typeof this.isWcmModeDisabled !== 'undefined' && this.isWcmModeDisabled === true) {
      url = `${url}?wcmmode=disabled`;
    }
    return url;
  }

  async getPage() {
    if (typeof this.isAuthor !== 'undefined') {
      console.log('handle AEM login');
      // todo: need to handle authenticating to author instance via form
      // trying with basic auth in the url redirects to the login page
    }

    this.context = await this.browser.newContext();
    // const path = await aemUtils.getPath();
    const page = await this.context.newPage(this.setupPath());
    return page;
  }
}

module.exports = AEMPageUtilities;
