const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const funcionario = express();
const port = process.env.PORT || 3000;

// Configurar conexão com o MySQL
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'escala_digital'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL: ' + err.message);
  } else {
    console.log('Conectado ao MySQL');
  }
});

// Middleware para lidar com dados codificados no corpo da solicitação
funcionario.use(express.urlencoded({ extended: true }));
funcionario.use(express.json());

//METODO GET = MOSTRAR
funcionario.get('/funcionarios', (req, res) => {
    //Consultar o BD
    const sql = 'SELECT * FROM funcionario';
    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Erro ao buscar resgistros: ' + err.message);
        res.status(500).json({ error: 'Erro ao buscar resgistros' });
      } else {
        res.status(200).json(results);
      }
    });
});

//METODO POST = INSERIR
funcionario.get('/funcionarios/cadastro', (req, res) => {
  const {}
  //Inserir dados no BD
  const sql = 'SELECT * FROM funcionario';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar resgistros: ' + err.message);
      res.status(500).json({ error: 'Erro ao buscar resgistros' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Iniciar o servidor
funcionario.listen(port, () => {
    console.log(`Servidor iniciado na porta http://localhost:${port}`);
  });