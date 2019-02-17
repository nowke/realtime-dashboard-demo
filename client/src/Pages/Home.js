import React, { Component } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";

import CpuUsage from "../components/CpuUsage";
import Header from "../components/Header";
import Traffic from "../components/Traffic";
import Distribution from "../components/Distribution";
import Messages from "../components/Messages";

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
              <div
                style={{
                  width: "100%",
                  background: "#3498db",
                  color: "#fff",
                  height: 35,
                  textAlign: "center",
                  fontSize: "1.3em",
                  padding: 4
                }}
              >
                Avg CPU Usage
              </div>
            </Col>
            <Col span={12}>
              <Traffic />
              <div
                style={{
                  width: "100%",
                  background: "#3498db",
                  color: "#fff",
                  height: 35,
                  textAlign: "center",
                  fontSize: "1.3em",
                  padding: 4
                }}
              >
                Traffic heartbeat
              </div>
            </Col>
            <Col span={6}>
              <Distribution />
              <div
                style={{
                  width: "100%",
                  background: "#3498db",
                  color: "#fff",
                  height: 35,
                  textAlign: "center",
                  fontSize: "1.3em",
                  padding: 4
                }}
              >
                Traffic Distribution
              </div>
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
