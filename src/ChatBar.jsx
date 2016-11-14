import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {message: '', user: this.props.currentUser.name};
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }


  handleNameChange(event) {
    if (event.keyCode === 13) {
      this.props.sendMessage({user: this.state.user, type: 'changeName'});
    } else {
      this.setState({user: event.target.value});
    }
  }

  handleMessageChange(event) {
    if (event.keyCode === 13) {
      this.props.sendMessage({message: this.state.message});
      this.refs.newMessage.value = '';
    } else {
      this.setState({message: event.target.value});
    }
  }

  render() {
    console.log("Rendering <ChatBar/>")

    return (
      <footer>
        <input id="username" type="text" ref="userName" defaultValue={this.state.user} onKeyUp={this.handleNameChange} />
        <input id="new-message" type="text" ref="newMessage" placeholder="Type a message and hit ENTER" onKeyUp={this.handleMessageChange} />
      </footer>
    )
  }
}
export default ChatBar;
