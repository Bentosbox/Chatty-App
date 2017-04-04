import React, {Component} from 'react';

class Messagelist extends Component {

  // constructor(props) {
  //   super(props);

  // }
  render() {
    console.log("Rendering <Messagelist/>");
    return (
      <div className="message system">
      Anonymous1 changed their name to nomnom.
      </div>
    );
  }
}

export default Messagelist;