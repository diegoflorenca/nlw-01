import Knex from 'knex';

// Popula uma tabela do Banco de Dados
export async function seed(knex: Knex) {
  // Insere cada objeto do array como um registro na tabela items
  await knex('items').insert([
    { title: 'Lâmpada', image: 'Lampadas.svg' },
    { title: 'Pilhas e Baterias', image: 'baterias.svg' },
    { title: 'Papéis e Papelão', image: 'papeis-papelao.svg' },
    { title: 'Resíduos Eletrônicos', image: 'eletronicos.svg' },
    { title: 'Resíduos Organicos', image: 'organicos.svg' },
    { title: 'Óleo de Cozinha', image: 'oleo.svg' },
  ]);
}
