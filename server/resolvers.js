const pubsub = require("./pubsub");
const {
  cpuData,
  regionData,
  messageData,
  trafficData
} = require("./utils/generator");
const { get, set } = require("./utils/redis");

const COMPONENTS = {
  CPU: "cpu",
  TRAFFIC: "traffic",
  DISTRIBUTION: "distribution",
  MESSAGES: "messages"
};

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
    messages: () => get(COMPONENTS.MESSAGES)
  },
  Mutation: {
    cpu: () => publishRandomData(cpuData, COMPONENTS.CPU),
    traffic: () => publishRandomData(trafficData, COMPONENTS.TRAFFIC),
    distribution: () => publishRandomData(regionData, COMPONENTS.DISTRIBUTION),
    messages: () => publishRandomData(messageData, COMPONENTS.MESSAGES)
  },
  Subscription: {
    cpu: {
      subscribe: () => pubsub.asyncIterator(COMPONENTS.CPU)
    },
    traffic: {
      subscribe: () => pubsub.asyncIterator(COMPONENTS.TRAFFIC)
    },
    distribution: {
      subscribe: () => pubsub.asyncIterator(COMPONENTS.DISTRIBUTION)
    },
    messages: {
      subscribe: () => pubsub.asyncIterator(COMPONENTS.MESSAGES)
    }
  }
};
