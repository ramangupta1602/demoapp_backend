const express = require('express');
const app = express();
const db = require('./config/config')
var cors = require('cors');


require('dotenv').config()

const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());
app.use(cors());

// console.log("db...",db)
db.connection().then((db) =>{
    module.exports = db
    // app.use('/sign', require('./routes/demoapp'));
    app.use('/sign', require('./router/user.route'))
    
})
const PORT = process.env.PORT || 1200
app.listen(PORT,()=>{
    console.log(`server runnig ${PORT}`)
   
})