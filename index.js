/**
 * The base service
 */

const debug = require('debug-logger');

class Service {
  constructor(name, emitter) {
    this.name = name;
    this.log = debug(`${name}`);

    if (!emitter || !emitter.emit || typeof emitter.emit !== 'function') {
      throw new TypeError('[emitter] passed is not a valid emitter');
    }

    this.emitter = emitter;
  }

  emitError(type, error, data = {}) {
    this.log.error({
      type, error, data,
    });
    this.emitter.emit('error', {
      service: this.name,
      type,
      error,
      data,
    });
  }

  emitLog(type, message, data = {}) {
    this.log.info({
      type, message, data,
    });
    this.emitter.emit('info', {
      service: this.name,
      type,
      message,
      data,
    });
  }
}

module.exports = Service;
