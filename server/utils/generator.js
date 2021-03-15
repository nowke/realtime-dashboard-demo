/**
 * Random Data generator
 */
const moment = require("moment");

const cpuData = () => {
  const min = 20;
  const max = 90;

  const percentage = parseInt(Math.random() * (max - min) + min, 10);
  return {
    percentage,
  };
};

const timestamps = Array.from(Array(800).keys())
  .map((num) => ({
    timestamp: 5 * num,
    value: parseInt(Math.random() * 100, 10),
  }))
  .reverse();

const trafficData = () => {
  const currentTime = moment();
  const ts = currentTime.unix();
  const slice = parseInt(
    (currentTime.minute() * 60 + currentTime.second()) / 5,
    10
  );
  const dps = timestamps
    .map((item) => ({
      timestamp: ts - item.timestamp,
      value: item.value,
    }))
    .slice(slice, slice + 60);
  const total = dps.reduce((prev, curr) => prev + curr.value, 0);
  return {
    dps,
    total,
  };
};

const regionData = () => {
  const min = 10;
  const max = 60;

  const region1 = parseInt(Math.random() * (max - min) + min, 10);
  const region2 = 100 - region1;
  return [
    { region: "us-west", percentage: region1 },
    { region: "us-east", percentage: region2 },
  ];
};

const messageData = () => {
  const messages = [
    {
      title: "Server restarted - s1.us-west",
      description: "Something went wrong! Had to reboot",
      color: "#27ae60",
    },
    {
      title: "Service unavailable - web003",
      description: "web003 service down from last 5 minutes, Take action!",
      color: "#f39c12",
    },
    {
      title: "High CPU Utilization - 95% s2.us-east",
      description: "Watch for s2.us-east. CPU is at maximum!",
      color: "#e74c3c",
    },
    {
      title: "High latency - int005",
      description: "Woah! This is unacceptable. Latency has gone nuts.",
      color: "#e74c3c",
    },
  ];
  return messages.slice(0, parseInt(Math.random() * 4 + 1, 10));
};

module.exports = {
  cpuData,
  regionData,
  messageData,
  trafficData,
};
