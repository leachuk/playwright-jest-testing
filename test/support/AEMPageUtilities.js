/* eslint-disable no-underscore-dangle */
class AEMPageUtilities {
  constructor() {
    this.path = 'barr';
  }

  setPath(path) {
    this.path = path;
  }

  getPath() {
    return this.setupPath();
  }

  setupPath() {
    return 'https://www.swinburne.edu.au' + this.path;
  }
}

module.exports = AEMPageUtilities;
