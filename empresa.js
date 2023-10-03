const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const empresa = express();
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
empresa.use(express.urlencoded({ extended: true }));
empresa.use(express.json());

//METODO GET = MOSTRAR
empresa.get('/empresas', (req, res) => {
    //Consultar o BD
    const sql = 'SELECT * FROM empresa';
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
    "nome_empresa": "Empresa Fictícia",
    "cnpj_cpf": 12345678901234,
    "razao_social": "Razão Social da Empresa",
    "quantidade_funcionarios": 50,
    "email": "empresa@example.com",
    "senha": "senha123"
}
*/
//METODO POST = INSERIR
empresa.post('/empresas/cadastro', (req, res) => {
  const { nome_empresa, cnpj_cpf, razao_social, quantidade_funcionarios, email, senha } = req.body;
  //Inserir dados no BD
  const sql = 'INSERT INTO empresa (nome_empresa, cnpj_cpf, razao_social, quantidade_funcionarios, email, senha) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(sql, [nome_empresa, cnpj_cpf, razao_social, quantidade_funcionarios, email, senha], (err, result) => {
    if (err) {
      console.error('Erro ao inserir registros: ' + err.message);
      res.status(500).json({ error: 'Erro ao inserir registros' });
    } else {
      console.log('Registro inserido com sucesso!');
      res.status(201).json({ message: 'Registro inserido com sucesso!'});
    }
  });
});

/* Método PUT = Atualização
Nessa parte ":id" basta colocar diretamente o id desejado */
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
Nessa parte ":id" basta colocar diretamente o id desejado */
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
});

// Iniciar o servidor
empresa.listen(port, () => {
    console.log(`Servidor iniciado na porta http://localhost:${port}`);
  });