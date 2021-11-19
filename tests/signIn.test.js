import supertest from 'supertest';
import '../src/setup';
import pool from '../src/database';
import { createFakeUser } from './factories/userFactory';
import app from '../src/app';
import cleanDB from '../src/queries/cleanDB';
import insertUserDB from '../src/queries/users/insertUserDB';
import faker from 'faker';

describe('POST /sign-up', () => {
  const user = createFakeUser();
  const wrongPassUser = createFakeUser();

  beforeAll(async () => {
    await insertUserDB(user);
    await insertUserDB(wrongPassUser);
  });

  afterAll(async () => {
    await cleanDB();
    pool.end();
  });

  it('should return 404 user is not registered', async () => {
    const unregisteredUser = createFakeUser();

    const result = await supertest(app).post('/sign-in').send(unregisteredUser);

    expect(result.status).toEqual(404);
  });

  it('should return 401 if password is wrong', async () => {
    wrongPassUser.password = faker.internet.password();

    const result = await supertest(app).post('/sign-in').send(wrongPassUser);

    expect(result.status).toEqual(401);
  });

  it('should return a token if user is registered and credentials are valid', async () => {
    const result = await supertest(app).post('/sign-in').send(user);

    expect(result.body.token).toMatch(
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    );
  });
});
