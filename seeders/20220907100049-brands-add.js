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
    await queryInterface.bulkInsert('brands', [
      {
        image: 'https://i.pinimg.com/550x/7a/60/c7/7a60c7ff8b86987789bed70c134423d4.jpg',
        service_id: '2',
        name: 'Cigar',
        description: 'Cigar Retail',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Nirdos',
        service_id: '2',
        image: 'http://nirdoshcigarette.com/wp-content/uploads/product_nirdosh_kings_04.jpg',
        description: 'Nirdos description Retail',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Hindustan Uniliver',
        service_id: '2',
        image: 'https://cdn.sanity.io/images/92ui5egz/production/7c1c60e9afaaaa3cce61e5101717796d21b7f914-1426x1080.svg?rect=0,166,1426,749&w=1200&h=630&fm=jpg',
        description: 'Hindustan Uniliver Retail',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Everyday',
        service_id: '2',
        image: 'https://www.bigbasket.com/media/uploads/p/l/40128535-3_1-eveready-carbon-zinc-battery-red-hd-aaa-1012.jpg',
        description: 'Everyday Retail',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Amaron',
        service_id: '2',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2Sf2PmIhkcxOxdOR7M8fpnKn1-sWu20tWQw&usqp=CAU',
        description: 'Amaron Retail',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Hungry',
        service_id: '1',
        image: "https://www.hungrytop.com/assets/images/hungrytop.jpg",
        description: 'Hungry Food',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Domino's",
        service_id: '1',
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Dominos_pizza_logo.svg/1200px-Dominos_pizza_logo.svg.png",
        description: "Domino's Food",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Jockey',
        service_id: '3',
        image: "https://image3.mouthshut.com/images/imagesp/925614943s.png",
        description: 'Jockey Fashion',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Campus',
        service_id: '3',
        image: 'https://www.rajashoes.in/VendorAssets/1029/StoreImages/Large/1722GRAVITYBLU-ORG.jpg',
        description: 'Campus Fashion',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Puma',
        service_id: '3',
        image: 'https://1000logos.net/wp-content/uploads/2017/05/PUMA-logo.jpg',
        description: 'Puma Fashion',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'National Beverage',
        service_id: '2',
        image: 'https://download.logo.wine/logo/National_Beverage/National_Beverage-Logo.wine.png',
        description: 'National Beverage Retails',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Delta Remedys',
        service_id: '2',
        image: 'https://cdn.shopify.com/s/files/1/0629/8225/8924/files/delta-who.png?v=1647344100',
        description: 'Delta Remedys Retails',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Lakme Salons',
        service_id: '4',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8p9kQMA2Su2SkvCdDkXmUThPygEqBd74uBg&usqp=CAU',
        description: 'Lakme Salons Services',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Americana Grocery',
        service_id: '2',
        image: 'https://cdn.dribbble.com/users/5421191/screenshots/11876105/american_grocery_shop_4x.jpg',
        description: 'Lakme Salons Services',
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
      await queryInterface.bulkDelete('brands', null, {});
  }
};
