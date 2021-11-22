import faker from 'faker';

function createFakeToken() {
  return faker.datatype.uuid();
}

export default createFakeToken;
