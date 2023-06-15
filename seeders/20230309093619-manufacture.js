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
    await queryInterface.bulkInsert('manufactures', [
      {
        image: 'https://www.auraherbal.in/wp-content/uploads/2021/12/1.jpg',
        service_id: 4,
        name: 'Aura Herbal',
        description: 'Aura Herbal',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Novopac Laboratories',
        service_id: 4,
        image: 'https://media.licdn.com/dms/image/C4D22AQHVLhK12R95GA/feedshare-shrink_800/0/1642610185056?e=2147483647&v=beta&t=acjNNuNQ5RB1n2bRVStzKE7g79A5gRZ6VT53KrMZX4M',
        description: 'Novopac Laboratories',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Eyelash Manufacturer',
        service_id: 4,
        image: 'https://media.istockphoto.com/id/1191843386/photo/beautiful-young-woman-with-long-eyelashes-beautiful-fresh-nude-make-up-thick-eyebrows-and.jpg?s=1024x1024&w=is&k=20&c=-has_1webfOAZYZCojRV9DCRqi0E8Kn2Uv5MSFN8Cn8=',
        description: ' Eyelash Manufacturer ',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Mellow Massage Services',
        service_id: 4,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ69UusND4J1vvyiEaTAzxSdVh5lhZ3FTzu1gHtNsnDxg&s',
        description: 'Mellow Massage Services',
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
      await queryInterface.bulkDelete('manufactures', null, {});
  }
};
