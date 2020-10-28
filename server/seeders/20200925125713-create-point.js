'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Points', [
      { name: "item 1", image: "image_1.png", email: "johndoe@bol.com.br", street: "Rua Professor José Abatti, 408", city: "Treviso", country: "Brazil" },
      { name: "item 2", image: "image_2.png", email: "maria.carmo@bol.com.br", street: "Praça Benjamin Scussel, 10", city: "Treviso", country: "Brazil" },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Points', null, {});
  }
};
