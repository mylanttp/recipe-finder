import express, { Express } from "express";
import cors from "cors";
import { db } from "./firebase";

const app: Express = express();
const port = 8080;

app.use(cors());
app.use(express.json());

const API_KEY = "4adba3f446f748069988bc39df927433";

app.get("/test", (req, res) => {
  res.send("works");
});

app.get("/api/search", (req, res) => {
  const query = req.query.q


  fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=15`,
    {headers: {
        "X-Api-Key": API_KEY,
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

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


// POST what information do i need to send to the server?
app.post("/add", async (req, res) =>  {
  console.log(req.body)
  const recipe = req.body.recipe
  console.log(recipe.id) 
  try{
    await db.collection('savedRecipes').doc(String(recipe.id)).set(recipe)
    res.send(`Recipe "${recipe.title}" added`);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Recipe unable to be added"})
  }
});

// PUT what information do i need to update?
app.put('/meal-plan/change/:recipe', (req, res) => {
  const recipe = req.body.recipe
  // lets the user edit a recipe they have in their meal plan
  res.send(`Placeholder PUT request ${recipe}`);
});

// DELETE what information do i need to delete?
app.delete('/meal-plan/delete/:recipe', (req, res) => {
  const recipe = req.body.recipe
  // lets the user delete a recipe they have in their meal plan
  res.send(`Placeholder DELETE request ${recipe}`);
});
