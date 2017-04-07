import React, {Component} from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      username: "Anonymous"
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

    ////setting new username
    this.setState({ username: e.target.value })
  }

  handleChange = (e) => {
    this.setState({ message: e.target.value });
  }



  handleName = (e) => {
    console.log(e.target.value);
  }


  render() {
    console.log("Rendering <Chatbar/>");
    return (
      <footer className="chatbar">
        <input
          onChange={this.props.currentUser}
          onKeyUp={this.handlekeypress}
          className="chatbar-username"
          placeholder="Anonymous"
          value={this.props.value} />
        <input
          onChange={this.handleChange}
          onKeyUp={this.handleKeypress}
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          value={this.state.message} />
      </footer>

    );
  }
}

export default Chatbar;