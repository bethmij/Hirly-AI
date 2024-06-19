import mongoose from "mongoose";

export const connectionDB = async () => {

    try {
        const connectionString = process.env.MONGODB_URI

        if(!connectionString){
            throw new Error("Please add the connection string")
        }

        await mongoose.connect(connectionString)
        console.log("DB Connection Successful!")

    }catch (error){
        console.log("DB Connection Failed!", error)
    }
}
