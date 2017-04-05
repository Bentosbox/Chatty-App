import React, {Component} from 'react';

class Message extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log("Rendering <Message/>");
    return (
      <div className="message">
        <span key={this.props.message.username} className="message-username">{this.props.message.username}</span>
        <span key={this.props.message.content} className="message-content">{this.props.message.content}</span>
      </div>

    );
  }
}

export default Message;