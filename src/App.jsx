import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import Message from './Message.jsx';
import Messagelist from './Messagelist.jsx';
import Chatbar from './Chatbar.jsx';


class App extends Component {
  render() {
  console.log("Rendering <App/>");
    return (
      <div>
        <Messagelist />
        <Message />
        <Chatbar />
      </div>
    );
  }
}
export default App;
