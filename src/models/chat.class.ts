export class Chat {
  firstName: string;
  lastName: string;
  profilImg: string;
  message: string;

  constructor(obj?: any) {
    this.firstName = obj ? obj.firstName : 'Dominik';
    this.lastName = obj ? obj.lastName : 'Graf';
    this.profilImg = obj ? obj.profilImg : 'ghost.png';
    this.message = obj ? obj.message : 'Test 1';
  }

  public toJSON() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      profilImg: this.profilImg,
      message: this.message,
    };
  }
}