import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { VictoryPie, VictoryLabel } from "victory";

import Loading from "./Loading";

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

  getData(percent) {
    return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
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
      <svg viewBox="0 0 400 400" width="100%">
        <VictoryPie
          standalone={false}
          animate={{ duration: 500 }}
          width={400}
          height={400}
          data={this.getData(data.cpu.percentage)}
          innerRadius={120}
          cornerRadius={25}
          labels={() => null}
          style={{
            data: {
              fill: d => {
                const color = d.y > 60 ? "#d35400" : "#27ae60";
                return d.x === 1 ? color : "transparent";
              }
            }
          }}
        />
        <VictoryLabel
          textAnchor="middle"
          verticalAnchor="middle"
          x={200}
          y={200}
          text={`${Math.round(data.cpu.percentage)}%`}
          style={{ fontSize: 45 }}
        />
      </svg>
    );
  }
}

const CpuUsageContainer = () => (
  <div style={{ border: "1px solid #2c3e50", height: 300 }}>
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

export default CpuUsageContainer;
