import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { VictoryPie, VictoryContainer } from "victory";

import Loading from "./Loading";

const QUERY = gql`
  query Distribution {
    distribution {
      region
      percentage
    }
  }
`;

const SUBSCRIPTION = gql`
  subscription Distribution {
    distribution {
      region
      percentage
    }
  }
`;

class Distribution extends Component {
  componentDidMount() {
    this.props.subscribeToNewData();
  }

  render() {
    const { data, error, loading } = this.props;
    if (loading) {
      return <Loading />;
    }
    if (error) {
      return <p>Error!</p>;
    }
    return (
      <VictoryPie
        standalone={true}
        animate={{ duration: 500 }}
        height={300}
        data={data.distribution || []}
        colorScale={["#2c3e50", "#95a5a6" ]}
        containerComponent={<VictoryContainer responsive={true} />}
        x="region"
        y="percentage"
      />
    );
  }
}

export default class DistributionContainer extends Component {
  render() {
    return (
      <div style={{ border: "1px solid #2c3e50", height: 300 }}>
        <Query query={QUERY}>
          {({ subscribeToMore, ...result }) => (
            <Distribution
              {...result}
              subscribeToNewData={() =>
                subscribeToMore({
                  document: SUBSCRIPTION,
                  updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    return subscriptionData.data;
                  }
                })
              }
            />
          )}
        </Query>
      </div>
    );
  }
}
