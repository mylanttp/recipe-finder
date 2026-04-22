import express, { Express } from "express";
import cors from "cors";
import { db } from "./firebase";
import 'dotenv/config';
import admin from 'firebase-admin';

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY!;

const app: Express = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("works");
});

app.get("/api/search", (req, res) => {
  const query = req.query.q

  fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=15`,
    {headers: {
        "X-Api-Key": SPOONACULAR_API_KEY,
      },})
    .then((response) => {
      console.log("api status:", response.status);
      return response.json();
    })
    .then((data) => {
      console.log("data:", data);
      res.json(data);
    })
    .catch((err) => {
      console.error("error:", err);
      res.status(500).json({ error: err.message });
    });
});

app.get('/recipes', async (req, res) => {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) return res.json([]);

    try {
        const decoded = await admin.auth().verifyIdToken(token);
        const snapshot = await db.collection('users').doc(decoded.uid)
                                  .collection('savedRecipes').get();
        const recipes = snapshot.docs.map(doc => doc.data());
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ error: 'Unable to fetch recipes' });
    }
});

app.post("/add", async (req, res) =>  {
  console.log("tried to add")

  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) {
      return res.send('No user logged in, skipping DB add');
  }

  const recipe = req.body.recipe
  try{
    const decoded = await admin.auth().verifyIdToken(token);
    const userId = decoded.uid;

    const doc = 
    await db.collection('users').doc(userId)
      .collection('savedRecipes').doc(String(recipe.id)).set(recipe)
    res.send(`Recipe "${recipe.title}" added`);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: `Recipe ${recipe.title} unable to be added`})
  }
});

app.put('/meal-plan/change/:recipe', (req, res) => {
  const recipe = req.body.recipe
  // lets the user edit a recipe they have in their meal plan
  res.send(`Placeholder PUT request ${recipe}`);
});

app.delete('/remove', async (req, res) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
      return res.send('No user logged in, skipping DB delete');
  }
  
  const recipe = req.body.recipe
  try{
    const decoded = await admin.auth().verifyIdToken(token);
    const userId = decoded.uid;

    await db.collection('users').doc(userId)
      .collection('savedRecipes').doc(String(recipe.id)).delete(recipe)
    res.send(`Recipe "${recipe.title}" deleted`);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: `Recipe ${recipe.title} unable to be deleted`})
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
