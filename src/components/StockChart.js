import React, { Component } from "react";
import {getRandomColor } from "../utils/utils";
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
      tickers: [],
      lines: [],
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

  componentWillReceiveProps(nextProps){
      const {tickers, lines} = this.state;
      const nextTickers = this.getTickers(nextProps.data);
    //   console.log(tickers);
    //   console.log(nextTickers);
      if(tickers === [] || nextTickers.length !==  tickers.length){
        console.log(nextTickers[nextTickers.length - 1]);
        this.setState({tickers: nextTickers, lines: [...lines,
        <Line
            type="monotone"
            dataKey={nextTickers[nextTickers.length - 1]}
            connectNulls={true}
            stroke={getRandomColor()}
          />]});
      } 
  }
 
  render() {
    const { data } = this.props;
    const { tickers, lines} = this.state;
    return (
      <div>
        <h1>StockChart</h1>
        <LineChart width={500} height={300} data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          {tickers ? lines : null}
        </LineChart>
      </div>
    );
  }
}
