import React, { Component } from "react";
import Table from 'react-bootstrap/Table';


export default class StockTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: {},
      tickers: {},
      exchanges:{},
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

  componentDidMount(){
    const {socket} = this.props;
    const dict = {};
    socket.emit("STOCKS");
    socket.once("STOCKS", (data) => {
      data.map(e => dict[e.ticker]= {'country': e.country, 'name': e.company_name} );
      this.setState({stocks: dict});
    });

  }

  render() {
    const {data} = this.props;
    const {tickers, stocks} = this.state;
    return (
        <Table  striped bordered hover >
          <thead>
          <tr>
            <th>Ticker</th>
            <th>Nombre</th>
            <th>Pais</th>
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
          <th>{e in stocks ? `${stocks[e].name.substring(0,15)}` : null}</th>
          <th>{e in stocks ? stocks[e].country : null}</th>
          <th>{`$${Math.max(...tickers[e])}`}</th>
          <th>{`$${Math.min(...tickers[e])}`}</th>
          <th>{`$${tickers[e][tickers[e].length-1]}`}</th>
          <th>{tickers[e].length > 1 ? `${Math.round(100*(tickers[e][tickers[e].length-1] - tickers[e][tickers[e].length-2])/tickers[e][tickers[e].length-2])}%` : null}</th>
        </tr>
         )
        }
        </tbody>
        </Table>
    );
  }
}