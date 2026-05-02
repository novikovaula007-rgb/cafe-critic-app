import mongoose from 'mongoose';
import config from '../config';
import User from '../models/user/User';
import { Place } from '../models/place/Place';
import { Review } from '../models/review/Review';

const run = async () => {
  await mongoose.connect(config.db);

  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('images');
    await db.dropCollection('reviews');
    await db.dropCollection('places');
  } catch (error) {
    console.error(error);
  }

  const usersList = [
    {
      email: 'admin@test.com',
      password: 'password',
      displayName: 'Main Admin',
      role: 'admin',
    },
    {
      email: 'john@test.com',
      password: 'password',
      displayName: 'John Doe',
      role: 'user',
    },
    {
      email: 'jane@test.com',
      password: 'password',
      displayName: 'Jane Smith',
      role: 'user',
    },
    {
      email: 'mike@test.com',
      password: 'password',
      displayName: 'Mike Iron',
      role: 'user',
    },
    {
      email: 'lisa@test.com',
      password: 'password',
      displayName: 'Lisa Ray',
      role: 'user',
    },
  ];

  const createdUsers = [];

  for (const userData of usersList) {
    const user = new User(userData);
    user.generateRefreshToken();

    await user.save();
    createdUsers.push(user);
  }

  const [admin, user1, user2, user3, user4] = createdUsers;

  const places = await Place.create([
    {
      title: 'Kulikov',
      description: 'A legendary confectionery house known for its uncompromising commitment to quality. Every dessert is a masterpiece, crafted using natural ingredients and traditional recipes. From signature cakes to delicate pastries, we offer a leader in the production of safe, healthy, and incredibly delicious treats for the whole family.',
      mainPhoto: '/fixtures/kulikov_main.jpg',
      user: admin!._id,
    },
    {
      title: 'Pizza Queen',
      description: 'Experience the soul of Italian street food right in the heart of the city. We specialize in authentic, wood-fired pizzas with a thin, crispy crust and premium toppings. Whether you are looking for a quick lunch or a cozy spot to hang out with friends, Pizza Queen delivers the ultimate urban dining vibe and bold flavors.',
      mainPhoto: '/fixtures/pizza_main.jpg',
      user: user1!._id,
    },
    {
      title: 'Tokyo Zen',
      description: 'Immerse yourself in an atmosphere of tranquility and refined taste. Tokyo Zen offers a premium Japanese dining experience, featuring expertly prepared sushi, fresh sashimi, and innovative rolls. Our chefs use only the finest seafood, ensuring that every bite reflects the harmony and precision of traditional Japanese culinary arts.',
      mainPhoto: '/fixtures/sushi_main.jpg',
      user: user2!._id,
    },
  ]);

  await Review.create([
    {
      place: places[0]!._id,
      author: user1!._id,
      qualityOfFood: 5,
      serviceQuality: 5,
      interior: 5,
      comment: 'Best cappuccino in the city! The barista is a pro.',
    },
    {
      place: places[0]!._id,
      author: user2!._id,
      qualityOfFood: 5,
      serviceQuality: 4,
      interior: 5,
      comment: 'Love the minimalist design. Great for working on a laptop.',
    },
    {
      place: places[0]!._id,
      author: user3!._id,
      qualityOfFood: 4,
      serviceQuality: 5,
      interior: 4,
      comment: 'Consistent quality. A bit crowded on weekends though.',
    },
    {
      place: places[1]!._id,
      author: user1!._id,
      qualityOfFood: 5,
      serviceQuality: 2,
      interior: 3,
      comment:
        'The burger was juicy, but I waited 40 minutes for it. Terrible service.',
    },
    {
      place: places[1]!._id,
      author: user2!._id,
      qualityOfFood: 3,
      serviceQuality: 3,
      interior: 4,
      comment: 'Average burgers. The music is way too loud.',
    },
    {
      place: places[1]!._id,
      author: user4!._id,
      qualityOfFood: 4,
      serviceQuality: 4,
      interior: 3,
      comment: 'Solid street food. Try the loaded fries.',
    },
    {
      place: places[1]!._id,
      author: user3!._id,
      qualityOfFood: 2,
      serviceQuality: 1,
      interior: 2,
      comment:
        'The table was sticky and the staff ignored me. Never coming back.',
    },
    {
      place: places[2]!._id,
      author: user2!._id,
      qualityOfFood: 2,
      serviceQuality: 2,
      interior: 5,
      comment: 'Beautiful restaurant, but the sushi was definitely not fresh.',
    },
    {
      place: places[2]!._id,
      author: user4!._id,
      qualityOfFood: 1,
      serviceQuality: 3,
      interior: 5,
      comment:
        'Form over function. Looks great on Instagram, tastes like nothing.',
    },
    {
      place: places[2]!._id,
      author: user1!._id,
      qualityOfFood: 2,
      serviceQuality: 1,
      interior: 4,
      comment: 'Waited forever. The waiter forgot our drinks twice.',
    },
  ]);

  await mongoose.disconnect();
};

run().catch((error) => console.error(error));
