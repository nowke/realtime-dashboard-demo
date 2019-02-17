import React, { Component } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";

import CpuUsage from "../components/CpuUsage";
import Header from "../components/Header";

export default class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <div style={{ margin: "20px 40px" }}>
          <Row type="flex" gutter={8}>
            <Col span={6}>
              <CpuUsage />
            </Col>
            <Col span={12}>
              <div style={{ border: '1px solid black', height: '100%' }}>
                Graph
              </div>
            </Col>
            <Col span={6}>Pie</Col>
          </Row>
        </div>
      </div>
    );
  }
}
