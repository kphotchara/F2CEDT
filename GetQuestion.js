const { MongoClient } = require('mongodb');

const url = "mongodb+srv://kphotchara:0817375417@cluster0.amf8n2r.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

const selectedQuestions = [];

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    await getRandomQuestion("datatype");
    await getRandomQuestion("if");
    await getRandomQuestion("loop");
    await getRandomQuestion("array");
    await getRandomQuestion("string");
    await getRandomQuestion("vector");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    await client.close();
  }
}

async function getRandomQuestion(col) {
  const db = client.db("question");
  const collection = db.collection(col);

  try {
    const questions = await collection.find({}, { projection: { _id: 0 } }).toArray();
    if (questions.length > 0) {
      const randomIndex = Math.floor(Math.random() * questions.length);
      const randomQuestion = questions[randomIndex];
      selectedQuestions.push(randomQuestion);
      //console.log("Selected Question:", randomQuestion);
      //console.log("All Selected Questions:", selectedQuestions);
    } else {
      console.log("No questions found in the database.");
    }
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
}

connectToDatabase();

