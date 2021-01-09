const mongoose = require('mongoose');
const cities =  require("./cities")
const Campground = require('../models/campground');
const {places, descriptors} = require("./seedHelpers")
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

const sample = (array) => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
    await Campground.deleteMany({})
    
    for (let i = 0; i < 500; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({   
            author: "5ff6e6710df65195cf51e5ea",
            location: `${ cities[random1000].city }, ${cities[random1000].state}`,
            title: `${ sample( descriptors ) } ${ sample( places ) }`,
            images: [
                {
                    url: 'https://res.cloudinary.com/sellebr8tn/image/upload/v1610096108/YelpCamp/mrrwufyphmmkzviu3zv4.jpg',
                    filename: 'YelpCamp/gbxfrerjwksjxjdyjsue'
                },
                {
                    url: 'https://res.cloudinary.com/sellebr8tn/image/upload/v1610096104/YelpCamp/gbxfrerjwksjxjdyjsue.jpg',
                    filename: 'YelpCamp/mrrwufyphmmkzviu3zv4'
                }
              ],
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio, pariatur soluta voluptate rem cumque in tenetur perferendis quo labore vero nisi harum et. Asperiores dolorum, minima placeat perspiciatis officia assumenda.",
            price,
            geometry: { 
                type: 'Point', 
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude 
                ] 
            }
        });
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
}) 