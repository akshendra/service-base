
const logger = require('debug-logger');

/**
 * @class Service
 */

class Service {
  /**
   * @param {string} name - name of the service
   * @param {EventEmitter} emitter - used to emit events and errors, should implement emit function
   * @param {Object} config - configuration object for the service
   *
   * @throws {TypeError} when emitter does not implement emit function
   * @throws {TypeError} when config is not object or not present at all
   */
  constructor(name, emitter, logPrefix) {
    if (!emitter) {
      throw new TypeError('Emitter not present');
    }

    if (typeof emitter.emit !== 'function') {
      throw new TypeError('Emitter should have emit function');
    }

    this.name = name;
    this.emitter = emitter;
    if (logPrefix) {
      this.log = logger(`${name}`);
    } else {
      this.log = logger(`${logPrefix}:${name}`)
    }
  }


  /**
   * Emit an error
   *
   * @param {string} type - what is tag for this error
   * @param {Error} error - error object
   * @param {Object} data - extra data useful for debugging
   */
  emitError(type, error, data = {}) {
    this.emitter.emit('error', {
      service: this.name,
      type,
      error,
      data,
    });
  }


  /**
   * Emit a log message
   *
   * @param {string} type - tag of the event
   * @param {string} message
   * @param {Object} data - extra info for debugging
   */
  emitInfo(type, message, data = {}) {
    this.emitter.emit('info', {
      service: this.name,
      type,
      message,
      data,
    });
  }

  /**
   * Emit a success
   *
   * @param {string} type - tag of the even
   * @param {string} message
   * @param {Object} data - extra info for debugging
   */
  emitSuccess(message) {
    this.emitter.emit('success', {
      service: this.name,
      message,
    });
  }
}


module.exports = Service;
