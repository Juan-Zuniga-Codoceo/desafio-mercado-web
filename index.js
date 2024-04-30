const express = require("express");
const path = require("path");
const app = express();
const exphbs = require("express-handlebars");
const PORT = process.env.PORT || 3000;

app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
    helpers: {
      formatearNumber: function (numberString) {
        return (+numberString).toLocaleString();
      },
      primeraMayuscula: function (texto) {
        return texto.charAt(0).toUpperCase() + texto.slice(1);
      },
      boldHeroTitle: function (options) {
        return '<h1 class="fw-bold">' + options.fn(this) + "</h1>";
      },
    },
  })
);
app.set("view engine", ".hbs");
app.set("views", "./views");

app.listen(PORT, () => {
  console.log(`El servidor está inicializado en http://localhost:${PORT}`);
});
app.use("/bootstrap_css", express.static("./node_modules/bootstrap/dist/css"));
app.use("/bootstrap_js", express.static("./node_modules/bootstrap/dist/js"));
app.use("/jquery", express.static("./node_modules/jquery/dist"));
app.use("/public", express.static("./public"));

const datos = [
  { articulo: "banana"},
  { articulo: "cebollas"},
  { articulo: "lechuga"},
  { articulo: "papas"},
  { articulo: "pimenton"},
  { articulo: "tomate"},
];

app.get("/", (req, res) => {
  res.render("home", { datos });
});