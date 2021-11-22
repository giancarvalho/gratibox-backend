import supertest from 'supertest';
import '../src/setup';
import pool from '../src/database';
import { createFakeUser } from './factories/userFactory';
import app from '../src/app';
import cleanDB from '../src/queries/cleanDB';
import insertUserDB from '../src/queries/users/insertUserDB';
import createFakeToken from './factories/tokenFactory';
import insertTokenDB from '../src/queries/sessions/insertTokenDB';
import getStatesDB from '../src/queries/addresses/getStatesDB';
import createFakeAddress from './factories/addressFactory';
import getOptionsDB from '../src/queries/plans/getOptionsDB';
import getRandomPlan from './factories/planFactory';
import chooseRandom from './factories/randomNumberFactory';
import insertUserPlanDB from '../src/queries/plans/insertUserPlanDB';
import insertOptionsUserPlanDB from '../src/queries/plans/insertOptionsUserPlanDB';
import insertAddressDB from '../src/queries/addresses/insertAddressDB';

describe('POST /sign-up', () => {
  const userToken = createFakeToken();

  beforeAll(async () => {
    const user = createFakeUser();
    const userId = await insertUserDB(user);
    await insertTokenDB(userId, userToken);

    const addressData = createFakeAddress();
    const planDetails = await getRandomPlan();
    const states = await getStatesDB();
    const options = (await getOptionsDB()).map((option) => option.id);

    addressData.stateId = chooseRandom(states).id;

    const userPlanId = await insertUserPlanDB(userId, planDetails);
    await insertOptionsUserPlanDB(userPlanId, options);
    await insertAddressDB(userPlanId, addressData);
  });

  afterAll(async () => {
    await cleanDB();
    pool.end();
  });

  it('should return an object with the subscription data', async () => {
    const result = await supertest(app)
      .get('/subscription')
      .set('Authorization', `Bearer ${userToken}`);

    expect(result.body).toHaveProperty('timestamp', 'day', 'name');
  });
});
