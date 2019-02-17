/**
 * Redis utilities
 */
const Redis = require("ioredis");
const redis = new Redis();

const get = async key => {
  try {
    const data = await redis.get(key);
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
};

const set = async (key, data) => {
  try {
    await redis.set(key, JSON.stringify(data));
    return true;
  } catch (e) {
    return false;
  }
};

module.exports = {
  get,
  set
};
