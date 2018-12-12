const log4js = require('log4js');

log4js.configure({
    appenders  : { out: { type: 'stdout' }, app: { type: 'file', filename: 'logs/graphql.log' } },
    categories : { default: { appenders: ['app', 'out'], level: 'info' } },
});

const logger = log4js.getLogger('app');

export default logger;

