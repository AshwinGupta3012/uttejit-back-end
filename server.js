const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/demo");
  console.log("db connected");
}

const contactSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  Subject: String,
  Message: String,
});

const achievementsSchema = new mongoose.Schema({
  title: String,
  body: String,
});

const carsSchema = new mongoose.Schema({
  name: String,
  description: String,
  img: String,
});

const teamSchema = new mongoose.Schema({
  name: String,
  position: String,
});

const Contact = mongoose.model("Contact", contactSchema);
const Achievements = mongoose.model("Achievements", achievementsSchema);
const Cars = mongoose.model("Cars", carsSchema);
const Team = mongoose.model("Team", teamSchema);

app.use(bodyParser.json());
app.use(cors());

app.post("/contact", async (req, res) => {
  let contact = new Contact();
  contact.Name = req.body.Name;
  contact.Email = req.body.Email;
  contact.Subject = req.body.Subject;
  contact.Message = req.body.Message;
  const doc = await contact.save();
  console.log(doc);
  res.json(doc);
});

app.get("/contact", async (req, res) => {
  const docs = await Contact.find({});
  res.json(docs);
});

app.delete("/contact/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Contact.findByIdAndDelete(id);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting contact");
  }
});

app.get("/achievements", async (req, res) => {
  const docs = await Achievements.find({}, { _id: 0 });
  res.json(docs);
});

app.get("/cars", async (req, res) => {
  const docs = await Cars.find({}, { _id: 0 });
  res.json(docs);
});

app.get("/team", async (req, res) => {
  const docs = await Team.find({}, { _id: 0 });
  res.json(docs);
});

app.listen(3690, () => {
  console.log("server started");
});
