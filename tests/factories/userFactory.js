import faker from 'faker';

function createFakeUser() {
  const userData = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  return userData;
}

export default createFakeUser;
