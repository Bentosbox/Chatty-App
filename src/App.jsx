import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import Chatbar from './Chatbar.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      usersOnline: 0,
      currentUser: "Anonymous",
      messages: [],
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
      // let clientCount = JSON.parse(messageEvent.data);
      console.log(newMessageEvent);


    ////// SWITCH SETUP IF TIME
      switch(newMessageEvent.type) {
        case 'incomingClient': {
          console.log("this is the client count")
          this.setState({usersOnline: newMessageEvent.count})
          break;
        }
        case 'incomingMessage': {
          this.state.messages.push(newMessageEvent);
          this.setState({
            messages: [...this.state.messages]
          });
          break;
        }
        case 'incomingNotification': {
          // let messageNotification = {newMessageEvent.username}
          console.log("notification is : " + newMessageEvent.content);
          console.log('RENDERING NOTIFICATION')
          this.state.messages.push(newMessageEvent);
          this.setState({
            messages: [...this.state.messages]
          });
          break;
        }
        default: {}

      }


    }

    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, type:"incomingMessage", username: "Michelle", content: "Hello there!"};
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
  changeUsername = (username) => {
    console.log('SAVING NEW USERNAME:', username)
    const prevName = this.state.currentUser;

    this.setState({
      currentUser: username,
    });
    const notification = {
      type: "postNotification",
      nameNotification: `${prevName} has changed their name to ${username}`
    }
    console.log('NOTIFICATION: ', notification)
    this.socket.send(JSON.stringify(notification));
  }

  handleUserOnKeyup = (e) => {
    if (e.keyCode !== 13) { return; }
    this.changeUsername(e.target.value)
  }
  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <nav className="navbar">
         <a href="/" className="navbar-brand">Chatty</a>
        <div className="user-count">{this.state.usersOnline} users online</div>
        </nav>
        <MessageList
          messages={this.state.messages}
          notification={this.state.notification}/>
        <Chatbar
          handleUserOnKeyup={this.handleUserOnKeyup.bind(this)}
          onMessage={this.addMessage.bind(this)} />
      </div>
    );
  }
}
export default App;
