import mongoose from "mongoose";
import customerModel, { ICustomer } from "../models/customerModel";
import productModel, { IProduct } from "../models/productModel";
import storeModel, { IStore } from "../models/storeModel";
import userModel, { IUser } from "../models/userModel";
import { faker } from "@faker-js/faker";

export const seeder = async () => {
	console.log("Seeding Database...");

	await userModel.deleteMany({});
	await storeModel.deleteMany({});
	await customerModel.deleteMany({});
	await productModel.deleteMany({});

	for (let i = 0; i < 15; i++) {
		const role = Math.random() > 0.9 ? "store" : "customer";
		const user = new userModel({
			email: faker.internet.email(),
			password: faker.internet.password(),
			firstName: faker.name.firstName(),
			lastName: faker.name.firstName(),
			role,
		});

		await user.save();
		if (user.role === "store") {
			const store = new storeModel({
				name: faker.company.name(),
				avatar: faker.image.avatar(),
				description: faker.lorem.paragraph(),
				user_id: user._id,
			});

			await store.save();

			for (let j = 0; j < 10; j++) {
				const product = new productModel({
					name: faker.commerce.productName(),
					store_id: store._id,
					price: faker.commerce.price(),
					category: faker.commerce.department(),
					photos: {
						main: faker.image.avatar(),
						front: faker.image.avatar(),
						back: faker.image.avatar(),
						leftSide: faker.image.avatar(),
						rightSide: faker.image.avatar(),
					},
				});

				await product.save();
			}
		} else {
			const customer = new customerModel({
				username: faker.internet.userName(),
				user_id: user._id,
				avatar: faker.image.avatar(),
				description: faker.lorem.paragraph(),
			});

			await customer.save();
		}
	}
	console.log("Seeding Completed.");
};

// export const seedDB = async () => {
// 	await mongoose.connect("mongodb://localhost:27017/ukay");
// 	userModel.deleteMany({});
// 	seedUser().then(async (users) => {
// 		await customerModel.deleteMany({});
// 		await seedCustomers(users);

// 		await storeModel.deleteMany({});
// 		await seedStores(users).then();
// 	});
// 	await mongoose.connection.close();
// };

// export const seedUser = async () => {
// 	const role = Math.random() > 0.9 ? "store" : "customer";
// 	const users: IUser[] = [];
// 	userData.forEach(async (user) => {
// 		const newUser = new userModel({
// 			...user,
// 			role,
// 		});
// 		await newUser.save();
// 		users.push(newUser);
// 	});

// 	return users;
// };

// export const seedStores = async (users: IUser[]) => {
// 	const stores: IStore[] = [];
// 	users.forEach(async (user, idx) => {
// 		if (user.role === "store") {
// 			const newStore = new storeModel({
// 				...storeData[idx],
// 				user_id: user.id,
// 			});
// 			await newStore.save();
// 			stores.push(newStore);
// 		}
// 	});

// 	return stores;
// };

// export const seedCustomers = async (users: IUser[]) => {
// 	const customers: ICustomer[] = [];
// 	users.forEach(async (user, idx) => {
// 		if (user.role === "customer") {
// 			const newCustomer = new customerModel({
// 				...customerData[idx],
// 				user_id: user.id,
// 			});
// 			await newCustomer.save();
// 			customers.push(newCustomer);
// 		}
// 	});

// 	return customers;
// };

// export const seedProducts = async (stores: IStore[]) => {
// 	const products: IProduct[] = [];
// 	stores.forEach(async (store, idx) => {
// 		const { photos, ...data } = productData[idx];
// 		const newProduct = new productModel({
// 			...data,
// 			store_id: store.id,
// 			photos: { main: photos },
// 		});
// 		await newProduct.save();
// 		products.push(newProduct);
// 	});

// 	return products;
// };
