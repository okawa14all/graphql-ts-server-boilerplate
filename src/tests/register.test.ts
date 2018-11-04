import { request } from 'graphql-request';

const host = 'http://localhost:4000';

const email = 'bob@bob.com';
const password = 'fefefefe';

const mutation = `
mutation {
  register(email: "${email}", password: "${password}")
}
`;

test('Register user', async () => {
  const response = await request(host, mutation);
  expect(response).toEqual({ register: true });
});
