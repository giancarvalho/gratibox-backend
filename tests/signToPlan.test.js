import supertest from 'supertest';
import '../src/setup';
import pool from '../src/database';
import { createFakeUser } from './factories/userFactory';
import app from '../src/app';
import cleanDB from '../src/queries/cleanDB';
import insertUserDB from '../src/queries/users/insertUserDB';
import createFakeToken from './factories/tokenFactory';
import insertTokenDB from '../src/queries/sessions/insertTokenDB';
import getPlansDB from '../src/queries/plans/getPlansDB';
import createRandomNumber from './factories/randomNumberFactory';
import getStatesDB from '../src/queries/addresses/getStatesDB';
import createFakeAddress from './factories/addressFactory';
import getOptionsDB from '../src/queries/plans/getOptionsDB';
import getRandomPlan from './factories/planFactory';
import chooseRandom from './factories/randomNumberFactory';

describe('POST /sign-up', () => {
  let planData;
  const userToken = createFakeToken();

  beforeAll(async () => {
    const user = createFakeUser();
    const userId = await insertUserDB(user);
    await insertTokenDB(userId, userToken);

    const addressData = createFakeAddress();
    const planDetails = await getRandomPlan();
    const states = await getStatesDB();
    const options = await getOptionsDB();

    addressData.stateId = chooseRandom(states).id;

    planData = { userId, planDetails, addressData, options };
  });

  afterAll(async () => {
    await cleanDB();
    pool.end();
  });

  it('should return 200 if subscription is done successfully', async () => {
    const result = await supertest(app)
      .post('/plans')
      .send(planData)
      .set('Authorization', `Bearer ${userToken}`);

    expect(result.status).toEqual(200);
  });
});
