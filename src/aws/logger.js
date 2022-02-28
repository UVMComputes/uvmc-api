const winston = require('winston');
const CloudWatchTransport = require('winston-aws-cloudwatch');
const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1',
});


const winstonLogger = winston.createLogger({
    level: 'info',    // Log only if info.level less than or equal to this level
    format: winston.format.json(),
    defaultMeta: { service: 'api-service' },
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({ filename: 'logs/admin_logging_important.log', level: 'verbose' }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'debug' }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
        // new CloudWatchTransport({
        //     logGroupName: 'testing',
        //     logStreamName: 'first',
        //     createLogGroup: true,
        //     createLogStream: true,
        //     submissionInterval: 2000,
        //     submissionRetryCount: 1,
        //     batchSize: 20,
        //     // awsConfig: {
        //     //     accessKeyId: '...',
        //     //     secretAccessKey: '...',
        //     //     region: '...'
        //     // },
        //     formatLog: item =>
        //         `${item.level}: ${item.message} ${JSON.stringify(item.meta)}`
        // })
    ]
});



// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    winstonLogger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}



module.exports = winstonLogger;