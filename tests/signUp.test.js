import supertest from 'supertest';
import '../src/setup';
import pool from '../src/database';
import createFakeUser from './factories/userFactory';
import app from '../src/app';

describe('POST /sign-up', () => {
  afterAll(() => {
    pool.end();
  });

  it('should return 201 if newUserData is valid', async () => {
    const newUserData = createFakeUser();

    const result = await supertest(app).post('/sign-up').send(newUserData);

    expect(result.status).toEqual(201);
  });
});
