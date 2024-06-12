require('dotenv').config()
const express = require('express')
const path = require('path')
const {logger, logEvents} = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const EventEmitter = require('events');
const connectBD = require('./config/dbConn')
const mongoose = require('mongoose')
const corsOptions = require('./config/coresOPtions')
const {authenticateToken} = require('./middleware/roleChecking')

const KPIRoutes = require('./routes/KPIs')
const userRoutes = require('./routes/userRoutes')
const feedbackRoutes = require('./routes/feedbackRoutes')
const attendanceRouts = require('./routes/attendanceRoute')
const notificationRoutes = require('./routes/notificationRoutes')
const loginRoute = require('./routes/loginRoute')
const reportRoutes = require('./routes/reportRoutes');
const tasksRoutes = require('./routes/taskRoutes')
const companyImageRoutes = require('./routes/companyImageRoute');


const app = express()
const port = process.env.PORT || 4000

const emitter = new EventEmitter();
emitter.setMaxListeners(20);

connectBD()

app.use(logger)
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/api/kpi', KPIRoutes)
app.use('/api/user', userRoutes)
app.use('/api/feedback', feedbackRoutes)
app.use('/api/attendance', attendanceRouts)
app.use('/api/notification', notificationRoutes)
app.use('/api/report', reportRoutes);
app.use('/api', loginRoute)
app.use('/api/task', tasksRoutes)
app.use('/companyImages', companyImageRoutes);


app.all('*', (req, res) =>{
  res.status(404)
  if(req.accepts('html')){
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  }else if(req.accepts('json')){
    res.json({msg: '404 Not Found'})
  }
  else{
    res.type('txt').send('404 Not Found')
  }
})


app.use(errorHandler)

mongoose.connection.once('open',()=>{ 
      app.listen(port, ()=>{
      console.log('listening on port:', port)
    })
})

mongoose.connection.on('error', err =>{
  console.log(err)
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrlog.log')
})