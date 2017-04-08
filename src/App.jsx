import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import Chatbar from './Chatbar.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: "Anonymous",
      messages: []
    };
  }

///connection to socket server
  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    console.log("Connected to Server");
    this.socket.onopen = (event) => {
      console.log('got a connection');
    }


    /// message receive back from websocket message
    this.socket.onmessage = (messageEvent) => {
      console.log(messageEvent.data)
      let newMessageEvent = JSON.parse(messageEvent.data);
      console.log(newMessageEvent);


    ////// SWITCH SETUP IF TIME
      if (newMessageEvent.type === "incomingMessage") {
        this.state.messages.push(newMessageEvent);
        this.setState({
          messages: [...this.state.messages]
        });

      // } else if (newMessageEvent.type === "incomingNotification") {

      }
    }

    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  addMessage = (content) => {
    let username = this.state.currentUser;
    var sendMessage = {
      type: "postMessage",
      username: username,
      content: content
    }
    this.socket.send(JSON.stringify(sendMessage));
  }

  //// passthrough the change on enter
  changeUsername = (content) => {
    if (!(content.KeyCode === 13)) {
    }
      const prevName = this.state.currentUser;
      const newName = content.target.value;
      this.setState({
        currentUser: newName,
      });
      const notification = {
        type: "postNotification",
        nameNotification: `${prevName} has changed their name to ${newName}`
      }
      console.log(notification)
      this.socket.send(JSON.stringify(notification));
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <Chatbar value={this.state.currentUser} currentUser={this.changeUsername} onMessage={this.addMessage.bind(this)} />
      </div>
    );
  }
}
export default App;
