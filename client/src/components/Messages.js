import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Col from "antd/lib/col";

import Loading from "./Loading";

const QUERY = gql`
  query Traffic {
    messages {
      title
      description
      color
    }
  }
`;

const SUBSCRIPTION = gql`
  subscription Traffic {
    messages {
      title
      description
      color
    }
  }
`;

class Message extends Component {
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
    const messages = data.messages || [];
    return (
      <React.Fragment>
        {messages.map(message => (
          <Col span={6} key={message.title}>
            <div
              style={{ border: `1px solid ${message.color}`, height: "100%" }}
            >
              <div
                style={{ background: message.color, padding: 5, color: "#fff" }}
              >
                <strong>{message.title}</strong>
              </div>
              <div style={{ padding: 5 }}>{message.description}</div>
            </div>
          </Col>
        ))}
      </React.Fragment>
    );
  }
}

export default class MessageContainer extends Component {
  render() {
    return (
      <Query query={QUERY}>
        {({ subscribeToMore, ...result }) => (
          <Message
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
    );
  }
}
