'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var log4js = require('log4js');

log4js.configure({
    appenders: { out: { type: 'stdout' }, app: { type: 'file', filename: 'logs/graphql.log' } },
    categories: { default: { appenders: ['app', 'out'], level: 'info' } }
});

var logger = log4js.getLogger('app');

exports.default = logger;