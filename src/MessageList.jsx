import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <Messagelist/>");
    return (
      <div id="message-list">
        <main className="messages">
          {this.props.messages.map((messageNew, index) => {
            if (messageNew.type = "postNotification") {
              return (<div className ="message system">
              <span>{messageNew.nameNotification}</span>
              </div>)
            } else {
            return <Message message={messageNew} key={index} />
            }
          })}
        </main>
      </div>
    );
  }
}

export default MessageList;