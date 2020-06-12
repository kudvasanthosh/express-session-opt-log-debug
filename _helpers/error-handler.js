const utils=require('./utils')
const logger=utils.logger;
function errorHandler(err, req, res, next) {
    logger.log({level:'error',message:err.message})
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ message: 'Bad JSON' });S

    }    

    if (err.name === 'ValidationError') {
        // mongoose validation error
        return res.status(400).json({ message: err.message });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ message: 'Invalid Token' });
    }

    // default to 500 server error
    return res.status(500).json({ message: err.message });

    //error
    //warn
    //info
    //verbose
    //debug
    //silly
}
module.exports=errorHandler;