import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import Chatbar from './Chatbar.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: "Anonymous",
      messages: [{
        id: "0b2635a4-82b0-4e49-803e-2b901be71cf6",
        username: "Bob",
        content: "Has anyone seen my marbles?",
        },
        {
        id: "0b2635a4-82b0-4e49-803e-2b901be71cf6",
        username: "Anonymous",
        content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
      }]
    };
  }

  // this.addMessage = this.addMessage.bind(this);

///connection to socket server
  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    console.log("Connected to Server");


    this.socket.onopen = (event) => {
      console.log('got a connection');
    // var sendMessage = {id: "0b2635a4-82b0-4e49-803e-2b901be71cf6", username: "Bob", content: "Hi"}
      // this.socket.send("Sent to SocketServer");
    }

    /// broadcast back from websocket message
    this.socket.onmessage = (messageEvent) => {

      let newMessageEvent = JSON.parse(messageEvent.data);
      console.log(newMessageEvent);
      this.state.messages.push(newMessageEvent);
      this.setState({
      messages: [...this.state.messages]
    });


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

  // ws.on('open', function open() {
  //   ws.send('{this.state.messages.content}')
  // }

  addMessage = (content) => {
    const username = this.state.currentUser;
    // console.log("jeremy", [...this.state.messages, { username, content }]);
    // this.setState({
      // messages: [...this.state.messages, { username, content }]
    // });
    var sendMessage = {username: username, content: content}
    this.socket.send(JSON.stringify(sendMessage));
    // console.log("rohit", this.state.messages);
      // let fullMessage = this.state.messages;
      // let newMessage = {
      //   username: this.state.currentUser,
      //   content: e.target.value
      // }
      // fullMessage.push(newMessage);
      // this.setState({messages: fullMessage})
  }


  //checkout set empty array as new state
  // can use contact
  //this.addItem=this.addItem.bind(this); for states that change must be bound

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <Chatbar currentUser={this.state.currentUser} onMessage={this.addMessage.bind(this)} />
      </div>
    );
  }
}
export default App;
