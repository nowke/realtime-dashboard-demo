const { RedisPubSub } = require("graphql-redis-subscriptions");

const pubsub = new RedisPubSub();

module.exports = pubsub;
