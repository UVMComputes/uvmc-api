const stackTrace =  require('stack-trace');
const path =  require('path');



const STACK_KEY = 'trace';

const traceError = (error) => {
    if (!(error instanceof Error)) return false;

    const trace = stackTrace.parse(error)[0];
    const fileName = path.basename(trace.getFileName());
    const functionName = trace.getFunctionName();
    const lineNumber = trace.getLineNumber();
    const message = `Error thrown from file '${fileName}' within '${functionName}' on line #${lineNumber}.`;

    return { 
        fileName, 
        functionName, 
        lineNumber, 
        message,
        stack: error.stack
    };
};
class BaseError extends Error {
    constructor(message, options) {
        super(message);
        this.status = this.message;
        this.statusCode = 500;
        this.name = this.constructor.name;

        if (options) {
            if (options instanceof Error) {
                this.cause = options;
            } else if (options.hasOwnProperty('cause') && options instanceof Error) {
                this.cause = options.cause;
            } else if(Array.isArray(options)) {
                this.reasons = options.map(e => e.reason.toString());
            }

            if(this.cause) {
                this.cause.get = this.cause.toString;
            }
        }

        this[STACK_KEY] = this._trace(this.cause);
    }
    _trace(cause) {
        if (cause && cause.hasOwnProperty(STACK_KEY)) {
            const trace = cause[STACK_KEY];
            return trace;
        } else if (cause) {
            return traceError(cause);
        }
        return traceError(this);
    }
    verbose() {
        const myself = { ...this };
        return myself;
    }
    get() {
        const myself = { ...this };
        if(myself.cause) myself.cause = myself.cause.toString();
        myself.status = this.toString();
        delete myself[STACK_KEY];
        delete myself.name;
        delete myself.statusCode;
        return myself;
    }
};

BaseError.respondOnError = (message, next) => (error) => {
    throw new BaseError(message, error);
};

module.exports = BaseError;
module.exports.BaseError = BaseError;
module.exports.default = BaseError;