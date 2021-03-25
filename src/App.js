import "./App.css";
import React, { PureComponent } from "react";
import rawData from "./rawData";
import Example from "./Example";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      keysArray: [],
      dataForGraph: [],
    };
  }
  getTheKeys = (rawData) => {
    return rawData.map((obj) => obj.name);
  };

  colors = [
    "#C0392B",
    "#E74C3C",
    "#9B59B6",
    "#2980B9",
    "#27AE60",
    "#F1C40F",
    "#E67E22",
    "#D35400",
    "#34495E",
  ];

  getRandomColor = () => {
    const random = Math.floor(Math.random() * this.colors.length);
    return this.colors[random];
  };

  componentDidMount() {
    const keysArray = this.getTheKeys(rawData);
    const dataForGraph =
      rawData[0] &&
      rawData[0]["monthLabels"].map((month, index) => {
        let data = { Month: month };
        keysArray.forEach((key, i) => {
          data[key] =
            rawData[i] &&
            rawData[i].enrollments &&
            rawData[i].enrollments[index];
        });
        return data;
      });
    this.setState(
      {
        keysArray,
        dataForGraph,
      },
      () => {
        console.log(`dataForGraph`, this.state.dataForGraph);
        console.log(`keysArray`, this.state.keysArray);
      }
    );
  }
  render() {
    return (
      <LineChart
        width={730}
        height={250}
        data={this.state.dataForGraph}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Month" />
        <YAxis />
        <Tooltip />
        <Legend />
        {this.state.keysArray.map((item) => {
          return (
            <Line
              type="monotone"
              dataKey={item}
              stroke={this.getRandomColor()}
            />
          );
        })}
      </LineChart>
    );
  }
}
