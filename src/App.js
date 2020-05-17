import React from "react";
import io from "socket.io-client";
import { getStock, getExchange } from "./utils/sockets";
import { useEffect, useState } from 'react';
import StockChart from "./components/StockChart";
import { toDate } from './utils/utils';
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  // 1. listen for a cpu event and update the state
  const url = "wss://le-18262636.bitzonte.com";
  const socket = io(url, {
    path: "/stocks",
  });

  useEffect(() => {
    socket.once("UPDATE", (event) => {
      var newData = {};
      const { ticker, value }= event;
      const time = toDate(event.time);
      if(data.some((e) => e.time === time)) {
        let existingTime = data.find((e) => e.time === time);
        var index = data.indexOf(existingTime);
        const newItem = {...existingTime, [ticker]: value};
        if (index !== -1) data.splice(index, 1);
        newData = [...data, newItem];
      } else {
        newData = [...data, {time: time, [ticker]: value}];
      }    
      setData(newData);
    }); 
  },);
  // getStock(socket);
  // getExchange(socket);

  return (
    <div className="App">
      <StockChart socket={socket} data={data}/>
    </div>
  );
}

export default App;
