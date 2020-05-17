import React, { Component } from "react";
import { createColors } from "../utils/utils";
import { ResponsiveContainer } from "recharts";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";

export default class StockChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: this.props.socket,
      colors: createColors(5),
    };
    this.getTickers = this.getTickers.bind(this);
  }

  getTickers(data){
    const tickers = [];
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        Object.keys(element).forEach(function(key) {
            if(key !== 'time' && !(tickers.includes(key))){
                tickers.push(key);
            }
         });
    }
    return tickers;
  }
 


  render() {
    const { data } = this.props;
    return (
      <div>
        <h1>StockChart</h1>
        <LineChart width={500} height={300} data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          {this.getTickers(data) ? this.getTickers(data).map((e) => (
            <Line
              type="monotone"
              dataKey={e}
              connectNulls={true}
              stroke= 
            />
          )): null}
        </LineChart>
      </div>
    );
  }
}
