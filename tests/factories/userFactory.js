import faker from 'faker';

function createFakeUser() {
  const userData = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  return userData;
}

function createInvalidFakeUser() {
  const invalidUserData = {
    name: faker.commerce.price(),
    email: faker.lorem.words(),
    password: faker.lorem.paragraph(),
  };

  return invalidUserData;
}

export { createFakeUser, createInvalidFakeUser };
