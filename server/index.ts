import express from "express";
import cors from "cors";
import "dotenv/config";
import apiRoutes from "./routes";

const app = initializeExpressApp();
startServer(app);

app.use(apiRoutes);

// Function to initialize Express App
function initializeExpressApp() {
  const app = express();
  app.use(express.json());
  app.use(cors({ credentials: true, origin: "*" }));
  app.get("/", (req, res) => {
    res.status(403).send("Soduko API");
  });

  return app;
}

// Function to start the server
function startServer(app: any) {
  app.listen(8000, () => {
    console.log("Server is running on port 8000");
  });
}
