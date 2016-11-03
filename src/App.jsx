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
      this.setState ({
      currentUser: {name: "Bob"},
      messages: []
    });
  }



  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket = new WebSocket("ws://localhost:4000/");

    this.socket.onopen = () => {
      console.log("Connected to server");

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
    const newMessage = {id: uuid.v1(), username: message.user, content: message.message};
    const messages = this.state.messages.concat(newMessage);
    this.socket.send(JSON.stringify(newMessage));
    // this.setState({messages: messages});
  }


  render() {
    console.log("Rendering <App/>")
    return (
      <div className="wrapper">
        <nav>
          <h1>ChattyCathy</h1>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} sendMessage={this.userEnterdMessage} />
      </div>

    )
  }
}
export default App;
