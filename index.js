const express = require("express");
const path = require("path");
const app = express();

const port = 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

const pokedex = [
  {
    número: 001,
    nome: "Bulbassauro",
    descricao: "Há uma semente de planta nas costas desde o dia em que este Pokémon nasce. A semente cresce lentamente",
    tipo: "Grama, Veneno",
    altura: "0.7m",
    peso: "6,9kg",
    categoria: "Semente",
    habilidade: "Crescer demais",
    imagem: 'img/bul.jpg',
  },
  {
    número: 002,
    nome: "Charmander",
    descricao:"Tem preferência por coisas quentes. Quando chove, diz-se que o vapor jorra da ponta da cauda.",
    tipo: "Fogo",
    altura: "0,6m",
    peso: "8,5kg",
    categoria: "Lagarto",
    habilidade: "Queimar",
    imagem: "img/charmander.png",
  },
  {
    número: 003,
    nome: "Squirtle",
    descricao:"Quando ele retrai seu pescoço longo em seu casco, ele esguicha água com força vigorosa.",
    tipo: "Água",
    altura: "0,5m",
    peso: "9,0kg",
    categoria: "Tartaruga",
    habilidade: "Jato de água",
    imagem: "img/squirtler.png",
  },
  {
    número:004,
    nome: "Pikachu",
    descricao:"Pikachu que pode gerar eletricidade poderosa tem bochechas que são extra macias e super elásticas.",
    tipo: "Elétrico",
    altura: "0,4m",
    peso: "6,0kg",
    categoria: "Rato",
    habilidade: "Eletricidade",
    imagem: "img/pika.jpg",
  },
  {
    número: 005,
    nome: "Jigglypuff",
    descricao:"Jigglypuff tem capacidade pulmonar de primeira linha, até mesmo em comparação com outros Pokémon. Não vai parar de cantar suas canções de ninar até que seus inimigos adormecem.",
    tipo: "Fada",
    altura: "0.5m",
    peso: "5,5kg",
    categoria: "Balão",
    habilidade: "Charme fofo, Competitivo",
    imagem: "img/jiggly.jpg",
  },
  {
    número: 006,
    nome: "Quagsire",
    descricao:"Tem uma natureza fácil. Não importa se bate a cabeça em barcos e pedregulhos enquanto nada.",
    tipo: "Água",
    altura: "1,4m",
    peso: "75,0kg",
    categoria: "Peixe",
    habilidade: "Absorção de água",
    imagem: "img/195.png",
  },
];

let pokemon = undefined;

// Rotas
app.get("/", (req, res) => {
  res.render("index", { pokedex, pokemon });
});

app.post("/create", (req, res) => {
  const pokemon = req.body;
  pokemon.id = pokedex.length + 1;
  pokedex.push(pokemon);
  res.redirect("/#cards");
});

app.get("/detalhes/:id", (req, res) => {
  const id = +req.params.id;
  pokemon = pokedex.find((pokemon) => pokemon.id === id);
  res.redirect("/#cadastro");
});

app.post("/update/:id", (req, res) => {
  const id = +req.params.id - 1;
  const newPokemon = req.body;
  newPokemon.id = id + 1;
  pokedex[id] = newPokemon;
  pokemon = undefined;
  res.redirect("/#cards");
});

app.get("/delete/:id", (req, res) => {
  const id = +req.params.id - 1;
  delete pokedex[id];

  res.redirect("/#cards");
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);