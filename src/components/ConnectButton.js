import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CloudIcon from "@material-ui/icons/Cloud";
import Typography from "@material-ui/core/Typography";

export default class ConnectButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: true,
    };
    this.changeState = this.changeState.bind(this);
  }

  changeState() {
    const { connected } = this.state;
    const { socket } = this.props;
    this.setState({ connected: !connected });
    !connected ? socket.connect() : socket.close();
  }

  render() {
    const { connected } = this.state;
    return (
      <div>
        <Button
          variant="contained"
          startIcon={<CloudIcon />}
          onClick={(e) => this.changeState()}
        >
          {connected ? (
            <Typography>Desconectarse</Typography>
          ) : (
            <Typography>Conectarse</Typography>
          )}
        </Button>
      </div>
    );
  }
}
