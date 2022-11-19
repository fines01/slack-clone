export class Chat {
  // User now has only fullName property instead of firstName && lastname
  firstName: string;
  lastName: string;
  //
  fullName: string;
  profilImg: string;
  message: string;
  messageImg: string;
  weight: boolean;
  italic: boolean;
  chatId: number;
  chatDate: any;
  displayName:string;

  constructor(obj?: any) {
    this.firstName = obj ? obj.firstName : '';
    this.lastName = obj ? obj.lastName : '';

    this.fullName = obj ? obj.fullname : '';
    this.profilImg = obj ? obj.profilImg : '';
    this.message = obj ? obj.message : '';
    this.messageImg = obj ? obj.messageImg : '';
    this.weight = obj ? obj.weight : false;
    this.italic = obj ? obj.italic : false;
    this.chatId = obj ? obj.chatId : 0;
    this.chatDate = obj ? obj.chatDate : '';
    this.displayName = obj ? obj.displayName : '';
  }

  public toJSON() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,

      fullName: this.fullName,
      profilImg: this.profilImg,
      message: this.message,
      messageImg: this.messageImg,
      weight: this.weight,
      italic: this.italic,
      chatId: this.chatId,
      chatDate: this.chatDate,
      displayName: this.displayName,
    };
  }
}
