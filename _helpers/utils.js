const winston= require('winston');

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine( winston.format.timestamp(),
    winston.format.prettyPrint()),
    defaultMeta: { service: 'application' },
    transports: [
      new winston.transports.File({ filename: 'server-error.log', level: 'error' }),
    ]
  });

  
let exceptionHandler=(handler)=>{
    return async(req,res,next)=>{
      try{
        await handler(req,res)
      }
      catch(e){
        next(e)
      }  
    }
}

module.exports={
    exceptionHandler,
    logger
};