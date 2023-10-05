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

/* DADOS FUNCIONARIOS
{
    "nome": "Gilvanio Souza de Lima",
    "func_status": 0,
    "turno": "Manhã",
    "datatime_registro": "02-10-2023 23:13",
    "cpf": 12345678974,
    "rg": 87654321,
    "cart_trabalho": 12345671234,
    "data_admissao": "2023-10-02",
    "car_horaria": 120,
    "sexo": "MASCULINO",
    "id_empresa": 4,
    "descricao": "TESTE DE CADASTRO"
}
*/
//METODO POST = INSERIR
funcionario.post('/cadastro', (req, res) => {
  const { nome, func_status, turno, datatime_registro, cpf, rg, cart_trabalho, data_admissao, car_horaria, sexo, id_empresa, descricao} = req.body;
  //Inserir dados no BD
  const sql = 'INSERT INTO funcionario (nome, func_status, turno, datatime_registro, cpf, rg, cart_trabalho, data_admissao, car_horaria, sexo, id_empresa, descricao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [nome, func_status, turno, datatime_registro, cpf, rg, cart_trabalho, data_admissao, car_horaria, sexo, id_empresa, descricao], (err, result) => {
    if (err) {
      console.error('Erro ao inserir resgistros: ' + err.message);
      res.status(500).json({ error: 'Erro ao inserir resgistros' });
    } else {
      console.log('Registro inserido com sucesso!');
      res.status(201).json({ message: 'Registro inserido com sucesso!'});
    }
  });
});

/* Método PUT = Atualização
Nessa parte ":id" basta colocar diretamente o id desejado 
app.put('/api/clientes/:id', (req, res) => {
  const { id } = req.params;
  const { nome, cpf, email, idade } = req.body;
  // Atualizar usando o query
  const sql = 'UPDATE cliente SET nome = ?, cpf = ?, email = ?, idade = ? WHERE id = ?';
  connection.query(sql, [nome, cpf, email, idade, id], (err, result) => {
      if (err) {
          console.error('Erro ao atualizar registro: ' + err.message);
          res.status(500).json({ error: 'Erro ao atualizar registro' });
      } else {
          console.log('Registro atualizado com sucesso!');
          res.status(200).json({ message: 'Registro atualizado com sucesso' });
      }
  });
});

/* Método DELETE = Excluir
Nessa parte ":id" basta colocar diretamente o id desejado 
app.delete('/api/clientes/:id', (req, res) => {
  const { id } = req.params;
  // Excluir o registro na tabela "usuario" pelo ID
  const sql = 'DELETE FROM cliente WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
      if (err) {
          console.error('Erro ao excluir registro: ' + err.message);
          res.status(500).json({ error: 'Erro ao excluir registro' });
      } else {
          if (result.affectedRows > 0) {
              console.log('Registro excluído com sucesso!');
              res.status(200).json({ message: 'Registro excluído com sucesso!' });
          } else {
              console.log('Registro não encontrado.');
              res.status(404).json({ message: 'Registro não encontrado' });
          }
      }
  });
});*/

// Iniciar o servidor
funcionario.listen(port, () => {
    console.log(`Servidor iniciado na porta http://localhost:${port}`);
  });