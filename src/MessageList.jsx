import React, {Component} from 'react';
import Message from './Message.jsx';

class Messagelist extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log("Rendering <Messagelist/>");
    return (
      <div className="message system">
       <Message />
      </div>
    );
  }
}

export default Messagelist;