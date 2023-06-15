'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('product_attributes', [
        {
          product_id: 1,
          attribute_id: 7,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          product_id: 2,
          attribute_id: 7,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          product_id: 4,
          attribute_id: 7,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          product_id: 4,
          attribute_id: 7,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          product_id: 5,
          attribute_id: 3,
          created_at: new Date(),                                                        
          updated_at: new Date()
        },
        {
          product_id: 5,
          attribute_id: 6,
          created_at: new Date(),                                                        
          updated_at: new Date()
        },
        {
          product_id: 5,
          attribute_id: 9,
          created_at: new Date(),                                                        
          updated_at: new Date()
        },
        {
          product_id: 5,
          attribute_id: 11,
          created_at: new Date(),                                                        
          updated_at: new Date()
        },
        {
          product_id: 5,
          attribute_id: 12,
          created_at: new Date(),                                                        
          updated_at: new Date()
        },
        {
          product_id: 5,
          attribute_id: 13,
          created_at: new Date(),                                                        
          updated_at: new Date()
        },
        {
          product_id: 5,
          attribute_id: 14,
          created_at: new Date(),                                                        
          updated_at: new Date()
        },
        {
          product_id: 6,
          attribute_id: 3,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          product_id: 6,
          attribute_id: 6,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          product_id: 6,
          attribute_id: 9,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          product_id: 6,
          attribute_id: 11,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          product_id: 6,
          attribute_id: 12,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          product_id: 6,
          attribute_id: 13,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          product_id: 6,
          attribute_id: 14,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          product_id: 7,
          attribute_id: 21,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          product_id: 8,
          attribute_id: 18,
          created_at: new Date(),
          updated_at: new Date()
        }

    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('product_attributes', null, {});
  }
};
