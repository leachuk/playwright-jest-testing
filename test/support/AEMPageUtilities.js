/* eslint-disable no-underscore-dangle */
class AEMPageUtilities {
  constructor(path) {
    this.path = path;
  }

  /**
   * @param {string} path
   */
  set setPath(path) {
    this.path = path;
  }

  get getPath() {
    return this.setupPath();
  }

  async setupPath() {
    return 'https://www.swinburne.edu.au' + this.path;
  }
}

module.exports = AEMPageUtilities;
