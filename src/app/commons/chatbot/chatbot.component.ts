import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnimationBuilder, style, animate, AnimationMetadata } from '@angular/animations';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  @ViewChild('chatElement') chatElement!: ElementRef;

  isChatVisible = false;

  constructor(private animationBuilder: AnimationBuilder) {}

  toggleChatVisibility() {
    this.isChatVisible = !this.isChatVisible;
    this.animateChatVisibility();
  }

  animateChatVisibility() {
    const chatElement = this.chatElement.nativeElement;

    const animation: AnimationMetadata[] = this.isChatVisible
      ? [style({ height: '0', opacity: 0 }), animate('300ms', style({ height: '*', opacity: 1 }))]
      : [style({ height: '*', opacity: 1 }), animate('300ms', style({ height: '0', opacity: 0 }))];

    const player = this.animationBuilder.build(animation).create(this.chatElement);
    player.play();
  }
}
