import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const QUERY = gql`
  query CPU {
    cpu {
      percentage
    }
  }
`;

const SUBSCRIPTION = gql`
  subscription CPU {
    cpu {
      percentage
    }
  }
`;

class CpuUsage extends Component {
  componentDidMount() {
    this.props.subscribeToNewData();
  }

  render() {
    const { data, error, loading } = this.props;
    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>Error!</p>;
    }
    return <p>CPU Usage: {data.cpu.percentage}%</p>;
  }
}

export default class CpuUsageContainer extends Component {
  render() {
    return (
      <div>
        <Query query={QUERY}>
          {({ subscribeToMore, ...result }) => (
            <CpuUsage
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
