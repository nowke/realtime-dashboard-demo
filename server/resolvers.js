const pubsub = require("./pubsub");

const addCPU = args => {
  const { percentage } = args;
  pubsub.publish("subCPU", { subCPU: { percentage } });
  return { percentage };
};

module.exports = {
  Query: {
    cpu: () => ({ percentage: 50 }),
    traffic: () => ({}),
    distribution: () => [],
    messages: () => []
  },
  Mutation: {
    addCPU: (root, args) => addCPU(args)
  },
  Subscription: {
    subCPU: {
      subscribe: () => pubsub.asyncIterator("subCPU")
    }
  }
};
