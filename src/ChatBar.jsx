import React, {Component} from 'react';

class ChatBar extends Component {
    constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
  }

   handleChange(event) {
    if (event.keyCode === 13) {
        this.props.sendMessage(this.state.value);
      } else {
      this.setState({value: event.target.value});
      }

  }



  render() {
      console.log("Rendering <ChatBar/>")

    return (
      <footer>
        <input id="username" type="text" placeholder={this.props.currentUser.name} />
        <input id="new-message" type="text" placeholder="Type a message and hit ENTER" onKeyUp={this.handleChange} />
      </footer>
    )
  }
}
export default ChatBar;
