import React from "react";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import StockChart from "./components/StockChart";
import ConnectButton from "./components/ConnectButton";
import StockTable from "./components/StockTable";
import ExchangeTable from "./components/ExchangeTable";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";

import { getStock, getExchange } from "./utils/sockets";
import "./App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  chart: {
    align: "center",
  },
}));

function App() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const url = "wss://le-18262636.bitzonte.com";
  const socket = io(url, {
    path: "/stocks",
  });

  useEffect(() => {
    socket.once("UPDATE", (event) => {
      var newData = {};
      const { ticker, value, time } = event;
      // const time =
      if (data.some((e) => e.time === time)) {
        let existingTime = data.find((e) => e.time === time);
        var index = data.indexOf(existingTime);
        const newItem = { ...existingTime, [ticker]: value };
        if (index !== -1) data.splice(index, 1);
        newData = [...data, newItem];
      } else {
        newData = [...data, { time: time, [ticker]: value }];
      }
      setData(newData);
    });
  });
  return (
    <div className="App">
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Stock Market Dashboard
            </Typography>
            <ConnectButton socket={socket} />
          </Toolbar>
        </AppBar>
      </div>
      <div style={{marginLeft:'5%', marginRight:'5%'}}>
        <div style={{ width: "50%", height: 400}}>
          <StockChart socket={socket} data={data} />
        </div>
        <div style={{marginTop: '2%'}}>
          <div style={{float:"left"}}>
            <StockTable data={data} socket={socket}/>
          </div>
          <div style={{float:"right"}}>
            <ExchangeTable data={data} socket={socket}/>
          </div>
        </div>
      </div>
    </div>

  );
}

export default App;
