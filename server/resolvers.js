const pubsub = require("./pubsub");
const {
  cpuData,
  regionData,
  messageData,
  trafficData,
} = require("./utils/generator");
const { get, set } = require("./utils/redis");

const COMPONENTS = {
  CPU: "cpu",
  TRAFFIC: "traffic",
  DISTRIBUTION: "distribution",
  MESSAGES: "messages",
};

/**
 * (1) Get random data for `component` by calling `generator` function
 * (2) Publish the data to channel for `component`
 * (3) Cache the data in redis against key `component`
 *
 * @param {function} generator - Corresponding data generator function for `component`
 * @param {string} component
 */
const publishRandomData = async (generator, component) => {
  const data = generator();
  pubsub.publish(component, { [component]: data });
  await set(component, data);
  return data;
};

module.exports = {
  Query: {
    cpu: () => get(COMPONENTS.CPU),
    traffic: () => get(COMPONENTS.TRAFFIC),
    distribution: () => get(COMPONENTS.DISTRIBUTION),
    messages: () => get(COMPONENTS.MESSAGES),
  },
  Mutation: {
    cpu: () => publishRandomData(cpuData, COMPONENTS.CPU),
    traffic: () => publishRandomData(trafficData, COMPONENTS.TRAFFIC),
    distribution: () => publishRandomData(regionData, COMPONENTS.DISTRIBUTION),
    messages: () => publishRandomData(messageData, COMPONENTS.MESSAGES),
  },
  Subscription: {
    cpu: {
      subscribe: () => pubsub.asyncIterator(COMPONENTS.CPU),
    },
    traffic: {
      subscribe: () => pubsub.asyncIterator(COMPONENTS.TRAFFIC),
    },
    distribution: {
      subscribe: () => pubsub.asyncIterator(COMPONENTS.DISTRIBUTION),
    },
    messages: {
      subscribe: () => pubsub.asyncIterator(COMPONENTS.MESSAGES),
    },
  },
};
