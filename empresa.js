const express = require('express');
const empresa = express();

empresa.get("/", async (req, res) => {
    res.send("Página Inicial");
});

empresa.listen(8080, () => {
    console.log('Servidor rodando na porta 8080: http://localhost:8080');
});