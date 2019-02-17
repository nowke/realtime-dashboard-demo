const { gql } = require("apollo-server");

const schema = gql`
type Dps {
    timestamp: Int!
    value: Float!
}

type Traffic {
    total: Int!
    dps: [Dps]
}

type CPU {
    percentage: Float!
}

type Distribution {
    region: String!
    percentage: Float!
}

type Message {
    title: String!
    description: String!
    color: String!
}

type Query {
    cpu: CPU
    traffic: Traffic
    distribution: [Distribution]
    messages: [Message]
}

type Mutation {
    addCPU(percentage: Float): CPU
}

type Subscription {
    subCPU: CPU
}
`;

module.exports = schema;
