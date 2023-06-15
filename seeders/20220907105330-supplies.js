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
    await queryInterface.bulkInsert('supplies', [
      {
        seller_id: "b169ed4d-be27-44eb-9a08-74f997bc6a2a",
        product_id: 1,
        total_quantity: 100,
        rest_quantity: 100,
        price: 10.50,
        seller_price: 5.25,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        seller_id: "b169ed4d-be27-44eb-9a08-74f997bc6a2a",
        product_id: 2,
        total_quantity: 110,
        rest_quantity: 110,
        price: 10.50,
        seller_price: 5.25,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        seller_id: "b169ed4d-be27-44eb-9a08-74f997bc6a2c",
        product_id: 1,
        total_quantity: 140,
        rest_quantity: 140,
        price: 14.50,
        seller_price: 7.25,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        seller_id: "b169ed4d-be27-44eb-9a08-74f997bc6a2d",
        product_id: 2,
        total_quantity: 140,
        rest_quantity: 140,
        price: 15.50,
        seller_price: 8.25,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        seller_id: "b169ed4d-be27-44eb-9a08-74f997bc6a2e",
        product_id: 1,
        total_quantity: 140,
        rest_quantity: 140,
        price: 16.50,
        seller_price: 8.25,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        seller_id: "b169ed4d-be27-44eb-9a08-74f997bc6a2f",
        product_id: 3,
        total_quantity: 140,
        rest_quantity: 140,
        price: 17.50,
        seller_price: 9.25,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        seller_id: "b169ed4d-be27-44eb-9a08-74f997bc6a2g",
        product_id: 4,
        total_quantity: 140,
        rest_quantity: 140,
        price: 17.50,
        seller_price: 9.25,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        seller_id: "b169ed4d-be27-44eb-9a08-74f997bc6a2h",
        product_id: 3,
        total_quantity: 140,
        rest_quantity: 140,
        price: 17.50,
        seller_price: 8.25,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        seller_id: "b169ed4d-be27-44eb-9a08-74f997bc6a2i",
        product_id: 4,
        total_quantity: 140,
        rest_quantity: 140,
        price: 17.50,
        seller_price: 9.25,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        seller_id: "b169ed4d-be27-44eb-9a08-74f997bc6a2j",
        product_id: 3,
        total_quantity: 140,
        rest_quantity: 140,
        price: 17.50,
        seller_price: 8.25,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        seller_id: "b169ed4d-be27-44eb-9a08-74f997bc6a2p",
        product_id: 5,
        total_quantity: 140,
        rest_quantity: 140,
        price: 17.50,
        seller_price: 9.25,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        seller_id: "b169ed4d-be27-44eb-9a08-74f997bc6a2q",
        product_id: 6,
        total_quantity: 140,
        rest_quantity: 140,
        price: 17.50,
        seller_price: 9.25,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        seller_id: "b169ed4d-be27-44eb-9a08-74f997bc6a2r",
        product_id: 5,
        total_quantity: 140,
        rest_quantity: 140,
        price: 17.50,
        seller_price: 9.25,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        seller_id: "b169ed4d-be27-44eb-9a08-74f997bc6a2s",
        product_id: 6,
        total_quantity: 140,
        rest_quantity: 140,
        price: 17.50,
        seller_price: 8.25,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        seller_id: "b169ed4d-be27-44eb-9a08-74f997bc6a2t",
        product_id: 5,
        total_quantity: 140,
        rest_quantity: 140,
        price: 17.50,
        seller_price: 9.25,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        seller_id: "b169ed4d-be27-44eb-9a08-74f997bc6aay",
        product_id: 7,
        total_quantity: 140,
        rest_quantity: 140,
        price: 17.50,
        seller_price: 8.25,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        seller_id: "b169ed4d-be27-44eb-9a08-74f997bc6aby",
        product_id: 8,
        total_quantity: 140,
        rest_quantity: 140,
        price: 17.50,
        seller_price: 9.25,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        seller_id: "b169ed4d-be27-44eb-9a08-74f997bc6acy",
        product_id: 7,
        total_quantity: 140,
        rest_quantity: 140,
        price: 17.50,
        seller_price: 9.25,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        seller_id: "b169ed4d-be27-44eb-9a08-74f997bc6ady",
        product_id: 8,
        total_quantity: 140,
        rest_quantity: 140,
        price: 17.50,
        seller_price: 8.25,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        seller_id: "b169ed4d-be27-44eb-9a08-74f997bc6aey",
        product_id: 7,
        total_quantity: 140,
        rest_quantity: 140,
        price: 17.50,
        seller_price: 9.25,
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
      await queryInterface.bulkDelete('supplies', null, {});
  }
};
