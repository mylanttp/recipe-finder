import express, { Express } from "express";
import cors from "cors";

const app: Express = express();
const port = 8080;

app.use(cors());
app.use(express.json());

const API_KEY = "idQL83HuEwnrMAw5XIQo3GOtigXOGafRYYVdt6pd";

app.get("/test", (req, res) => {
  res.send("works");
});

app.get("/api/search", (req, res) => {
  const body = req.body
  const query = req.query.q

  fetch(`https://api.calorieninjas.com/v1/recipe?query=${query}`,
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
app.post('/meal-plan/add/:recipe', (req, res) => {
  // lets the user add a recipe to their meal plan
  res.send(`Placeholder POST request`)
})

// PUT what information do i need to update?
app.put('/meal-plan/change/:recipe', (req, res) => {
  // lets the user edit a recipe they have in their meal plan
  res.send('Placeholder PUT request');
});

// DELETE what information do i need to delete?
app.delete('/meal-plan/delete/:recipe', (req, res) => {
  // lets the user delete a recipe they have in their meal plan
  res.send('Placeholder DELETE request');
});
