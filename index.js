import express from "express";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const app = express();
const __dirname = import.meta.dirname;
const pathFile = path.join(__dirname, "database/deportes.data.json");

//middleware
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//modularizar
//app.use("/", deporteRouter);

app.get("/deportes", async (req, res) => {
  try {
    const data = await readFile(pathFile, "utf-8");
    const deportes = JSON.parse(data);
    return res.json({ deportes });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});
app.get("/agregar", async (req, res) => {
  const { nombre, precio } = req.query;
  if (!nombre || !precio) {
    return res.status(400).json({ ok: false, msg: "campos obligatorios" });
  }
  try {
    const data = await readFile(pathFile, "utf-8");
    const deportes = JSON.parse(data);
    deportes.push({ nombre, precio });

    await writeFile(pathFile, JSON.stringify(deportes, null, 2));
    return res.json({ msg: "deporte agregado con exito" });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

//modificar editar y eliminar
app.get("/editar", async (req, res) => {
  try {
    const { nombre, precio, newprecio } = req.query;
    console.log(req.query);
    const data = await readFile(pathFile, "utf-8");
    let deporte = JSON.parse(data);
        console.log(deporte);

    const deporteFindIndex = deporte.findIndex(
      (item) => item.nombre === nombre && item.precio === precio
    );
    console.log(deporteFindIndex);
  
    if (deporteFindIndex === -1) {
      return res.status(404).json("deporte no encontrado");
    }
    deporte[deporteFindIndex].precio===newprecio

    await writeFile(pathFile, JSON.stringify(deporte, null, 2));
    return res.json({ msg: "Precio Actualizado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error al actualizar" });
  }
});


app.get("/eliminar", async (req, res) => {
  try {
    const { nombre } = req.query;
    console.log(req.query);

    const data = await readFile(pathFile, "utf-8");

    let deportes = JSON.parse(data);
    console.log(deporte)

    const deporte = deportes.find((item) => item.nombre === nombre);
    const newDeporte=deportes.filter((item) => item !== deporte)
    
    await writeFile(pathFile, JSON.stringify(newDeporte));
    return res.json(newDeporte);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error al eliminar el deporte" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Conectado al: ${PORT}`);
});
