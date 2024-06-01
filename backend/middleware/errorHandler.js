    const { models } = require('mongoose')
    const {logEvents} = require('./logger')



    if (process.env.NODE_ENV === 'development') {
      console.log('Running in development mode');
    } else if (process.env.NODE_ENV === 'production') {
      console.log('Running in production mode');
    }
    
    const errorHandler = (err, req, res, next) => {
      logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log');
    
      console.error(err.stack);
    
      const status = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
      res.status(status);
    
      const response = {
        message: err.message,
      };
    
      if (process.env.NODE_ENV === 'development') {
        response.stack = err.stack;
      }
    
      res.json(response);
    };
    
    module.exports = errorHandler;
    

   