'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('PointItems', [
      { pointId: 1, itemId: 1 },
      { pointId: 1, itemId: 2 },
      { pointId: 2, itemId: 1 },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('PointItems', null, {});
  }
};
