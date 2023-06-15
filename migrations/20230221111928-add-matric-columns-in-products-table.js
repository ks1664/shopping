'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {

    /**    
     * Add altering commands here.  
     *
     *  Example:   
     *  await queryInterface.createTable('users', { id: Sequelize.INTEGER }); 
     */
    return Promise.all([
      queryInterface.addColumn(
      'products', // table name 
      'length', // new field name 
      {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
        after: "name"
      }),
      
    queryInterface.addColumn(
      'products', // table name
      'weight', // new field name
      {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
        after: "length"
      }),

      queryInterface.addColumn(
        'products', // table name
        'height', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
          after: "weight"
        }),

        queryInterface.addColumn(
          'products', // table name
          'breadth', // new field name
          {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: null,
            after: "height"
          }),
    ]);
  },
  async down(queryInterface, Sequelize) {
    /**  
     * 
    * Add reverting commands here. 
   *   
 * Example:   
 * await queryInterface.dropTable('users'); 
   */
  }
};
