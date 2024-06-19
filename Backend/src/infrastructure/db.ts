import mongoose from "mongoose";

export const connectionDB = async () => {

    try {
        const connectionString = process.env.MONGODB_URI
        // const connectionString = "mongodb+srv://bethmij:Bethmi20020530.@cluster0.qsftct6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        if(!connectionString){
            throw new Error("Please add the connection string")
        }

        await mongoose.connect(connectionString)
        console.log("DB Connection Successful!")

    }catch (error){
        console.log("DB Connection Failed!", error)
    }
}
