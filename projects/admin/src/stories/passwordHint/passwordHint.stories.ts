import { moduleMetadata } from '@storybook/angular';
import { PasswordHintComponent } from './passwordHint.component';


export default {
  title: 'HR/passwordHint',
  component: PasswordHintComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
    }),
  ],
};

export const week = {
  args:{
    passed:[false,false,false,false]
  }
};

export const medium = {
  args:{
    passed:[false,true,true,false]
  }
};
export const good = {
  args:{
    passed:[true,true,true,false]
  }
};
export const strong = {
  args:{
    passed:[true,true,true,true]
  }
};