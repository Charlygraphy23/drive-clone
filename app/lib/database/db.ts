'use server';

import mongoose, { Mongoose } from "mongoose";

let cachedConnection = null as Mongoose | null

const MONGODB_CONNECTION_STATES = {
    disconnected: 0,
    connected: 1,
    connecting: 2,
    disconnecting: 3
}

const connect = async () => {
    return await mongoose.connect(process.env.MONGO_URL, {
        maxPoolSize: 1,
    }).then((conn) => {
        console.log("Connected to DB")
        return conn
    }).catch(err => {
        cachedConnection = null
        throw err
    })
}

export const connectDB = async () => {
    console.log("Let's Connect to DB")
    try {

        if (cachedConnection) {
            console.log("Found connection in cache")
            Promise.resolve(cachedConnection)
        }

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

        cachedConnection = await connect()
    }
    catch (err) {
        console.log("Error while connecting with mongodb", err)
        throw err
    }
}
