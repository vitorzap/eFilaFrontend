import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import * as generalConstants from '../constants/general';

export const setMessage = message => {
  const messages = localStorage.getItem(generalConstants.LAST_MSG);
  const today = new Date();
  const time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const newMessage = message ? message.trim() : '';
  localStorage.setItem(
    generalConstants.LAST_MSG,
    messages + '|' + time + '-' + newMessage
  );
};

export const setAllMessages = messages => {
  localStorage.setItem(generalConstants.LAST_MSG, messages);
};

export const clearMessage = message => {
  localStorage.setItem(generalConstants.LAST_MSG, '');
};

export function getMessage() {
  const messages = localStorage.getItem(generalConstants.LAST_MSG);
  return messages;
}

export class ShowMessage extends Component {
  state = {
    aMessages: []
  };

  componentDidMount() {
    let messages = getMessage();
    if (messages) {
      this.setState({ aMessages: messages.split('|') });
    } else {
      messages = '';
    }
  }

  render() {
    return this.state.aMessages.map(
      (msg, index) =>
        msg !== '' && (
          <div key={index}>
            <Alert
              key={index}
              variant="danger"
              fade="false"
              onClose={() => {
                const newAMessages = this.state.aMessages.filter(
                  m => m !== msg
                );
                this.setState({ aMessages: newAMessages });
                const newMessages = newAMessages.join().replace(/,/g, '|');
                setAllMessages(newMessages);
              }}
              dismissible
            >
              {msg}
            </Alert>
          </div>
        )
    );
  }
}
