const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const cookieParser = require('cookie-parser')
const app = express()
const port = process.env.port
const db = require('./backend/db/connection')
const cors = require('cors')
db.sequelize.sync()
.then(()=>{
    console.log("Connected to Db successfully")
})
.catch((error)=>{
console.log(error) 
})

app.use(express.json())
app.use(cookieParser())
app.use(cors())













try {
    app.use(require('./backend/routes/candidates/canroute'))
    
} catch (error) {
   console.log({error}) 
}
 

try {
    app.use(require('./backend/routes/voters/voterroute'))
    
} catch (error) {
   console.log({error}) 
}

try {
    app.use(require('./backend/routes/votes/votesrou'))
    
} catch (error) {
   console.log({error}) 
}
  



app.listen(port,()=>{
    console.log(`App Listening at ${port}`)
})