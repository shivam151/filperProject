import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import indexRoutes from './routes/index.js';

// import './utils/db.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({
  origin: "*"
}));

app.use(express.json());


app.use(indexRoutes);



app.get("/", (req, res) => {
  res.send("Welcome to backend services");
});

app.listen(port, () => {
  console.log(` Server is running at http://localhost:${port}`);
});