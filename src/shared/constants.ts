export const LINKED_IN_URL = 'https://linkedin.com/in/cosmin-mihai-62073448';
export const GIT_URL = 'https://github.com/CosminMihai87';
export const INSTAGRAM_URL = 'https://www.instagram.com/cos.min2612';
export const FACEBOOK_URL = 'https://www.facebook.com/mihai.cosmin.37';

export const firebaseConfig = {
  apiKey: 'AIzaSyDNmTyx--40YuQKiUuYT4TzW_mtSEKKhmg',
  authDomain: 'mini-chef-74da9.firebaseapp.com',
  projectId: 'mini-chef-74da9',
  storageBucket: 'mini-chef-74da9.appspot.com',
  messagingSenderId: '2669497724',
  appId: '1:2669497724:web:4cc1a01d1af8e794d668f9',
  measurementId: 'G-085JWQXFRK',
  referenceURL: 'https://mini-chef-74da9-default-rtdb.europe-west1.firebasedatabase.app'
};

export enum TemplateVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

export type templateVariant = TemplateVariant.PRIMARY | TemplateVariant.SECONDARY;

export enum AnimationType {
  PROGRESS = 'progress',
  JELLO = 'jello',
  PULSE = 'pulse'
}

export type animationType = AnimationType.PROGRESS | AnimationType.JELLO | AnimationType.PULSE;

export enum DropdownType {
  DEFAULT = 'default',
  SEARCH = 'search'
}

export type dropdownType = DropdownType.DEFAULT | DropdownType.SEARCH;

export enum CheckBoxDirection {
  COLUMN = 'column',
  ROW = 'row'
}

export type checkBoxDirection = CheckBoxDirection.COLUMN | CheckBoxDirection.ROW;

export enum InputType {
  TEXT = 'text',
  NUMBER = 'number',
  PASSWORD = 'password',
  EMAIL = 'email',
  COLOR = 'color',
  TIME = 'time',
  WEEK = 'week',
  MONTH = 'month',
  RANGE = 'range',
  SEARCH = 'search',
}

export type inputType = InputType.TEXT | InputType.NUMBER | InputType.PASSWORD | InputType.EMAIL | InputType.COLOR | InputType.TIME | 
InputType.WEEK | InputType.MONTH | InputType.RANGE | InputType.SEARCH;

export enum ControlType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  DROPDOWN = 'dropdown',
  CHECKBOXLIST = 'checkboxList'
}

export type controlType = ControlType.INPUT |  ControlType.TEXTAREA |  ControlType.DROPDOWN |  ControlType.CHECKBOXLIST;