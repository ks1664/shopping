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
    await queryInterface.bulkInsert('coupons', [
      {
        code: 'SAVE20',
        type: 'percentage',
        seller_id: "b169ed4d-be27-44eb-9a08-74f997bc6a2a",
        service_id: 1,
        image: "https://image.shutterstock.com/image-vector/50-coupon-promotion-sale-website-260nw-2039676860.jpg",
        method: 'coupon',
        start_time: new Date("2022-12-05T09:16:59.010Z") ,
        end_time:   new Date("2023-12-10T09:06:59.010Z"),
        minimum_order_amount:50,
        discount_percentage: 20,
        discount_amount: 0,
        max_discount: 100,
        min_discount: 0,
        max_total_usage: 10000,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        code: 'SAVE30',
        type: 'percentage',
        seller_id: "b169ed4d-be27-44eb-9a08-74f997bc6a2a",
        service_id: 1,
        image: "https://img.freepik.com/premium-vector/coupon-discount-isolated-gift-voucher-business-set-promo-coupons_165143-1054.jpg?w=2000",
        method: 'coupon',
        start_time: new Date("2022-12-15T09:16:59.010Z"),
        end_time: new Date("2023-12-20T09:16:59.010Z"),
        minimum_order_amount:80,
        discount_percentage: 30,
        discount_amount: 0,
        max_discount: 200,
        min_discount: 0,
        max_total_usage: 1000,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        code: 'SAVE10',
        type: 'percentage',
        seller_id: "b169ed4d-be27-44eb-9a08-74f997bc6a2a",
        service_id: 1,
        image: "https://t4.ftcdn.net/jpg/03/29/10/97/360_F_329109774_iTsyjzLU5O9cagJ9UhahhNF2ZdkW4OHc.jpg",
        method: 'coupon',
        start_time: new Date("2022-12-20T09:16:59.010Z"),
        end_time: new Date("2023-12-25T09:16:59.010Z"),
        minimum_order_amount:90,
        discount_percentage: 10,
        discount_amount: 0,
        max_discount: 200,
        min_discount: 0,
        max_total_usage: 1000,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        code: 'SAVE60',
        type: 'percentage',
        seller_id: "b169ed4d-be27-44eb-9a08-74f997bc6a2a",
        service_id: 1,
        image: "https://img.freepik.com/free-vector/creative-coupon-template-design_23-2147943318.jpg?w=2000",
        method: 'coupon',
        start_time: new Date("2023-01-01T09:16:59.010Z"),
        end_time: new Date("2023-06-10T09:12:06.010Z"),
        minimum_order_amount:40,
        discount_percentage: 60,
        discount_amount: 0,
        max_discount: 300,
        min_discount: 0,
        max_total_usage: 5000,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        code: 'SAVE90',
        type: 'percentage',
        seller_id: "b169ed4d-be27-44eb-9a08-74f997bc6a2a",
        service_id: 1,
        image: "https://t4.ftcdn.net/jpg/04/84/31/43/240_F_484314316_gLvmAG9WIs4o8QoMUtaVTeKK3JEF77cN.jpg",
        method: 'coupon',
        start_time: new Date("2023-01-10T09:04:59.010Z"),
        end_time:  new Date("2023-04-20T09:13:09.010Z"),
        minimum_order_amount:45,
        discount_percentage: 90,
        discount_amount: 0,
        max_discount: 500,
        min_discount: 0,
        max_total_usage: 5000,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        code: 'SAVE100',
        type: 'percentage',
        seller_id: "b169ed4d-be27-44eb-9a08-74f997bc6a2g",
        service_id: 2,
        image: "https://t4.ftcdn.net/jpg/04/84/31/43/240_F_484314316_gLvmAG9WIs4o8QoMUtaVTeKK3JEF77cN.jpg",
        method: 'coupon',
        start_time: new Date("2023-01-10T09:04:59.010Z"),
        end_time:  new Date("2023-01-20T09:13:09.010Z"),
        minimum_order_amount:45,
        discount_percentage: 90,
        discount_amount: 0,
        max_discount: 500,
        min_discount: 0,
        max_total_usage: 5000,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        code: 'SAVE10',
        type: 'percentage',
        seller_id: "b169ed4d-be27-44eb-9a08-74f997bc6a2g",
        service_id: 2,
        image: "https://t4.ftcdn.net/jpg/03/29/10/97/360_F_329109774_iTsyjzLU5O9cagJ9UhahhNF2ZdkW4OHc.jpg",
        method: 'coupon',
        start_time: new Date("2022-12-20T09:16:59.010Z"),
        end_time: new Date("2023-12-25T09:16:59.010Z"),
        minimum_order_amount:90,
        discount_percentage: 10,
        discount_amount: 0,
        max_discount: 200,
        min_discount: 0,
        max_total_usage: 1000,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        code: 'SAVE30',
        type: 'percentage',
        seller_id: "b169ed4d-be27-44eb-9a08-74f997bc6a2g",
        service_id: 2,
        image: "https://img.freepik.com/premium-vector/coupon-discount-isolated-gift-voucher-business-set-promo-coupons_165143-1054.jpg?w=2000",
        method: 'coupon',
        start_time: new Date("2022-12-15T09:16:59.010Z"),
        end_time: new Date("2023-12-20T09:16:59.010Z"),
        minimum_order_amount:80,
        discount_percentage: 30,
        discount_amount: 0,
        max_discount: 200,
        min_discount: 0,
        max_total_usage: 1000,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        code: 'SAVE20',
        type: 'percentage',
        seller_id: "b169ed4d-be27-44eb-9a08-74f997bc6a2g",
        service_id: 2,
        image: "https://image.shutterstock.com/image-vector/50-coupon-promotion-sale-website-260nw-2039676860.jpg",
        method: 'coupon',
        start_time: new Date("2022-12-05T09:16:59.010Z") ,
        end_time:   new Date("2023-12-10T09:06:59.010Z"),
        minimum_order_amount:50,
        discount_percentage: 20,
        discount_amount: 0,
        max_discount: 100,
        min_discount: 0,
        max_total_usage: 10000,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        code: 'SAVE60',
        type: 'percentage',
        seller_id: "b169ed4d-be27-44eb-9a08-74f997bc6a2g",
        service_id: 2,
        image: "https://img.freepik.com/free-vector/creative-coupon-template-design_23-2147943318.jpg?w=2000",
        method: 'coupon',
        start_time: new Date("2023-01-01T09:16:59.010Z"),
        end_time: new Date("2023-01-10T09:12:06.010Z"),
        minimum_order_amount:40,
        discount_percentage: 60,
        discount_amount: 0,
        max_discount: 300,
        min_discount: 0,
        max_total_usage: 5000,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        code: 'SAVE60',
        type: 'percentage',
        seller_id: "b169ed4d-be27-44eb-9a08-74f997bc6a2p",
        service_id: 4,
        image: "https://img.freepik.com/free-vector/creative-coupon-template-design_23-2147943318.jpg?w=2000",
        method: 'coupon',
        start_time: new Date("2023-01-01T09:16:59.010Z"),
        end_time: new Date("2023-07-10T09:12:06.010Z"),
        minimum_order_amount:40,
        discount_percentage: 60,
        discount_amount: 0,
        max_discount: 300,
        min_discount: 0,
        max_total_usage: 5000,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
      await queryInterface.bulkDelete('coupons', null, {});
  }
};
