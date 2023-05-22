// import mockModel from "../models/Mock.js";
// import { faker } from "@faker-js/faker"

// export const productRandom = async (products) =>{
//     try {
//         const result = await mockModel.insertMany(products)
//         return result
//     } catch (error) {
//         return error
//     }
// }


// import { faker } from '@faker-js/faker';
// // import { faker } from '@faker-js/faker/locale/de';

// const users = []

// const createRandomUser = () => {
//     return {
//         userId: faker.datatype.uuid(),
//         username: faker.internet.userName(),
//         email: faker.internet.email(),
//         avatar: faker.image.avatar(),
//         img: faker.image.food(),
//         password: faker.internet.password(),
//         birthdate: faker.date.birthdate(),
//         registeredAt: faker.date.past(),
//     };
// }

// for (let i = 0; i < 100; i++) {
//     users.push(createRandomUser());
// }

// console.log(users)