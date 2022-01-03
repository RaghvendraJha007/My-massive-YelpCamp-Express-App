const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '61be0f8ecf6aa2094c4ae265',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed ullam est laborum debitis. Repudiandae alias debitis dolor quibusdam possimus id ipsum, eligendi odit quis quia corporis error accusantium expedita adipisci",

            price,
            geometry: { type: "Point", coordinates: [cities[random1000].longitude,cities[random1000].latitude,] },
            images: [
                {
                    url: 'https://res.cloudinary.com/dvltkx0sk/image/upload/v1640250272/yelpcamp/pi3lli2uelguasy0d8q2.jpg',
                    filename: 'yelpcamp/pi3lli2uelguasy0d8q2'
                },
                {
                    url: 'https://res.cloudinary.com/dvltkx0sk/image/upload/v1640250275/yelpcamp/b1wltyln6skxgsfkhspv.jpg',
                    filename: 'yelpcamp/b1wltyln6skxgsfkhspv'
                },
                {
                    url: 'https://res.cloudinary.com/dvltkx0sk/image/upload/v1640250278/yelpcamp/t7zfknrpr7uchxsbcrxn.jpg',
                    filename: 'yelpcamp/t7zfknrpr7uchxsbcrxn'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})