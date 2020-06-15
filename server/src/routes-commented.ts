import express from 'express';
// Importando a conexão com o Banco de Dados
import knex from './database/connections';

const routes = express.Router();

routes.get('/items', async (request, response) => {
  const items = await knex('items').select('*');
  // Serializando os items do Banco de Dados, incluindo o caminho para a rota nas imagens
  const serializedItems = items.map((item) => {
    return {
      id: item.id,
      title: item.title,
      image_url: `http://localhost:3333/uploads/${item.image}`,
    };
  });

  return response.json(serializedItems);
});

routes.post('/points', async (request, response) => {
  // Desestruturação do request.body salvando todos os valores com o mesmo nome
  const {
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    items,
  } = request.body;

  // Dessa forma, vinculamos as operações de insert para que uma seja dependente da outra
  // Assim não corremos o risco de uma funcionar sem que a outra também funcione
  // const insertedIds = await knex('points').insert({
  // Trocamos para:
  // const insertedIds = await trx('points').insert({
  const trx = await knex.transaction();

  // Insere os valores na tabela points (Ainda não estamos fazendo upload de imagens)
  // Quando o nome da variável é igual ao nome da propriedade do objeto podemos omitir name: name, email : email ...
  const insertedIds = await trx('points').insert({
    image: 'image-fake',
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
  });

  // O método insert retorna os ids dos registros que foram inseridos na tabela, nesse caso só inseriu 1 único registro
  const point_id = insertedIds[0];

  // Criando a relação entre o point_id e os items_id para inserir na tabela point_items
  const pointItems = items.map((item_id: Number) => {
    return {
      item_id,
      point_id,
    };
  });

  // Insere as referências point_id e item_id na tabela point_items
  await trx('point_items').insert(pointItems);

  return response.json({ success: true });
});

export default routes;
