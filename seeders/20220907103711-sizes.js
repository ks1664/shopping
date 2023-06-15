"use strict";

const DataHelper = require("../helpers/v1/data.helpers");
const _DataHelper = new DataHelper();

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
    await queryInterface.bulkInsert(
      "sizes",
      [
        {
          name: "S",
          description: "S description here",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "M",
          description: "M description here",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "L",
          description: "L description here",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "XL",
          description: "XL description here",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "XXL",
          description: "XXL description here",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("sizes", null, {});
  },
};
