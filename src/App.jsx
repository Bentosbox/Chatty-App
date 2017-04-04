import React, {Component} from 'react';
import Messagelist from './Messagelist.jsx';
import Chatbar from './Chatbar.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: "Anonymous",
      messages: []
    };
  }

  render() {
  console.log("Rendering <App/>");
    return (
      <div>
        <Messagelist />
        <Chatbar />
      </div>
    );
  }
}
export default App;
