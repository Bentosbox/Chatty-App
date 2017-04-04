import React, {Component} from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    console.log("Rendering <Chatbar/>");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder= {this.props.currentUser} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>

    );
  }
}

export default Chatbar;