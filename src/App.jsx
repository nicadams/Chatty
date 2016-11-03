import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
var uuid = require('uuid');


class App extends Component {

  constructor(props) {
    console.log("App constructor")
    super(props)
    this.userEnterdMessage = this.userEnterdMessage.bind(this);

    this.state = {
      currentUser: {name: "Bob"},
      messages: []
    };
  }

  // componentWillMount() {
  //   this.setState(data);
  // }



  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket = new WebSocket("ws://localhost:4000/");

    this.socket.onopen = () => {
      console.log("Connected to server");
      this.socket.send(JSON.stringify(this.state));

       this.socket.onmessage = (messageEvent) => {
        let data = JSON.parse(messageEvent.data);
        const messages = this.state.messages.concat(data);
        this.setState({messages: messages});
      }
    }
  }

  componentWillUnmount() {
    this.socket.close();
  }

  userEnterdMessage(message) {
    const newId = this.state.messages.length + 1;
    const newMessage = {id: uuid.v1(), username: message.user, content: message.message};
    const messages = this.state.messages.concat(newMessage);
    this.socket.send(JSON.stringify(newMessage));
    this.setState({messages: messages});
  }



  //   setTimeout(() => {
  //     console.log("Simulating incoming message");

  //     // Add a new message to the list of messages in the data store
  //     const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
  //     const messages = this.state.messages.concat(newMessage)
  //     // Update the state of the app component.
  //     // Calling setState will trigger a call to render() in App and all child components.
  //     this.setState({messages: messages})
  //   }, 3000);
  // };



  render() {
    console.log("Rendering <App/>")
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} sendMessage={this.userEnterdMessage} />
      </div>

    )
  }
}
export default App;
