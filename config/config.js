var mongoClient = require('mongodb').MongoClient;


exports.connection = () => {
    return new Promise(async(resolve,reject) => {
        await mongoClient.connect('mongodb://localhost:27017',{
            useNewUrlParser: true, useUnifiedTopology: true
        },(err,client) =>{
            if(err){
                console.log("err..",err);
            }
            console.log("database connection successfully..!");
            var db = client.db('projectManagement');
            resolve(db);
        })
    })
}