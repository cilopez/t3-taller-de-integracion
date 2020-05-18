import React, { Component } from "react";
import Table from 'react-bootstrap/Table';

export default class ExchangeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: {},
      tickers: {},
      exchanges:{},
      volumeBuy: [],
      volumeSell:[],
      total:0,
    };
    this.getVolumeBuy = this.getVolumeBuy.bind(this);
    this.getVolumeSell = this.getVolumeSell.bind(this);
    this.getBoughtVolumeValues = this.getBoughtVolumeValues.bind(this);
    this.getSoldVolumeValues = this.getSoldVolumeValues.bind(this);
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

  getBoughtVolumeValues(exchange,value){
    const {exchanges, stocks} = this.state;
    if(exchanges[exchange].listed_companies.includes(stocks[value.ticker].name)){
      return value.volume
    }
    return 0;
  }

  getVolumeBuy(exchange){
    const {volumeBuy} = this.state;
    return volumeBuy.map(e => this.getBoughtVolumeValues(exchange,e)).reduce((a, b) => a + b, 0);
  }

  
  getSoldVolumeValues(exchange,value){
    const {exchanges, stocks} = this.state;
    if(exchanges[exchange].listed_companies.includes(stocks[value.ticker].name)){
      return value.volume
    }
    return 0;
  }

  getVolumeSell(exchange){
    const {volumeSell} = this.state;
    return volumeSell.map(e => this.getSoldVolumeValues(exchange,e)).reduce((a, b) => a + b, 0);
  }



  componentDidMount(){
    let {socket} = this.props;
    const dict = {};
    socket.emit("STOCKS");
    socket.once("STOCKS", (data) => {
      data.map(e => dict[e.ticker]= {'country': e.country, 'name': e.company_name} );
      this.setState({stocks: dict});

    });
    socket.emit("EXCHANGES");
    socket.once("EXCHANGES", (data) => {
      this.setState({exchanges: data});
    });
    socket.on("BUY", (data) => {
      socket = this.props.socket;
      const {volumeBuy, total } = this.state;
      if(socket.connected){
      this.setState({volumeBuy: [...volumeBuy, data]})
      this.setState({total: total + data.volume})
      }
    });
    socket.on("SELL", (data) => {
      const {volumeSell, total } = this.state;
      if(socket.connected){
      this.setState({volumeSell: [...volumeSell, data]});
      this.setState({total: total + data.volume})
      }
    });
  }

  render() {
    const {tickers, stocks, exchanges, total} = this.state;
    return (
        <Table  striped bordered hover style={{fontSize: '12px'}}>
          <thead>
          <tr>
            <th>Exchange Ticker</th>
            <th>Nombre</th>
            <th>País</th>
            <th># Acciones</th>
            <th>Volumen venta</th>
            <th>Volumen compra</th>
            <th>Volumen total</th>
            <th>Participación</th>
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
          <th>{this.getVolumeBuy(e)}</th>
          <th>{this.getVolumeSell(e)}</th>
          <th>{this.getVolumeBuy(e)+this.getVolumeSell(e)}</th>
          <th>{`${Math.round(100*(this.getVolumeBuy(e)+this.getVolumeSell(e))/total)}%`}</th>
        </tr>
         )
        }
        </tbody>
        </Table>
    );
  }
}