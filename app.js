const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const url = "mongodb+srv://kphotchara:0817375417@cluster0.qsdaw9o.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

//new random questions
async function getRandomQuestions() {
  const db = client.db("question");
  const collections = ["datatype", "if", "loop", "array", "string", "vector"];
  const selectedQuestions = [];

  for (const col of collections) {
    try {
      const collection = db.collection(col);
      const count = await collection.countDocuments(); // Get the total count of documents in the collection
        if (count > 0) {
        const randomIndex = Math.floor(Math.random() * count);
        const randomQuestion = await collection.findOne({}, { skip: randomIndex, projection: { _id: 0 } });
        selectedQuestions.push(randomQuestion);
        } else {
        console.log("No questions found in the database.");
        }
    } catch (error) {
      console.error(`Error fetching questions from ${col}:`, error);
    }
  }

  return selectedQuestions;
}

connectToDatabase();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Endpoint สำหรับรับข้อมูลคะแนนและชื่อผู้ใช้จาก quiz.js แล้วบันทึกลงใน MongoDB
app.post('/api/saveScore', async (req, res) => {
  const { username, score } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'กรุณากรอกชื่อผู้ใช้และคะแนน' });
  }

  const db = client.db("question"); // เปลี่ยนเป็นชื่อฐานข้อมูลที่คุณใช้
  const collection = db.collection("score"); // เปลี่ยนเป็นชื่อคอลเลคชันที่คุณใช้

  try {
    await collection.insertOne({ username, score });
    res.status(200).json({ message: 'บันทึกข้อมูลคะแนนและชื่อผู้ใช้สำเร็จ' });
  } catch (error) {
    console.error('Error saving score:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' });
  }
});

app.get('/api/scores', async (req, res) => {
    const db = client.db("question");
    const collection = db.collection("score");
  
    try {
      const scores = await collection.find().sort({ score: -1 }).toArray(); // เรียงตามคะแนนจากมากไปน้อย
      res.json(scores);
    } catch (error) {
      console.error('Error fetching and sorting scores:', error);
      res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูลคะแนน' });
    }
  });

  
app.get('/api/selectedQuestions', async (req, res) => {
  const newQuestions = await getRandomQuestions();
  res.json(newQuestions);
});

app.use(express.static(path.join(__dirname, "/public/")));

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log("listening on port %d", port);
});
