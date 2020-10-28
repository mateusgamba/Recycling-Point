'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Countries', [
      { name: 'France' },
      { name: 'United States' },
      { name: 'China' },
      { name: 'Spain' },
      { name: 'Italy' },
      { name: 'Turkey' },
      { name: 'United Kingdom' },
      { name: 'Germany' },
      { name: 'Russia' },
      { name: 'Malaysia' },
      { name: 'Mexico' },
      { name: 'Austria' },
      { name: 'Hong Kong' },
      { name: 'Ukraine' },
      { name: 'Thailand' },
      { name: 'Saudi Arabia' },
      { name: 'Greece' },
      { name: 'Canada' },
      { name: 'Poland' },
      { name: 'Netherlands' },
      { name: 'Singapore' },
      { name: 'Hungary' },
      { name: 'Croatia' },
      { name: 'South Korea' },
      { name: 'Egypt' },
      { name: 'Morocco' },
      { name: 'Czech Republic' },
      { name: 'Switzerland' },
      { name: 'South Africa' },
      { name: 'Indonesia' },
      { name: 'Ireland' },
      { name: 'Romania' },
      { name: 'Belgium' },
      { name: 'Denmark' },
      { name: 'Portugal' },
      { name: 'Bulgaria' },
      { name: 'India' },
      { name: 'Japan' },
      { name: 'Vietnam' },
      { name: 'Australia' },
      { name: 'Argentina' },
      { name: 'Brazil' },
      { name: 'Sweden' },
      { name: 'Norway' },
      { name: 'Tunisia' },
      { name: 'Dominican Republic' },
      { name: 'Finland' },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Countries', null, {});
  }
};
