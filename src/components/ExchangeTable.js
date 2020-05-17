import React, { Component } from "react";
import Table from 'react-bootstrap/Table';

export default class ExchangeTable extends Component {
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
    socket.emit("EXCHANGES");
    socket.once("EXCHANGES", (data) => {
      this.setState({exchanges: data});
    });

  }

  render() {
    const {tickers, stocks, exchanges} = this.state;
    console.log(exchanges);
    return (
        <Table  striped bordered hover style={{fontSize: '14px'}}>
          <thead>
          <tr>
            <th>Exchange Ticker</th>
            <th>Nombre</th>
            <th>Pais</th>
            <th># Acciones</th>
            <th>VV</th>
            <th>VC</th>
            <th>VT</th>
            <th>Participacion</th>
          </tr>
        </thead>
        <tbody>
        {
        Object.keys(exchanges).map((e) =>
        <tr>
          <th>{e}</th>
          <th>{exchanges[e].name}</th>
          <th>{exchanges[e].country}</th>
          <th>{exchanges[e].listed_companies.length}</th>
        </tr>
         )
        }
        </tbody>
        </Table>
    );
  }
}