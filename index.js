const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

// name= crud-operation
// pass= hxWUAFtnzldYrnji

// Middleware
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://crud-operation:hxWUAFtnzldYrnji@cluster1.gm2w9qw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log("MongoDb connected");
async function run() {
  try {
    await client.connect();
    const userCollection = client.db("user").collection("services");

    app.get("/user", async (req, res) => {
      const query = {};
      const getAllData = userCollection.find(query);
      const usersData = await getAllData.toArray();
      res.send(usersData);
    });

    // Post method
    app.post("/user", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
      console.log(result);
    });

    // Delete
    app.delete("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });

    // Find One
    app.get("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await userCollection.findOne(query);
      res.send(result);
    });

    // Put method-----------------
    app.put("/user/:id", async (req, res) => {
      const id = req.params.id;
      const updatedUser = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: { name: updatedUser.name, father: updatedUser.father, mother: updatedUser.mother },
      };
      const result = await userCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });
  } finally {
    // console.div();
  }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("hello !! I am from CRUD operation");
  console.log("server connected");
});

app.listen(port, () => {
  console.log("This port is listening on port", port);
});