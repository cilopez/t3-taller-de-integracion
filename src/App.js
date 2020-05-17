import React from "react";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import StockChart from "./components/StockChart";
import ConnectButton from "./components/ConnectButton";
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
  // getStock(socket);
  // getExchange(socket);

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
      <div style={{ width: "50%", height: 400, margin:0  }}>
        <StockChart socket={socket} data={data} />
      </div>
    </div>
  );
}

export default App;
