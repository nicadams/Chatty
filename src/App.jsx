import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
var uuid = require('uuid');


class App extends Component {

  constructor(props) {
    console.log("App constructor")
    super(props)
    this.userEnteredMessage = this.userEnteredMessage.bind(this);
  }

  componentWillMount() {
    this.setState ({
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
    this.socket.close();
  }

  userEnteredMessage(message) {
    if (message.type === "changeName") {
      let changeNameNotification = {
        content: "User changed name from " + this.state.currentUser.name + " to: ",
        type: "postNotification"
      }
      let userMessage = {
        id: uuid.v1(),
        username: message.user,
        content: message.message,
        type: "postMessage"
      };
      this.state.currentUser.name = message.user;
      this.socket.send(JSON.stringify(changeNameNotification));
      this.socket.send(JSON.stringify(userMessage));

    } else {
     let newMessage = {
        id: uuid.v1(),
        username: this.state.currentUser.name,
        content: message.message,
        type: "postMessage"
      };
      this.socket.send(JSON.stringify(newMessage));
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
          sendMessage={this.userEnteredMessage} />
      </div>

    )
  }
}
export default App;
