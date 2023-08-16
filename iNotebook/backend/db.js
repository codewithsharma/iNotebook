const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&ssl=false&directConnection=true";
const connectToMongo = async () => {
    try{
        await mongoose.connect(mongoURI)
            console.log("conected to MongoDb ")
    }catch(error){
        console.error(error.message)
    } 
}
module.exports= connectToMongo