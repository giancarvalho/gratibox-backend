import faker from 'faker';

function createFakeAddress() {
  faker.locale = 'pt_BR';

  const addressData = {
    recipient: faker.name.findName(),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    zipcode: faker.address.zipCode(),
  };

  return addressData;
}

export default createFakeAddress;
