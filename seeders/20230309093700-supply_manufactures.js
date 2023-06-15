'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('supply_manufactures', [
      {
        supply_id: 16,
        manufacture_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        supply_id: 17,
        manufacture_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        supply_id: 17,
        manufacture_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        supply_id: 16,
        manufacture_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
      await queryInterface.bulkDelete('supply_manufactures', null, {});
  }
};
