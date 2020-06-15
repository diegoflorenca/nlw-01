import express from 'express';

/*  O expresse precisa da definição de tipos
    Para isso é necesserário instalar mais um package:
    npm install @types/express -D 
    O -D refere-se a uma dependência de desenvolvimento.
*/
const app = express();

// Indicando ao express que ele precisa entender o corpo da requisição como json
app.use(express.json());

const users = ['Diego', 'Cleiton', 'Robson', 'Daniel'];

app.get('/users', (request, response) => {
  //console.log('Listagem de usuários');
  // para enviar um texto de volta para o navegador
  //response.send("Hello, World!");

  // Query Param: São parâmentro que vem na própria rota, geralmente opcionais para filtros, paginação etc.
  const search = String(request.query.search);

  const filteredUsers = search
    ? users.filter((user) => user.includes(search))
    : users;

  // para retornar um objeto
  // sempre usar o return para que o código não continue sendo processado
  return response.json(filteredUsers);
});

// o : indica que aqui vai um parâmetro, nessa cado o id do uduário, que é sua posição dentro do array
app.get('/users/:id', (request, response) => {
  // Para acessar o parâmetro id fazemos:
  // É necessário converser para número pq até agora ele é uma string
  const id = Number(request.params.id);
  // Request Params: Parâmetros que vem na própria rota que identificam um recurso - Normalmente é obrigatório

  const user = users[id];

  return response.json(user);
});

// podemos fazer outra rota usando /users contanto que o método seja diferente
app.post('/users', (request, response) => {
  // const user = {
  //   name: 'Diego',
  //   email: 'diegoflorenca@gmail.com',
  // };

  // Request Body: Parâmentros para criação/atualização de informações
  const data = request.body;

  console.log(data);

  const user = {
    name: data.name,
    email: data.email,
  };

  return response.json(user);
});

app.listen(3333);
