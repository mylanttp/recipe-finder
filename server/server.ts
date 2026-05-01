import express, { Express } from "express";
import cors from "cors";
import { db } from "./firebase";
import 'dotenv/config';
import admin from 'firebase-admin';
import { FieldValue } from "firebase-admin/firestore";

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY!;

const app: Express = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// test
app.get("/test", (req, res) => {
  res.send("works");
});

// get search results from spoonacular
app.get("/api/search", (req, res) => {
  const query = req.query.q
  const diet = req.query.diet
  const intolerances = req.query.intolerances

  let url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=20`
  if(diet){url+=`&diet=${diet}`};
  if(intolerances){url+=`&intolerances=${intolerances}`}

  fetch(url,
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

// get a specific users saved recipes from the database
app.get('/recipes', async (req, res) => {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) return res.json([]);

    try {
        const decoded = await admin.auth().verifyIdToken(token);
        const snapshot = await db.collection('users').doc(decoded.uid)
                                  .collection('savedRecipes').get();
        const recipes = snapshot.docs.map(doc => doc.data()); //extracts the data inside each firebase doc
        res.json(recipes); //sends the recipes back as a json
    } catch (err) {
        res.status(500).json({ error: 'Unable to fetch recipes' });
    }
});

// get a specific users diets from the data base
app.get('/get/diets', async (req, res) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
      return res.send('No user logged in, skipping DB diet add');
  }

  try{
    const decoded = await admin.auth().verifyIdToken(token);

    const snapshot = await db.collection('users').doc(decoded.uid).get();
    const diets = (snapshot.exists? snapshot.get("diets") : []);
    res.json(diets)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: `Failed to add diets`})
  }
});

// get a specific users intolerances from the data base
app.get('/get/intolerances', async (req, res) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
      return res.send('No user logged in, skipping DB intolerance add');
  }

  try{
    const decoded = await admin.auth().verifyIdToken(token);

    const snapshot = await db.collection('users').doc(decoded.uid).get();
    const intolerances = (snapshot.exists? snapshot.get("intolerances") : []);
    res.json(intolerances)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: `Failed to add intolerances`})
  }
});

// get the information for a recipe page from the database
app.get('/api/info', async (req, res) => {
  const query = req.query.q

  console.log("query")

  fetch(`https://api.spoonacular.com/recipes/${query}/information`,
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

// add a recipe to a specific users saved recipes in the database
app.post("/add", async (req, res) =>  {
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

// updates user's diets
app.put('/update/diets', async (req, res) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
      return res.send('No user logged in, skipping DB diet put');
  }

  const diet = req.body.diet
  const action = req.body.action
  try{
    const decoded = await admin.auth().verifyIdToken(token);

    const doc = await db.collection('users').doc(decoded.uid)
    //if they haven't added recipes, their userId collection won't exist so use .set instead of .update
    if(action === "add"){
      doc.set({
        diets: FieldValue.arrayUnion(diet) //takes what's already in the `diets` and adds `diet`
      }, { merge: true }) //only updates the fields specified, leaves everything else alone
      res.send(`"${diet}" added to diets`);
    } else {
      doc.set({
        diets: FieldValue.arrayRemove(diet)
      }, { merge: true }) 
      res.send(`"${diet}" removed from diets`);
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: `Failed to update "${diet}" in diets`})
  }
});

// updates user's intolerances
app.put('/update/intolerances', async (req, res) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
      return res.send('No user logged in, skipping DB intolerance put');
  }

  const intolerance = req.body.intolerance
  const action = req.body.action
  try{
    const decoded = await admin.auth().verifyIdToken(token);

    const doc = await db.collection('users').doc(decoded.uid)
    if(action === "add"){
      doc.set({
        intolerances: FieldValue.arrayUnion(intolerance) //takes what's already in the `diets` and adds `diet`
      }, { merge: true }) //only updates the fields specified, leaves everything else alone
      res.send(`"${intolerance}" added to intolerances`);
    } else if (action === "remove"){
      doc.set({
        intolerances: FieldValue.arrayRemove(intolerance)
      }, { merge: true }) 
      res.send(`"${intolerance}" removed from intolerances`);
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: `Failed to upate "${intolerance}" in intolerances`})
  }
});

// delete a recipe from a specific users saved recipes in the database
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
