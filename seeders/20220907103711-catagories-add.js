"use strict";

const DataHelper = require("../helpers/v1/data.helpers");
const _DataHelper = new DataHelper();

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
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          parent_id: null,
          service_id: 2,
          image:
            "https://image.shutterstock.com/image-photo/close-hndmade-smoking-cigarettes-on-260nw-1921663331.jpg",
          name: "Tobacco",
          description: "Tobacco description here",
          slug: await _DataHelper.generateSlug("Tobacco"),
          category_uuid: await _DataHelper.generateUuid(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          parent_id: null,
          service_id: 2,
          image:
            "https://weedmaps.com/learn/wp-content/uploads/2022/07/CRTV-5437_May22-Social_Dab-Stack-1-scaled.jpg",
          name: "Dab",
          description: "Dab description here",
          slug: await _DataHelper.generateSlug("Dab"),
          category_uuid: await _DataHelper.generateUuid(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          parent_id: null,
          service_id: 1,
          image:
            "https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg",
          name: "Foods",
          description: "Foods",
          slug: await _DataHelper.generateSlug("Foods"),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          parent_id: null,
          service_id: 1,
          image:
            "https://static.toiimg.com/thumb/53110049.cms?width=1200&height=900",
          name: "Pizza",
          description: "Pizza discription here",
          slug: await _DataHelper.generateSlug("Pizza"),
          category_uuid: await _DataHelper.generateUuid(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          parent_id: null,
          service_id: 1,
          image:
            "https://niftyrecipe.com/uploads/youtube/parse/1642334471_QwMHac.jpg",
          name: "Pasta",
          description: "Pasta discription here",
          slug: await _DataHelper.generateSlug("Pasta"),
          category_uuid: await _DataHelper.generateUuid(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          parent_id: null,
          service_id: 3,
          image:
            "https://cdn.midjourney.com/53a84d83-bc60-49e2-918f-8d8babc1bb67/grid_0.png",
          name: "Baby Boy",
          description: "Baby Boy discription here",
          slug: await _DataHelper.generateSlug("Baby Boy"),
          category_uuid: await _DataHelper.generateUuid(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          parent_id: null,
          service_id: 3,
          image:
            "https://cdn.midjourney.com/453c9677-48cb-4ace-aabd-88dfa84de9a8/grid_0.png",
          name: "Baby Girl",
          description: "Baby Girl discription here",
          slug: await _DataHelper.generateSlug("Baby Girl"),
          category_uuid: await _DataHelper.generateUuid(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          parent_id: null,
          service_id: 4,
          image:
            "https://cdn.midjourney.com/d19fd3e1-fd75-486f-abab-a97a4c8f5146/grid_0.png",
          name: "Beauty & Spas",
          description: "Beauty & Spas",
          slug: await _DataHelper.generateSlug("Beauty & Spas"),
          category_uuid: await _DataHelper.generateUuid(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          parent_id: null,
          service_id: 4,
          image:
            "https://cdn.midjourney.com/d19fd3e1-fd75-486f-abab-a97a4c8f5146/grid_0.png",
          name: "Entertainment",
          description: "Entertainment",
          slug: await _DataHelper.generateSlug("Entertainment"),
          category_uuid: await _DataHelper.generateUuid(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          parent_id: null,
          service_id: 2,
          image:
            "https://media.istockphoto.com/id/1284690585/photo/colorful-vegetables-and-fruits-vegan-food-in-rainbow-colors.jpg?s=612x612&w=0&k=20&c=fXqp_CPaHMyfzMhjZGQG1zloNBNkVRjdYKScw3K98XQ=",
          name: "Vegetables and fruit",
          description: "Vegetables and fruit ",
          slug: await _DataHelper.generateSlug("Vegetables and fruit"),
          category_uuid: await _DataHelper.generateUuid(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          parent_id: null,
          service_id: 2,
          image:
            "https://media.istockphoto.com/id/641975492/photo/three-fruits-and-vegetables-detox-drinks.jpg?s=612x612&w=0&k=20&c=f5zNgfySRuxKvWvYUTTbsud95pHFg2p7oVhlAmg_w1M=",
          name: "Juice and plant drinks",
          description: "Juice and plant drinks",
          slug: await _DataHelper.generateSlug("Juice and plant drinks"),
          category_uuid: await _DataHelper.generateUuid(),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("categories", null, {});
  },
};
