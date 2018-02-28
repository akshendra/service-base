

const Service = require('./index.js');
const { EventEmitter } = require('events');

const emitter = new EventEmitter();
emitter.on('info', console.log.bind(console));
emitter.on('success', console.log.bind(console));
emitter.on('error', console.error.bind(console));

const service = new Service('test', emitter);
service.emitInfo('connecting', 'Connecting to satellites', { host: 'localhost', port: '1234' });
service.emitSuccess('Connected in single mode');
service.emitError('connecting', new Error('Satellites are destroyed, run..!!'), { host: 'localhost', port: '1234' });
