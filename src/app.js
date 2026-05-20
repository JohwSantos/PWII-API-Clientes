const express = require("express");
const clientesRoutes = require("./routes/clientesRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//Rota raiz:

app.get("/", (req,res) => {
    res.status(200).json({
        mensagem:"API de Clientes",
        versao: "1.0.0",
        endpoints: {
            listarTodos: "GET /clientes",
            buscarPorId: "GET /clientes/:id"
        }
    })
})

app.use("/clientes", clientesRoutes);

app.use((req,res) =>{
    return res.status(404).json({
        sucesso: false,
        mensagem: "Rota não encontrada",
    })
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})

module.exports = app;