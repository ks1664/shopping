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
     await queryInterface.bulkInsert('attribute_values', [
        {
          attribute_id: 1,
          name: 'Marlboro Red King Size',
          description: 'Marlboro Red King Size description here',
          price:7.05,
          seller_price: 3.4,
          created_at: new Date(),
          updated_at: new Date()   
        },
        {
          attribute_id: 2,
          name: 'American Blend',
          description: 'American Blend description here',
          price:8.23,
          seller_price: 4.4,
          created_at: new Date(),
          updated_at: new Date()  
        },
        {
          attribute_id: 3,
          name: 'X',
          description: 'X Size description here',
          price:10,
          seller_price: 5,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: 3,
          name: 'L',
          description: 'L Size description here',
          price:12,
          seller_price: 6,
          created_at: new Date(),
          updated_at: new Date()
          
        },
        {
          attribute_id: 3,
          name: 'XL',
          description: 'XL Size description here',
          price:12.20,
          seller_price: 6.10,
          created_at: new Date(),
          updated_at: new Date()
          
        },
        {
          attribute_id: 3,
          name: 'XXL',
          description: 'XXL Size description here',
          price:15.40,
          seller_price: 6.10,
          created_at: new Date(),
          updated_at: new Date()
          
        },
        {
          attribute_id: 4,
          name: 'Pack Quantity',
          description: 'Pack Quantity description here',
          price:10.5,
          seller_price: 5.5,
          created_at: new Date(),
          updated_at: new Date()
          
        },
        {
          attribute_id: 5,
          name: 'Foods',
          description: 'Foods description here',
          price:13.3,
          seller_price: 7.10,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: 6,
          name: '#808080',
          description: 'Grey',
          price:34,
          seller_price: 18,
          image:'https://m.media-amazon.com/images/I/41RB23weqrL.jpg',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: 6,
          name: '#FFA500',
          description: 'Orange',
          price:67,
          seller_price: 37,
          image:'https://m.media-amazon.com/images/I/71QDmVedv0L._UX569_.jpg',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: 6,
          name: '#FF0000',
          description: 'Red',
          price:23,
          seller_price: 6.10,
          image:'https://m.media-amazon.com/images/I/71QDmVedv0L._UX569_.jpg',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: 9,
          name: 'Long Sleeves',
          description: 'Long Sleeves here',
          price:34,
          seller_price: 6.10,
          image:'https://m.media-amazon.com/images/I/71QDmVedv0L._UX569_.jpg',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: 10,
          name: 'Puffer Jacket',
          description: 'Puffer Jacket here',
          price:23,
          seller_price: 2.10,
          image:'https://m.media-amazon.com/images/I/71QDmVedv0L._UX569_.jpg',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: 11,
          name: 'Hooded',
          description: 'Hooded here',
          price:43,
          seller_price: 34.0,
          image:'https://m.media-amazon.com/images/I/71QDmVedv0L._UX569_.jpg',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: 12,
          name: 'Polyester',
          description: 'Polyester here',
          price:13.32,
          seller_price: 7.10,
          image:'https://m.media-amazon.com/images/I/71QDmVedv0L._UX569_.jpg',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: 13,
          name: 'Solid',
          description: 'Solid here',
          price:34,
          seller_price: 18,
          image:'https://m.media-amazon.com/images/I/71QDmVedv0L._UX569_.jpg',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: 14,
          name: 'Casual',
          description: 'Casual here',
          price:98,
          seller_price: 45.45,
          image:'https://m.media-amazon.com/images/I/71QDmVedv0L._UX569_.jpg',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: 7,
          name: 'Extra Spicy',
          description: 'Extra Spicy description here',
          price:20.12,
          seller_price: 10.10,
          image:'',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: 7,
          name: 'Spicy',
          description: 'Extra Spicy description here',
          price:22.2,
          seller_price: 12.10,
          image:'',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: 7,
          name: 'Regular Spicy',
          description: 'Extra Spicy description here',
          price:23.5,
          seller_price: 11.33,
          image:'',
          created_at: new Date(),
          updated_at: new Date()
        },     
        {
          attribute_id: 8,
          name: 'Low Sweet',
          description: 'Low Sweet description here',
          price:34,
          seller_price: 6.10,
          image:'',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: 8,
          name: 'Very Sweet',
          description: 'Very Sweet description here',
          price:45,
          seller_price: 22.10,
          image:'',
          created_at: new Date(),
          updated_at: new Date()
        } ,
        {
          attribute_id: 8,
          name: 'Very Sweet',
          description: 'Very Sweet description here',
          price:65,
          seller_price: 26.10,
          image:'',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          attribute_id: 15,
          name: 'Marlboro Red',
          description: 'Marlboro Red description here',
          price:10.05,
          seller_price: 6.10,
          created_at: new Date(),
          updated_at: new Date()   
        },
        {
          attribute_id: 16,
          name: 'Classic Cigaratte',
          description: 'Classic Cigaratte description here',
          price:11.05,
          seller_price: 6.10,
          created_at: new Date(),
          updated_at: new Date()   
        },
        {
          attribute_id: 17,
          name: 'Gold Flake Cigaratte',
          description: 'Gold Flake Cigaratte description here',
          price:13.05,
          seller_price: 6.10,
          created_at: new Date(),
          updated_at: new Date()   
        },
        {
          attribute_id: 18,
          name: 'Swedish massage',
          image:"https://thumbs.dreamstime.com/b/ayurverdic-treatment-massage-oil-29885307.jpg",
          description: 'Swedish massage description here',
          price:12.05,
          seller_price: 6.10,
          created_at: new Date(),
          updated_at: new Date()   
        },
        {
          attribute_id: 18,
          name: 'Hot stone massage',
          image:"https://sa1s3optim.patientpop.com/assets/images/provider/photos/2275055.png",
          description: 'Hot stone massage description here',
          price:54.05,
          seller_price: 6.10,
          created_at: new Date(),
          updated_at: new Date()   
        },
        {
          attribute_id: 18,
          name: 'Aromatherapy massage',
          image:"https://cdn.hswstatic.com/gif/massage-aromatherapy-1.jpg",
          description: 'Aromatherapy massage description here',
          price:65.05,
          seller_price: 6.10,
          created_at: new Date(),
          updated_at: new Date()   
        },
        {
          attribute_id: 18,
          name: 'Deep tissue massage',
          image:"http://cdn.shopify.com/s/files/1/2736/2994/products/WebsitePics_27.png?v=1623620680",
          description: 'Deep tissue massage description here',
          price:25.05,
          seller_price: 6.10,
          created_at: new Date(),
          updated_at: new Date()   
        },
        {
          attribute_id: 19,
          name: 'Acne Facial',
          image:"https://post.healthline.com/wp-content/uploads/2019/01/Facial_Spa_Mask-1200x628-Facebook.jpg",
          description: 'Acne Facial description here',
          price:55.05,
          seller_price: 6.10,
          created_at: new Date(),
          updated_at: new Date()   
        },
        {
          attribute_id: 19,
          name: 'Mini Facial',
          image:"https://images.herzindagi.info/image/2021/Dec/mini-facial-at-home_g.jpg",
          description: 'Mini Facial description here',
          price:54.05,
          seller_price: 6.10,
          created_at: new Date(),
          updated_at: new Date()   
        },
        {
          attribute_id: 19,
          name: 'Microdermabrasion',
          image:"https://post.healthline.com/wp-content/uploads/2020/09/732x549_THUMBNAIL_Microdermabrasion-1-732x549.jpg",
          description: 'Microdermabrasion description here',
          price:54.05,
          seller_price: 36.10,
          created_at: new Date(),
          updated_at: new Date()   
        },
        {
          attribute_id: 19,
          name: 'Chemical Peel Treatment',
          image:"https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/05/GettyImages-937239886_header-1024x575.jpg?w=1155&h=1528",
          description: 'Chemical Peel Treatment description here',
          price:87.05,
          seller_price: 46.10,
          created_at: new Date(),
          updated_at: new Date()   
        },
        {
          attribute_id: 20,
          name: 'Blow Dry',
          image:"https://cdn.shopify.com/s/files/1/0578/7762/7062/products/is-it-safe-shampoo-and-blow-dry-clients-coronavirus-1_1445x.jpg?v=1654960989",
          description: 'Blow Dry description here',
          price:54.05,
          seller_price: 36.10,
          created_at: new Date(),
          updated_at: new Date()   
        },
        {
          attribute_id: 20,
          name: 'Formal hair cut',
          image:"https://haircutinspiration.com/wp-content/uploads/Classic-Tapered-Comb-Over.jpg",
          description: 'Formal hair cut description here',
          price:86.05,
          seller_price: 46.10,
          created_at: new Date(),
          updated_at: new Date()   
        },
        {
          attribute_id: 20,
          name: 'Basic Tint',
          image:"https://www.happyskincosmetics.com/5674-big_default_2x/happy-skin-lip-mallow-tint-in-basic.jpg",
          description: 'Basic Tint description here',
          price:89.05,
          seller_price: 66.10,
          created_at: new Date(),
          updated_at: new Date()   
        },
        {
          attribute_id: 20,
          name: 'Full Highlights',
          image:"https://i0.wp.com/www.thecolourbar.me/wp-content/uploads/2020/02/IMG_0655.jpg?fit=1242%2C1242&amp;ssl=1",
          description: 'Full Highlights description here',
          price:86.05,
          seller_price: 56.10,
          created_at: new Date(),
          updated_at: new Date()   
        },
        {
          attribute_id: 21,
          name: 'Henna & Tint',
          image:"https://images.squarespace-cdn.com/content/v1/5b40f865266c07f72dadd501/1552438244806-KSE45D7HWE5T427FO4K5/Henna.jpg",
          description: 'Henna & Tint description here',
          price:90.05,
          seller_price: 46.10,
          created_at: new Date(),
          updated_at: new Date()   
        },
        {
          attribute_id: 21,
          name: 'Brow Bar Threading & Waxing',
          image:"https://images.squarespace-cdn.com/content/v1/567031dfa128e649ae552de0/1552569263231-Y9H79B1LFIA64KA4T2X4/salon-thread-eyebrow-threading-image.jpg",
          description: 'Brow Bar Threading & Waxing description here',
          price:23.05,
          seller_price: 16.10,
          created_at: new Date(),
          updated_at: new Date()   
        },
        {
          attribute_id: 21,
          name: 'Lash Lifting',
          image:"https://res.cloudinary.com/conferences-and-exhibitions-pvt-ltd/image/upload/v1660732756/Hair%20and%20Beauty%20Trends/2022/August/eyelashes/Lash-Lifting_wmja2h.jpg",
          description: 'Lash Lifting description here',
          price:50.05,
          seller_price: 36.10,
          created_at: new Date(),
          updated_at: new Date()   
        },
        {
          attribute_id: 21,
          name: 'Hybrid Lash Extensions & Reefils',
          image:"https://www.byrdie.com/thmb/aaTG4p4MPX8a_5Hk-z7fwXUPPtw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/26157287_2079022432319307_750336928414433280_n-a21a08f76471418fbb224f8905911c05.jpg",
          description: 'Hybrid Lash Extensions & Reefils description here',
          price:99.05,
          seller_price: 86.10,
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
    await queryInterface.bulkDelete('attribute_values', null, {});
  }
};
