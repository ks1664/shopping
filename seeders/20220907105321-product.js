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
     await queryInterface.bulkInsert('products', [
        {
          brand_id: 7,
          service_id: 1,
          category_id: 4,
          name: 'Onion Pizza',
          image: 'https://api.pizzahut.io/v1/content/en-in/in-1/images/pizza/tandoori-onion.98e8cbd306a1166cedbbdbd2a97eade3.1.jpg',
          description: 'Onion Pizza here',
          price: 10.50,
          sku: "sku-0135",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          brand_id: 7,
          service_id: 1,
          category_id: 6,
          name: 'Chicken Burger',
          image: 'https://media.istockphoto.com/id/1203580318/photo/vegan-meatless-plant-based-protein-chicken-strip-burger-on-a-whole-wheat-bun-with-lettuce.jpg?s=612x612&w=0&k=20&c=gmwd9ArrKHE_0vX3R0eYLHfAg129rBk2EzmcsSBFxlk=',
          description: 'Chicken Burger here',
          price: 10.50,
          sku: "sku-0136",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          brand_id: 14,
          service_id: 2,
          category_id: 10,
          name: 'Groceries',
          image: 'https://thumbs.dreamstime.com/b/lots-groceries-17001094.jpg',
          description: 'Groceries Description Here',
          price: 12.20,
          sku: "sku-0135",
          created_at: new Date(),
          updated_at: new Date()  
        },
        {
          brand_id: 11,
          service_id: 2,
          category_id: 11,
          name: 'Beverage',
          image: 'https://thumbs.dreamstime.com/b/green-smoothie-fruit-juice-freshly-squeezed-healthy-drinks-beverage-made-fresh-organic-vegetable-127444036.jpg',
          description: 'Beverage drinks Description Here',
          price: 11.50,
          sku: "sku-0130",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          brand_id: 8,
          service_id: 3,
          category_id: 6,
          name: 'Hoodies',
          weight: "18",
          length: "30",
          breadth: "45",
          height: "15",
          description: 'Hoodies Description Here',
          price: 10.50,
          sku: "sku-0135",
          created_at: new Date(),
          updated_at: new Date()
          
        },
        {
          brand_id: 10,
          service_id: 3,
          category_id: 7,
          name: 'Quechua Jacket',
          weight: "15",
          length: "55",
          breadth: "77",
          height: "10",
          description: 'Quechua Jacket Description Here',
          price: 10.50,
          sku: "sku-0135",
          created_at: new Date(),
          updated_at: new Date()
          
        },
        {
          service_id: 4,
          brand_id: 13,
          category_id: 8,
          image: 'https://www.shutterstock.com/image-vector/illustration-womans-eyes-eyelashes-eyebrows-260nw-1552086998.jpg',
          name: 'Brows & Lashes',
          description: 'Hair & Styling Care Description Here',
          price: 40.50,
          sku: "sku-0135",
          created_at: new Date(),
          updated_at: new Date()
          
        },
        {
          service_id: 4,
          brand_id: 13,
          category_id: 9,
          image: 'https://media-cdn.tripadvisor.com/media/photo-s/15/18/32/e3/full-body-massage.jpg',
          name: 'Full Body Massage',
          description: 'Full Body Massage Description Here',
          price: 50.50,
          sku: "sku-0135",
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
    await queryInterface.bulkDelete('products', null, {});
  }
};
