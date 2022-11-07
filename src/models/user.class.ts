export class User {
    uid!: string;
    email!: string;
    emailVerified: boolean = false;
    photoURL!: string;
    displayName!: string;
    firstName!: string;
    lastName!: string;
    title!: string;
    phone!: string;
    status!: string;
    isActive: boolean = false;


    constructor(obj?: any){
        this.uid = obj.uid ? obj.uid : '';
        this.email = obj.email ? obj.email : '';
        this.emailVerified = obj.emailVerified ? obj.emailVerified : false;
        this.photoURL = obj.photoURL ? obj.photoURL : '';
        this.displayName = obj.displayName ? obj.displayName : '';
        this.firstName = obj.firstName ? obj.firstName : '';
        this.lastName = obj.lastName ? obj.lastName : '';
        this.title = obj.title ? obj.title : '';
        this.phone = obj.phone ? obj.phone : '';
        this.status = obj.status ? obj.status : '';
        this.isActive = obj.isActive ? obj.isActive : false;
    }

    // returns userdata as a json object
    public setUserData(){
        return {
            uid: this.uid,
            email: this.email,
            emailVerified: this.emailVerified,
            photoURL: this.photoURL,
            displayName: this.displayName,
            firstName: this.firstName,
            lastName: this.lastName,
            title: this.title,
            phone: this.phone,
            status: this.status,
            isActive: this.isActive,
        }
    }
}