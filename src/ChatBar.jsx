import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
  super(props); // fix indentation
  this.state = {message: '', user: ''}; // you can make the initial state for this.state.user to be this.props.currentUser.name
                                        // it seems more consistent with what the data actually is.
                                        // then you can set the username input field to use this.state.user instead of this.props.currentUser.name
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
        <!-- the name should be in the value="" instead of placeholder, otherwise the user can't edit it easily -->
        <input id="username" type="text" placeholder={this.props.currentUser.name} onKeyUp={this.handleNameChange} />
        <input id="new-message" type="text" placeholder="Type a message and hit ENTER" onKeyUp={this.handleMessageChange} />
      </footer>
    )
  }
}
export default ChatBar;
