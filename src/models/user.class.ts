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
        this.uid = obj ? obj.uid : '';
        this.email = obj ? obj.email : '';
        this.emailVerified = obj ? obj.emailVerified : '';
        this.photoURL = obj ? obj.photoURL : '';
        this.displayName = obj ? obj.displayName : '';
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.title = obj ? obj.title : '';
        this.phone = obj ? obj.phone : '';
        this.status = obj ? obj.status : '';
        this.isActive = obj ? obj.isActive : '';
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