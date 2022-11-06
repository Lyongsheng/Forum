import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema } from "type-graphql";
import mongoose, {ConnectOptions} from 'mongoose'

import { ChannelResolver } from "./resolvers/channelResolver";
import { MessageResolver } from "./resolvers/messageResolver";


async function main() {
    const schema = await buildSchema({
        resolvers: [ChannelResolver, MessageResolver],
        emitSchemaFile: true
    });

    const app = Express();
    const server = new ApolloServer({ schema });
    await server.start()
    server.applyMiddleware({ app });

    app.listen(4000, () =>
        console.log("Server is running on http://localhost:4000/graphql")
    );
}

async function initMongoose(){
    const conOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // authSource: "admin",
        // user: "",
        // pass: "",
        connectTimeoutMS: 1000,
    };
    await mongoose.connect('mongodb://127.0.0.1:27017/forum', <ConnectOptions>conOptions);
}

initMongoose().then(main)
