module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('document_name_settings', [
      {
        project_code: '3',
        originator: '3',
        functional_breakdown: '3',
        spatial: '3',
        form: '3',
        discipline: '3',
        number: '3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('document_name_settings', null, {});
  },
};
