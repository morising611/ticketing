import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';

declare global {
  var signin: () => Promise<string[]>;
}

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = 'asdf';

  const mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  await mongoose.connect(uri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db?.collections();

  if (!collections) {
    throw new Error('No collections');
  }

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

global.signin = async () => {
  const email = 'test@test.com';
  const password = 'test@test.com';

  const response = await request(app)
    .post('/api/users/signup')
    .send({ email: email, password: password })
    .expect(201);

  const cookie = response.get('Set-Cookie');

  if (!cookie) {
    throw new Error('No cookie');
  }

  return cookie;
};
