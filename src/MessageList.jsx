import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <Messagelist/>");
    console.log(this.props.messages)
    return (
      <div id="message-list">
        <main className="messages">
          {this.props.messages.map((messageNew, index) => {
            // if (messageNew.type = "incomingNotification") {
            //   <span>{messageNew.nameNotification}</span>
            // } else {
            return <Message message={messageNew} key={index} />
            // }
          })}
        </main>
      <div className ="message system">
      <span>{this.props.notification}</span>
      </div>
      </div>
    );
  }
}

export default MessageList;