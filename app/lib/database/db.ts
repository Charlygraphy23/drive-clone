'use server';

import mongoose from "mongoose";

const MONGODB_CONNECTION_STATES = {
    disconnected: 0,
    connected: 1,
    connecting: 2,
    disconnecting: 3
}

const connect = async () => {
    return await mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("Connected to DB")
    }).catch(err => { throw err })
}

export const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === MONGODB_CONNECTION_STATES.disconnecting) {
            console.log("Disconnecting")
        }

        if (mongoose.connection.readyState === MONGODB_CONNECTION_STATES.connecting) {
            console.log("Connecting")
            return await mongoose.connection.asPromise()
        }

        if (mongoose.connection.readyState === MONGODB_CONNECTION_STATES.connected) {
            console.log("Connected")
            return await mongoose.connection.asPromise()
        }

        await connect()
    }
    catch (err) {
        console.log("Error while connecting with mongodb", err)
    }
}
