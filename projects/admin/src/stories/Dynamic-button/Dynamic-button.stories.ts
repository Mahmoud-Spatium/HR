import { moduleMetadata } from '@storybook/angular';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';
import { DynamicButtonComponent } from './Dynamic-button.component';

// Mock ActivatedRoute
class MockActivatedRoute {}

export default {
  title: 'HR/button',
  component: DynamicButtonComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      providers: [{ provide: ActivatedRoute, useClass: MockActivatedRoute }],
      imports: [NgStyle, RouterLink],
    }),
  ],
};

export const red = {
  args: {
    data: {
      bg: 'red',
      content: 'Red BG',
      router: 'test',
    },
  },
};
export const green = {
  args: {
    data: {
      bg: 'green',
      content: 'Green BG',
      router: 'test',
    },
  },
};
