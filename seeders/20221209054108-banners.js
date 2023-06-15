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
     await queryInterface.bulkInsert('banners', [
        {
          caption: "Foods services caption here",
          path: "https://img.freepik.com/free-psd/fast-food-banner-template_23-2148609080.jpg?w=2000",
          service_id: 1,
          created_at: new Date(),
          updated_at: new Date()
          
        },

        {
          caption: "Foods services caption here",
          path: "https://img.freepik.com/free-vector/flat-design-food-banner-template_23-2149076251.jpg?w=2000",
          service_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },

        {
          caption: "Foods services caption here",
          path: "https://i.pinimg.com/originals/4c/25/f2/4c25f28b4ed79805db6a2383ed677918.png",
          service_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
       
        {
          caption: "Retail services caption here",
          path: "https://img.freepik.com/free-vector/mega-sale-offers-banner-template_1017-31299.jpg?w=2000",
          service_id: 2,
          created_at: new Date(),
          updated_at: new Date()
        },

        {
          caption: "Retail services caption here",
          path: "https://d1xv5jidmf7h0f.cloudfront.net/circleone/images/mastertemplates/11138/preview_page_1.jpg",
          service_id: 2,
          created_at: new Date(),
          updated_at: new Date()
        },
       
        {
          caption: "Retail services caption here",
          path: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/red-new-arrivals-sale-retail-banner-stand-design-template-683f096b876b65f0b06d2e9bc7b3c8d7_screen.jpg?ts=1637223529",
          service_id: 2,
          created_at: new Date(),
          updated_at: new Date()
        },

        {
          caption: "Health&Fitness services caption here",
          path: "https://img.freepik.com/premium-psd/fitness-gym-training-facebook-cover-web-banner-psd-template_265396-140.jpg?w=2000",
          service_id: 3,
          created_at: new Date(),
          updated_at: new Date()
        },

        {
          caption: "Health&Fitness services caption here",
          path: "https://img.freepik.com/free-psd/sports-tech-banner-template_23-2148402071.jpg?w=2000",
          service_id: 3,
          created_at: new Date(),
          updated_at: new Date()
        },
           
        {
          caption: "Health&Fitness services caption here",
          path: "https://media.istockphoto.com/id/1202889393/vector/healthy-lifestyle-landing-page-with-woman-exercising-sport-web-page-template-design-for-gym.jpg?s=612x612&w=0&k=20&c=tFpPJ3X459FYSd_DuuDOSDXpFTc-e2cQxpNIleBSPxE=",
          service_id: 3,
          created_at: new Date(),
          updated_at: new Date()
        },

        {
          caption: "Fashion services caption here",
          path: "https://img.freepik.com/free-psd/horizontal-banner-template-online-fashion-sale_23-2148585405.jpg?w=2000",
          service_id: 4,
          created_at: new Date(),
          updated_at: new Date()
        },

        {
          caption: "Fashion services caption here",
          path: "https://img.freepik.com/free-psd/summer-sale-70-discount_23-2148476960.jpg?w=2000",
          service_id: 4,
          created_at: new Date(),
          updated_at: new Date()
        },


        {
          caption: "Fashion services caption here",
          path: "https://i.pinimg.com/originals/b3/7b/8b/b37b8b8f39dca274afdfade54efe02ca.jpg",
          service_id: 4,
          created_at: new Date(),
          updated_at: new Date()
        },

        {
          caption: "Classes services caption here",
          path: "https://img.freepik.com/free-psd/online-courses-banner-template_23-2149109788.jpg?w=2000",
          service_id: 5,
          created_at: new Date(),
          updated_at: new Date()
        },

        {
          caption: "Classes services caption here",
          path: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/homework-classes-banner-design-template-78692d8593e6745d7202cb85bb73b200_screen.jpg?ts=1561479462",
          service_id: 5,
          created_at: new Date(),
          updated_at: new Date()
        },

        {
          caption: "Classes services caption here",
          path: "https://img.freepik.com/free-psd/e-learning-banner-design-template_23-2149113592.jpg?w=2000",
          service_id: 5,
          created_at: new Date(),
          updated_at: new Date()
        },

        {
          caption: "Services services caption here",
          path: "https://img.freepik.com/free-vector/asian-beauty-banners-design_23-2148739797.jpg?w=2000",
          service_id: 6,
          created_at: new Date(),
          updated_at: new Date()
        },

        {
          caption: "Services services caption here",
          path: "https://img.freepik.com/free-vector/website-development-banner_33099-1687.jpg?w=2000",
          service_id: 6,
          created_at: new Date(),
          updated_at: new Date()
        },

        {
          caption: "Services services caption here",
          path: "https://static.vecteezy.com/system/resources/thumbnails/001/825/934/small/shopping-experience-of-finding-products-making-payments-and-delivery-services-big-shopping-cart-flat-illustration-for-landing-page-web-website-banner-mobile-apps-flyer-poster-ui-free-vector.jpg",
          service_id: 6,
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
    await queryInterface.bulkDelete('banners', null, {});
  }
};
