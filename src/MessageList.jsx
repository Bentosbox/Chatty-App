import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    //write function for timestamp() {}
    //include timestamp let timestamp = Date.now() for unique key
    console.log("Rendering <Messagelist/>");
    //   let newMessages = {this.props.messages[0]}


    return (
        <main className="messages">
          {this.props.messages.map((messageNew, index) => {

            return <Message message={messageNew} key={index} />
            })
          }

      </main>
    );
  }
}

export default MessageList;