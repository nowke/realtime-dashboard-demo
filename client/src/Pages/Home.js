import React, { Component } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";

import CpuUsage from "../components/CpuUsage";
import Header from "../components/Header";
import Traffic from "../components/Traffic";
import Distribution from "../components/Distribution";
import Messages from "../components/Messages";

const Label = ({ title }) => (
  <div
    style={{
      width: "100%",
      background: "#2c3e50",
      color: "#fff",
      height: 35,
      textAlign: "center",
      fontSize: "1.3em",
      padding: 4
    }}
  >
    {title}
  </div>
);

export default class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <div style={{ margin: "20px 40px" }}>
          <h2>Dashboard</h2>
          <Row type="flex" gutter={8}>
            <Col span={6}>
              <CpuUsage />
              <Label title="Avg CPU Usage" />
            </Col>
            <Col span={12}>
              <Traffic />
              <Label title="Traffic heartbeat" />
            </Col>
            <Col span={6}>
              <Distribution />
              <Label title="Region Distribution" />
            </Col>
          </Row>
          <br />
          <h2>Alerts</h2>
          <Row type="flex" gutter={8}>
            <Messages />
          </Row>
        </div>
      </div>
    );
  }
}
