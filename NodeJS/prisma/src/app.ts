import express, { Application } from "express";
import { PrismaClient } from "@prisma/client";

const app: Application = express();

const prisma = new PrismaClient();

app.get("/", (req, res) => {
  res.json({ message: "alive" });
});

app.post("/movies", async (req, res) => {
  const { title, description } = req.body;
  await prisma.movie.create({
    data: {
      title,
      description,
    },
  });
  res.json({
    message: "movie created",
  });
});

app.get("/movies:id", async (req, res) => {
  const movie = await prisma.movie.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.json({
    data: movie,
  });
});

app.get("/movies", async (req, res) => {
  const allMovies = await prisma.movie.findMany({});
  res.json({
    data: allMovies,
  });
});

export default app;
