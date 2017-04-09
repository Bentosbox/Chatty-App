import React, {Component} from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      username: "Anon"
    };
  }


  handleKeypress = (e) => {
    if(e.keyCode !== 13) { return; }

    const message = this.state.message.trim();

    if(!message || message.length === 0) {
      this.setState({ message: "" });
      return;
    }

    this.props.onMessage(message);
    this.setState({ message: "" });
  }

  handleChangeMessageValue = (e) => {
    this.setState({ message: e.target.value });
  }

  handleChangeNameValue = (e) => {
    console.log('onCHANGE', e.target.value)
    this.setState({ username: e.target.value })
  }

  render() {
    console.log("Rendering <Chatbar/>", this.props);
    return (
      <footer className="chatbar">
        <input
          onChange={this.handleChangeNameValue}
          onKeyUp={this.props.handleUserOnKeyup}
          className="chatbar-username"
          placeholder="Anonymous"
          value={this.state.username} />
        <input
          onChange={this.handleChangeMessageValue}
          onKeyUp={this.handleKeypress}
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          value={this.state.message} />
      </footer>

    );
  }
}

export default Chatbar;