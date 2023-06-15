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
     await queryInterface.bulkInsert('attributes', [
        {
          name: 'Cigarette smoke',
          description: 'Cigarette smoke description here',
          required_value_count: 0,
          created_at: new Date(),
          updated_at: new Date() 
        },
        {
          name: 'Tobacco Blend',
          description: 'Tobacco Blend description here',
          required_value_count: 0,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Size',
          description: 'size',
          required_value_count: 0,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Pack Quantity',
          description: '20 Cigrattes',
          required_value_count: 0,
          created_at: new Date(),
          updated_at: new Date()
        }, 
        {
          name: 'Food Type',
          description: 'Food Dilivery',
          required_value_count: 0,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Color',
          description: 'Color descriptions',
          required_value_count: 0,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Spice Leval',
          description: 'Spice Leval descriptions',
          required_value_count: 2,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Sweets',
          description: 'Sweets Leval descriptions',
          required_value_count: 0,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Sleeve Length',
          description: 'Sleeve Length Here',
          required_value_count: 0,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Type',
          description: 'Type Here',
          required_value_count: 0,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Collar',
          description: 'Collar Here',
          required_value_count: 0,
          created_at: new Date(),
          updated_at: new Date()
        }, 
        {
          name: 'Lining Fabric',
          description: 'Lining Fabric Here',
          required_value_count: 0,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Print or Pattern Type',
          description: 'Print or Pattern Type Here',
          required_value_count: 0,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Occasion',
          description: 'Occasion Here',
          required_value_count: 0,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Red smoke',
          description: 'Red smoke description here',
          required_value_count: 0,
          created_at: new Date(),
          updated_at: new Date() 
        }, 
        {
          name: 'Classic smoke',
          description: 'Classic smoke description here',
          required_value_count: 0,
          created_at: new Date(),
          updated_at: new Date() 
        },
        {
          name: 'Gold Flake Smoke',
          description: 'Classic smoke description here',
          required_value_count: 0,
          created_at: new Date(),
          updated_at: new Date() 
        },   
        {
          name: 'Full Body Massage',
          description: 'Full Body Massage description here',
          required_value_count: 0,
          created_at: new Date(),
          updated_at: new Date() 
        },    
        {
          name: 'Face & Skin Care',
          description: 'Face & Skin Care description here',
          required_value_count: 0,
          created_at: new Date(),
          updated_at: new Date() 
        },  
        {
          name: 'Hair & Styling',
          description: 'Hair & Styling description here',
          required_value_count: 0,
          created_at: new Date(),
          updated_at: new Date() 
        },    
        {
          name: 'Brows & Lashes',
          description: 'Brows & Lashes description here',
          required_value_count: 0,
          created_at: new Date(),
          updated_at: new Date() 
        },  
     
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('attributes', null, {});
  }
};
