import React, {Component} from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      username: props.currentUser.name
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

  handleChange = (e) => {
    this.setState({ message: e.target.value });
  }


  render() {
    console.log("Rendering <Chatbar/>");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.state.username} />
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