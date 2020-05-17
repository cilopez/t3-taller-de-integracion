import React, { Component } from "react";
import Table from 'react-bootstrap/Table';
import { getTickers } from "../utils/utils";

export default class StockTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: [],
      tickers: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    const { tickers} = this.state;
    let keyb= null;
    let value = null;
    const element = nextProps.data[nextProps.data.length -1];    
    Object.keys(element).forEach(function (key) {
      if (key !== "time") {
        keyb = key;
        value = element[key];
      }
    })
    if(keyb in tickers){
      this.setState({tickers: {...tickers, [keyb]: [...tickers[keyb], value]}})
    } else {
      this.setState({tickers: {...tickers, [keyb]: [value]}})

    }
  }

  render() {
    const {data, stocks} = this.props;
    const {tickers} = this.state;
    return (
        <Table bordered>
          <thead>
          <tr>
            <th>Ticker</th>
            <th>Maximo</th>
            <th>Minimo</th>
            <th>Último</th>
            <th>Variación</th>
          </tr>
        </thead>
        <tbody>
        {
        Object.keys(tickers).map((e) =>
        <tr>
          <th>{`${e}`}</th>
          <th>{`${Math.max(...tickers[e])}`}</th>
          <th>{`${Math.min(...tickers[e])}`}</th>
          <th>{`${tickers[e][tickers[e].length-1]}`}</th>
          <th>{tickers[e].length > 1 ? `${Math.round(100*(tickers[e][tickers[e].length-1] - tickers[e][tickers[e].length-2])/tickers[e][tickers[e].length-2])}%` : null}</th>
        </tr>
         )
        }
        </tbody>
        </Table>
    );
  }
}