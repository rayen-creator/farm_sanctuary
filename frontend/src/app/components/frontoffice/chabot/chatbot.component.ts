import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chabot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  public args = {
    openButton: document.querySelector('.chatbox__button'),
    chatBox: document.querySelector('.chatbox__support'),
    sendButton: document.querySelector('.send__button')
  }

  public state = false;
  public messages: { name: string; message: string }[] = [];

  constructor() { }

  ngOnInit(): void {
    this.display();
  }

  public display(): void {
    const { openButton, chatBox, sendButton } = this.args;
  
    openButton?.addEventListener('click', () => this.toggleState(chatBox as HTMLElement));
  
    sendButton?.addEventListener('click', () => this.onSendButton(chatBox as HTMLElement));
  
    const node = chatBox?.querySelector('input');
    node?.addEventListener('keyup', ({ key }) => {
      if (key === 'Enter') {
        this.onSendButton(chatBox as HTMLElement);
      }
    });
  }
  

  public toggleState(chatbox: HTMLElement | null): void {
    this.state = !this.state;

    // show or hides the box
    if (this.state) {
      chatbox?.classList.add('chatbox--active');
    } else {
      chatbox?.classList.remove('chatbox--active');
    }
  }

  public onSendButton(chatbox: HTMLElement | null): void {
    const textField = chatbox?.querySelector('input');
    const text1 = textField?.value || '';
    if (text1 === '') {
      return;
    }

    const msg1 = { name: 'User', message: text1 };
    this.messages.push(msg1);

    fetch('http://127.0.0.1:5000/chat', {
      method: 'POST',
      body: JSON.stringify({ message: text1 }),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((r) => r.json())
      .then((r) => {
        const msg2 = { name: 'Sam', message: r.answer };
        this.messages.push(msg2);
        this.updateChatText(chatbox);
        textField!.value = '';
      })
      .catch((error) => {
        console.error('Error:', error);
        this.updateChatText(chatbox);
        textField!.value = '';
      });
  }

  public updateChatText(chatbox: HTMLElement | null): void {
    let html = '';
    this.messages.slice().reverse().forEach(function (item, index) {
      html += `
        <div class="messages__item ${item.name === 'Sam' ? 'messages__item--visitor' : 'messages__item--operator'}">
          <div class="messages__content">
            ${item.message}
          </div>
        </div>
      `;
    });
  
    const chatmessage = chatbox?.querySelector('.chatbox__messages');
    chatmessage!.innerHTML = html;
  
    // Get all the chat messages
    const messages = chatmessage?.querySelectorAll('.messages__item .messages__content');
  
    // Loop through each message and apply the appropriate styles
    messages?.forEach(message => {
      const parent = message.parentNode as HTMLElement;
      if (parent.classList.contains('messages__item--operator')) {
        message.setAttribute('style', 'background-color: lightgreen; color: #333333; border-radius: 20px 20px 0px 20px; margin-left: 10px; padding: 10px; font-size: 16px;');
      } else if (parent.classList.contains('messages__item--visitor')) {
        message.setAttribute('style', 'background-color: #008000; color: white; border-radius: 20px 20px 20px 0px; margin-right: 10px; padding: 10px; font-size: 16px;');
      }
    });
  
    // Apply the chatbox styles
    if (chatmessage) {
      chatmessage.setAttribute('style', 'margin-top: auto; display: flex; overflow-y: scroll; flex-direction: column-reverse; padding: 20px;');
    }
    const messagesItems = chatmessage?.querySelectorAll('.messages__item');
    messagesItems?.forEach(message => {
      message.setAttribute('style', 'display: flex; align-items: center; margin-bottom: 10px; max-width: 100%;');
      const operator = message.querySelector('.messages__item--operator .messages__content');
      const visitor = message.querySelector('.messages__item--visitor .messages__content');
      if (operator) {
        operator.setAttribute('style', 'background-color: lightgreen; color: #333333; border-radius: 20px 20px 0px 20px; margin-left: auto; padding: 10px; font-size: 16px;');
      }
      if (visitor) {
        visitor.setAttribute('style', 'background-color: #008000; color: white; border-radius: 20px 20px 20px 0px; margin-right: auto; padding: 10px; font-size: 16px;');
      }
    });
  }
  
}
