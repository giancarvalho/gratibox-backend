import supertest from 'supertest';
import '../src/setup';
import pool from '../src/database';
import { createFakeUser, createInvalidFakeUser } from './factories/userFactory';
import app from '../src/app';
import cleanDB from '../src/queries/cleanDB';
import insertUserDB from '../src/queries/users/insertUserDB';

describe('POST /sign-up', () => {
  let existingUser = createFakeUser();

  beforeAll(async () => {
    await insertUserDB(existingUser);
  });

  afterAll(async () => {
    await cleanDB();
    pool.end();
  });

  it('Should return a 400 status if body is invalid', async () => {
    const invalidUserData = createInvalidFakeUser();

    const result = await supertest(app).post('/sign-up').send(invalidUserData);

    expect(result.status).toEqual(400);
  });

  it('should return 409 if email is already registered', async () => {
    const result = await supertest(app).post('/sign-up').send(existingUser);

    expect(result.status).toEqual(409);
  });

  it('should return 201 userData is valid', async () => {
    const newUserData = createFakeUser();

    const result = await supertest(app).post('/sign-up').send(newUserData);

    expect(result.status).toEqual(201);
  });
});
