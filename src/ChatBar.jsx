import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
  super(props);
  this.state = {message: '', user: ''};
  this.handleNameChange = this.handleNameChange.bind(this);
  this.handleMessageChange = this.handleMessageChange.bind(this);
  }

  handleMessageChange(event) {
    if (event.keyCode === 13) {
      this.props.sendMessage({message: this.state.message, user: this.state.user});
    } else {
      this.setState({message: event.target.value});
    }
  }

  handleNameChange(event) {
    this.setState({user: event.target.value});
  }

  render() {
    console.log("Rendering <ChatBar/>")

    return (
      <footer>
        <input id="username" type="text" placeholder={this.props.currentUser.name} onKeyUp={this.handleNameChange} />
        <input id="new-message" type="text" placeholder="Type a message and hit ENTER" onKeyUp={this.handleMessageChange} />
      </footer>
    )
  }
}
export default ChatBar;
