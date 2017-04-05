import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import Chatbar from './Chatbar.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [{
        username: "Bob",
        content: "Has anyone seen my marbles?",
        },
        {
        username: "Anonymous",
        content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
      }]
    };
  }

  // this.addMessage = this.addMessage.bind(this);

  componentDidMount() {
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
    const username = this.state.currentUser;
    this.setState({
      messages: [...this.state.messages, { username, content }]
    });
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
        <Chatbar currentUser={this.state.currentUser} onMessage={this.addMessage} />
      </div>
    );
  }
}
export default App;
