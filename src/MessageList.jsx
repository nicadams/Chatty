import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList/>")

    return (
      <div id="message-list">
      {this.props.messages.map((message) => {
        console.log(message.type)
        if (message.type === 'postNotification') {
          return <div className='message system'>{message.content}</div>
        } else {
          return <Message

          key={message.id}
          username={message.username}
          content={message.content} />
        }

        })
      }
      </div>
    )
  }
}
export default MessageList;



