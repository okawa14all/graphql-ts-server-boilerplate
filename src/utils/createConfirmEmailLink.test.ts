import * as Redis from 'ioredis';
import fetch from 'node-fetch';
import { createConfirmEmailLink } from './createConfirmEmailLink';
import { createTypeormConn } from './createTypeormConn';
import { User } from '../entity/User';

let userId = '';

beforeAll(async () => {
  await createTypeormConn();
  const user = await User.create({
    email: 'bob5@bob.com',
    password: 'laskdjflkajdf'
  }).save();
  userId = user.id;
});

describe('test createConfirmEmailLink', () => {
  test('Make sure it confirm user and clears key in redis', async () => {
    const redis = new Redis();
    const url = await createConfirmEmailLink(
      process.env.TEST_HOST as string,
      userId,
      redis
    );

    const response = await fetch(url);
    const text = await response.text();
    expect(text).toEqual('ok');

    const user = await User.findOne({ where: { id: userId } });
    expect((user as User).confirmed).toBeTruthy();

    const chunks = url.split('/');
    const key = chunks[chunks.length - 1];
    const value = await redis.get(key);
    expect(value).toBeNull();
  });

  test('sends invalid back if bad key', async () => {
    const response = await fetch(`${process.env.TEST_HOST}/confirm/1234`);
    const text = await response.text();
    expect(text).toEqual('invalid');
  });
});
