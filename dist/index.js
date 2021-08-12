"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const apollo_server_express_1 = require("apollo-server-express");
const graphql_middleware_1 = require("graphql-middleware");
const schema_1 = require("@graphql-tools/schema");
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const typeDefs_1 = require("./graphql/typeDefs");
const resolvers_1 = __importDefault(require("./graphql/resolvers"));
const middleware_1 = require("./graphql/middleware");
const initServer = async () => {
    const app = express_1.default();
    app.use(cors_1.default({
        origin: "https://studio.apollographql.com",
        credentials: true,
    }));
    app.get("/", (_req, res) => res.send("hello"));
    app.post("/", (_req, res) => res.send("post test"));
    const schema = schema_1.makeExecutableSchema({
        typeDefs: typeDefs_1.typeDefs,
        resolvers: resolvers_1.default,
    });
    const middleware = [...middleware_1.authMiddlewares];
    const schemaWithMiddleware = graphql_middleware_1.applyMiddleware(schema, ...middleware);
    const server = new apollo_server_express_1.ApolloServer({
        schema: schemaWithMiddleware,
        context: ({ req, res }) => ({ req, res }),
    });
    await server.start();
    server.applyMiddleware({
        app,
        cors: false,
    });
    mongoose_1.default
        .connect(process.env.MONGODB_KEY, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
        console.log("📬 - database connected");
        return app.listen(parseInt(process.env.PORT), () => {
            console.log(`🚀 - Server running at http://localhost:4000`);
        });
    });
};
initServer().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map