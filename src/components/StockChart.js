import React, { Component } from "react";
import { getRandomColor, getTickers } from "../utils/utils";
import moment from "moment";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default class StockChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: this.props.socket,
      tickers: [],
      lines: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    const { tickers, lines } = this.state;
    const nextTickers = getTickers(nextProps.data);
    if (tickers === [] || nextTickers.length !== tickers.length) {
      this.setState({
        tickers: nextTickers,
        lines: [
          ...lines,
          <Line
            type="monotone"
            dataKey={nextTickers[nextTickers.length - 1]}
            connectNulls={true}
            animationDuration={1000}
            key={nextTickers[nextTickers.length - 1]}
            stroke={getRandomColor()}
          />,
        ],
      });
    }
  }

  render() {
    const { data } = this.props;
    const { tickers, lines } = this.state;
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 100,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis
            dataKey="time"
            domain={["auto", "auto"]}
            name="Time"
            tickFormatter={(unixTime) => moment(unixTime).format("HH:mm:ss Do")}
            type="number"
          />
          <YAxis
            label={{ value: "Valor ($USD)", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            labelFormatter={(unixTime) =>
              moment(unixTime).format("HH:mm:ss Do")
            }
          />
          <Legend />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          {tickers ? lines : null}
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
