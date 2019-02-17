import React from "react";
import Spin from "antd/lib/spin";
import Icon from "antd/lib/icon";

const antIcon = <Icon type="loading" style={{ fontSize: 48 }} spin />;

export default () => {
  return <Spin indicator={antIcon} />;
};
