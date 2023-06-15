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
     await queryInterface.bulkInsert('product_images', [
        {
          product_id: 1,
          url: "https://img-global.cpcdn.com/recipes/cd6fec5ae0b70986/1200x630cq70/photo.jpg",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          product_id: 2,
          url: "https://www.chicken.ca/wp-content/uploads/2013/05/Moist-Chicken-Burgers-1180x580.jpg",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          product_id: 3,
          url: "https://img.pipesandcigars.com/P/500/PM/P/PDGRD-PF-1002.png?v=175759",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          product_id: 4,
          url: "https://c.tadst.com/gfx/750x500/beverage-day.jpg",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          product_id: 5,
          url: "https://static.toiimg.com/photo/78489227.cms",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          product_id: 6,
          url: "https://contents.mediadecathlon.com/p1647177/k$7319dd211a0653d4b72efd6e697a0553/-sh100-.jpg",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          product_id: 7,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ955ByKDyFKeY3tQGbcpTtmiGkklsTJZAOjg&usqp=CAU",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          product_id: 8,
          url: "https://content.jdmagicbox.com/comp/chandigarh/e1/0172px172.x172.181205115739.g4e1/catalogue/thai-24-hour-day-night-spa-and-massage-centre-baltana-zirakpur-massage-centres-for-men-0dx3t9pgbo.jpg?clr=",
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
    await queryInterface.bulkDelete('product_images', null, {});
  }
};
