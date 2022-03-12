const mongoose = require('mongoose');
const config = require("./config");
const Category = require("./models/Category");
const Product = require("./models/Product");
const User = require("./models/User");


const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [computers, cars, others] = await Category.create({
        title: 'Computers',
    }, {
        title: 'Cars',
    }, {
        title: 'Others',
    });

    const [john, jane, tugol] = await User.create({
        email: 'john@test.com',
        password: '123',
        displayName: "John",
        phoneNumber: "+996 777 888 999",
        token: '123123123'
    }, {
        email: 'jane@test.com',
        password: '123',
        displayName: "Jane",
        phoneNumber: "+996 555 666 777",
        token: '456456456'
    }, {
        email: 'tugol@test.com',
        password: '321',
        displayName: "Tugolbai",
        phoneNumber: "+996 500 662 822",
        token: '789789789'
    });

    await Product.create({
        category: computers,
        user: jane,
        title: 'Планшет Microsoft Surface Pro 8PV-00017',
        price: 277434,
        description: 'Intel Core i7-1185G7 (3.00-4.80GHz), 16GB DDR4, 256GB SSD, Intel Iris Xe Graphics G7, 13"UHD (2880x1920) 120Hz Touch, WiFi ax, BT 5.1, Win 11 Home, Signature Ke в Бишкеке по лучшим ценам',
        image: 'cpu.jpg'
    }, {
        category: cars,
        user: tugol,
        title: 'BMW iX xDrive50',
        price: 100000,
        description: 'Базовая комплектация BMW iX может похвастаться очень широким спектром систем помощи водителю: Ассистент вождения Professional предлагает оптимальный комфорт и безопасность в критических или неизменных дорожных ситуациях. Кроме содержимого пакета Ассистента вождения также предлагаются Ассистент рулевого управления и контроля полосы движения с расширенными функциями, Ассистент смены полосы движения и аварийной остановки, а также Ассистент удержания полосы движения с активной защитой от боковых столкновений. Ассистент парковки Plus помогает при парковке и маневрировании и использует большое количество камер для полного отображения объектов, окружающих ваш автомобиль, в том числе в 3D.',
        image: 'bmw.jpg'
    }, {
        category: others,
        user: john,
        title: 'Бритва Philips S-5587/10',
        price: 10990,
        description: 'Бренд: Philips, Тип аккумулятора: Li-Ion',
        image: 'philips.jpg'
    });

    await mongoose.connection.close();
};

run().catch(e => console.error(e));