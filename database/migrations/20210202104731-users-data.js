module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('users', [
            {
                id: 1,
                name: 'Khrystyna',
                email: 'kric29_95@i.ua',
                password: '29031995kric',
                phone: '+380674807020'
            },
            {
                id: 2,
                name: 'Ira',
                email: 'ira30@i.ua',
                password: '12345678ira',
                phone: '+380675366344'
            }
        ]);
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete('users', null, {});
    }
};
