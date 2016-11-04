import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
var uuid = require('uuid');


class App extends Component {

  constructor(props) {
    console.log("App constructor")
    super(props)
    this.userEnterdMessage = this.userEnterdMessage.bind(this);
  }

  componentWillMount() {
      this.setState ({  // fix indentation
      currentUser: {name: "Bob"},
      messages: [],
      usersOnline: 0
    });
  }


  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket = new WebSocket("ws://localhost:4000/");

    this.socket.onopen = () => {
      console.log("Connected to server");

      this.socket.onmessage = (messageEvent) => {
        let data = JSON.parse(messageEvent.data);
          // TODO: Please add some code to satisfy the requirement
          // of displaying "User X changed their name to User Y"
          // when a user changes their name.
          if (data.type === "userCount") {
            this.setState({usersOnline: data.usersOnline})

          } else {
            data.type = "incomingMessage";
            const messages = this.state.messages.concat(data);
            this.setState({messages: messages});
          }
      }
    }
  }


  componentWillUnmount() {
    this.socket.close(); // nice!
  }

  userEnterdMessage(message) {
    // You are reusing the message object to do two things:
    //   - post a new message
    //   - rename the user
    // In order to distinguish a message that changes a username
    // from a message that adds a new chat message, you are checking
    // to see if the message contains a user property.
    // This might lead to confusion.
    // Suggestion: add a 'type' property to the message.
    // Then you can check (if message.type === "changeName"...)
    // 
    // Another thing you can do (and this requires more work, but it is
    // probably a cleaner solution) is to split up this function into
    // two separate functions:
    //    - userEnteredMessage
    //    - userChangedName
    //
    if (message.user === "") { // nice check here
      let newMessage = {
        id: uuid.v1(),
        username: this.state.currentUser.name,
        content: message.message,
        type: "postMessage"
      };
      this.socket.send(JSON.stringify(newMessage));

    } else {
      let changeNameNotification = {
        content: "User changed name from " + this.state.currentUser.name + " to: " + message.user,
        type: "postNotification"
    }
      let userMessage = {  // fix indentation
        id: uuid.v1(),
        username: message.user,
        content: message.message,
        type: "postMessage"
      };

      // The current implementation requires a user to change their name
      // in the chat bar and then enter a new message.
      // This is a little confusing usability-wise.

      // If you feel it is worthwhile for your learning experience,
      // I suggest changing the code so that a user can change their name
      // by updating the name in the chat bar and then hitting the ENTER key.
      this.state.currentUser.name = message.user;
      this.socket.send(JSON.stringify(changeNameNotification));
      this.socket.send(JSON.stringify(userMessage));
    }
  }


  render() {
    console.log("Rendering <App/>")
    return (
      <div className="wrapper">
        <nav>
          <span>ChattyCathy</span>
          <h2>Users Online: {this.state.usersOnline}</h2>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar
          currentUser={this.state.currentUser}
          sendMessage={this.userEnterdMessage} />
      </div>

    )
  }
}
export default App;
