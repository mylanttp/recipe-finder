# recipeFinder

Recipe Finder is a web application that lets users search for recipes (from Spoonacular API), save and remove recipes to a personal meal list (Stored on Firestore database), add filters based on diets and intolerances, and see more information for each recipe. Users can log in through Google for their information to persist across sessions. There is also a fun quiz for users to see "which recipe they are" that matches their personality to a recipe.

The server is deployed on Google Cloud Run and the client is deployed on Vercel
Client: https://recipe-finder-ashen-eta.vercel.app/
Server: https://recipe-finder-server-803133171696.us-central1.run.app 

## Environment variables

Server: SPOONACULAR_API_KEY=your_spoonacular_api_key

Client: VITE_API_URL=server_url (http://localhost:8080 for local host or Google cloud url, https://recipe-finder-server-803133171696.us-central1.run.app, for deployed)

## Set up instructions

(Requires Node.js, pnpm, Spoonaculary API key, Firebase project with Firestore and Authentication enabled, and Firebase service account key)
1. Clone the repository
2. Set up the server (see below)
3. Set up the client (see below)

## How to run the client and server

### Server
(Express + Typescript)

```bash
    cd server
    pnpm install
```

### Client
(React + TypeScript)

```bash
    cd client
    pnpm install
    pnpm run dev
```

(Final Project for INFO 1998: Trends in Modern Web Development)
By Mylan Pham
Date: 3/27/2026-5/5/2026