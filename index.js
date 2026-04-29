const express = require("express");
const cors = require("cors");
const path = require("path"); 

const app = express();
app.use(cors());
app.use(express.json());

// Servir imágenes (CORREGIDO)
app.use("/images", express.static(path.join(__dirname, "images")));

/* DATOS DE PRUEBA */

let movies = [
  {
    id: 1,
    title: "Barbie, Escuela de Princesas",
    duration: "190 min",
    classification: "A",
    genre: "Animada. Fantasia",
    image: "https://cineapi-m7vu.onrender.com/movies/images/Barbie.png",
    showtimes: ["14:00", "18:00", "21:30"]
  },
  {
    id: 2,
    title: "Cuando Harry encontro a Sally",
    duration: "96 min",
    classification: "A",
    genre: "Romance. Comedia",
    image: "https://cineapi-m7vu.onrender.com/movies/images/Sally.png",
    showtimes: ["13:00", "16:30", "20:00"]
  },
  {
    id: 3,
    title: "Señales de amor",
    duration: "90 min",
    classification: "A",
    genre: "Comedia. Romance",
    image: "https://cineapi-m7vu.onrender.com/movies/images/Serende.png",
    showtimes: ["11:00", "13:00", "15:00"]
  },
  {
    id: 4,
    title: "Siempre el Mismo Día",
    duration: "110 min",
    classification: "B",
    genre: "Comedia. Romance",
    image: "https://cineapi-m7vu.onrender.com/movies/images/Day.png",
    showtimes: ["15:00", "19:00"]
  },
  {
    id: 5,
    title: "27 Bodas",
    duration: "105 min",
    classification: "B",
    genre: "Drama. Romance. Comedia",
    image: "https://cineapi-m7vu.onrender.com/movies/images/27.png",
    showtimes: ["12:00", "14:30", "17:00"]
  }
];

// Butacas
let seats = Array(5).fill(null).map(() => Array(5).fill(0));

/*  RUTAS */

app.get("/", (req, res) => {
  res.send("API de Cine funcionando 🎬");
});

app.get("/movies", (req, res) => {
  res.json(movies);
});

app.get("/movies/:id", (req, res) => {
  const movie = movies.find(m => m.id == req.params.id);

  if (!movie) {
    return res.status(404).json({ message: "Película no encontrada" });
  }

  res.json(movie);
});

app.get("/seats", (req, res) => {
  res.json(seats);
});

app.post("/seats/reserve", (req, res) => {
  const { row, col } = req.body;

  if (seats[row][col] === 1) {
    return res.status(400).json({ message: "Butaca ocupada" });
  }

  seats[row][col] = 1;
  res.json({ message: "Butaca reservada", seats });
});

app.post("/movies", (req, res) => {
  const newMovie = {
    id: movies.length + 1,
    ...req.body
  };

  movies.push(newMovie);
  res.json(newMovie);
});

/* SERVIDOR  */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});