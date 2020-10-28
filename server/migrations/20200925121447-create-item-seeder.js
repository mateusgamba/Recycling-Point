'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Items', [
      { name: 'Light', image: 'lampadas.svg' },
      { name: 'Battery', image: 'baterias.svg' },
      { name: 'Paper', image: 'papeis-papelao.svg' },
      { name: 'E-waste', image: 'eletronicos.svg' },
      { name: 'Organic', image: 'organicos.svg' },
      { name: 'Plastic', image: 'oleo.svg' }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Items', null, {});
  }
};
