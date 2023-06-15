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
    await queryInterface.bulkInsert('services', [
      {
        name: 'Restaurants',
        slug: 'food',
        type: 'product',
        description: 'Food Delivery Description',
        image: 'https://cdn.midjourney.com/a56efc48-20f9-4930-aaed-ebb1ecad0456/grid_0.png',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Retails',
        slug: 'retail',
        type: 'product',
        description: 'Retail Shop Description',
        image: `https://cdn.midjourney.com/9703b455-5f1c-4df6-8d3f-ca5e9cbe3159/grid_0.png`,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Fashion',
        slug: 'fashion',
        type: 'product',
        description: 'Fashion Description',
        image: `https://cdn.midjourney.com/a33b5066-98d4-4876-8f6d-5578ccbaf8b0/grid_0.png`,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Services',
        slug: 'services',
        type: 'service',
        description: 'Services Description',
        image: 'https://cdn.midjourney.com/6a5d9e67-12a9-4f17-b1c2-7f5d203cce7e/grid_0.png',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Classes',
        slug: 'classes',
        type: 'service',
        description: 'Classes Description',
        image: 'https://cdn.discordapp.com/attachments/951176110194974743/1075083485276028958/ananmech_very_realistic_shot_on_white_background_mixed_media_ar_171e90e0-4d2e-4c28-bf0e-bb8258776d92.png',
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
      await queryInterface.bulkDelete('services', null, {});
  }
};
