import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  AnimationBuilder,
  style,
  animate,
  AnimationMetadata,
} from '@angular/animations';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
})
export class ChatbotComponent {
  constructor(private _bottomSheetRef: MatBottomSheetRef<ChatbotComponent>) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  closeChatBot(): void {
    this._bottomSheetRef.dismiss();
  }
}
