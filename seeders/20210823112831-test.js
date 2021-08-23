'use strict';

// up => "seed를 생성할 때 수행"
// down => "seed를 되돌릴 때 수행"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let datas = [];

    for (let i = 0; i< 10; i++) {
      let obj = {
        email: "test" + i + "@example.com",
        name: "testUser" + i,
        password: "1234",
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      }
      datas.push(obj)
    }
    return queryInterface.bulkInsert('users', datas, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
