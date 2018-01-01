import {LoginInfo} from './LoginInfo';

export class ChangePasswordInfo extends LoginInfo {
  oldPassword: string;
  passwordConfirm: string;
}
