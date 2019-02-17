import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { VictoryLine, VictoryContainer } from "victory";

import Loading from "./Loading";

const QUERY = gql`
  query Traffic {
    traffic {
      dps {
        timestamp
        value
      }
      total
    }
  }
`;

const SUBSCRIPTION = gql`
  subscription Traffic {
    traffic {
      dps {
        timestamp
        value
      }
      total
    }
  }
`;

class Traffic extends Component {
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
      <VictoryLine
        standalone={true}
        height={300}
        style={{
          data: { stroke: "#27ae60" },
        }}
        data={data.traffic.dps.map(item => ({
          x: item.timestamp,
          y: item.value
        }))}
        containerComponent={<VictoryContainer responsive={true} />}
      />
    );
  }
}

export default class TrafficContainer extends Component {
  render() {
    return (
      <div style={{ border: "1px solid #2c3e50", height: 300 }}>
        <Query query={QUERY}>
          {({ subscribeToMore, ...result }) => (
            <Traffic
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
