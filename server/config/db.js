import mongoose from "mongoose";
const URI = "mongodb+srv://salim_md:mdsalim@cluster0.5lx7gov.mongodb.net/myNotebook"
const connectToMongo = async () => {
    const res = await mongoose.connect(URI);
    if(res){
        console.log("Database Connected Successfully!");
    }
    else{
        console.log("Some error occured While connecting to Database");
    }
}

export default connectToMongo;