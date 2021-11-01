const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const cors = require("cors");
app.use(cors());
app.use(express.json());

const app = express();
const port = process.env.PORT || 4000;

//uri

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8bgmy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

console.log(uri);

//client

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//async function

async function run() {
  try {
    client.connect();

    const database = client.db("travelAgency");
    const servicesCollection = database.collection("services");

    //post api

    app.post("/services", async (req, res) => {
      const service = req.body;

      console.log("hit the post api", service);

      const result = await servicesCollection.insertOne(service);
      res.send("post hitted");
    });

    console.log("database connected");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/services", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
