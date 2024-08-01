const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;

let postRoutes = express.Router();

// Middleware to parse JSON bodies
postRoutes.use(express.json());


// 1 - Retrieve All
postRoutes.route("/posts").get(async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("posts").find({}).toArray();

        if (data.length > 0) {
            response.json(data);
        } else {
            response.status(404).json({ message: "No data found." });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

// 2 - Retrieve One
postRoutes.route("/posts/:id").get(async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("posts").findOne({ _id: new ObjectId(request.params.id) });

        if (data) {
            response.json(data);
        } else {
            response.status(404).json({ message: "Data not found." });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

// 3 - Create One
postRoutes.route("/posts").post(async (request, response) => {
    try {
        let db = database.getDb();
        let mongoObject = {
            title: request.body.title,
            description: request.body.description,
            content: request.body.content,
            author: request.body.author,
            dateCreated: request.body.dateCreated
        };
        let data = await db.collection("posts").insertOne(mongoObject);
        response.status(201).json(data);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

// 4 - Update One
postRoutes.route("/posts/:id").put(async (request, response) => {
    try {
        let db = database.getDb();
        let mongoObject = {
            $set: {
                title: request.body.title,
                description: request.body.description,
                content: request.body.content,
                author: request.body.author,
                dateCreated: request.body.dateCreated
            }
        };
        let data = await db.collection("posts").updateOne({ _id: new ObjectId(request.params.id) }, mongoObject);
        response.json(data);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

// 5 - Delete One
postRoutes.route("/posts/:id").delete(async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("posts").deleteOne({ _id: new ObjectId(request.params.id) });

        if (data.deletedCount > 0) {
            response.json({ message: "Post deleted." });
        } else {
            response.status(404).json({ message: "Post not found." });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

module.exports = postRoutes;
