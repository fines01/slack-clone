
export class User {
    uid!: string;
    email!: string;
    emailVerified: boolean = false;
    photoURL!: string;
    displayName!: string;
    // TODO remove firstname, lastName ??
    firstName!: string;
    lastName!: string;
    //
    fullName!: string;
    namePronunciation!: string;
    timeZone!: string;
    title!: string;
    phone!: string;
    status!: string;
    isActive: boolean = false;
    channels!: string[];

    constructor(obj?: any){
        this.uid = (obj && obj.uid) ? obj.uid : '';
        this.email = (obj && obj.email) ? obj.email : '';
        this.emailVerified = (obj && obj.emailVerified) ? obj.emailVerified : false;
        this.photoURL = (obj && obj.photoURL) ? obj.photoURL : 'assets/img/avatar-placeholder.png';
        this.displayName = (obj && obj.displayName) ? obj.displayName : '';
        // TODO remove firstName && lastName, instead ullName
        this.firstName = (obj && obj.firstName) ? obj.firstName : '';
        this.lastName = (obj && obj.lastName) ? obj.lastName : '';
        //
        this.fullName = (obj && obj.fullName) ? obj.fullName : '';
        this.namePronunciation = (obj && obj.namePronunciation) ? obj.namePronunciation : '+ Aussprache des Namens hinzufügen';
        this.title = (obj && obj.title) ? obj.title : '';
        this.phone = (obj && obj.phone) ? obj.phone : '+ Phone hinzufügen';
        this.status = (obj && obj.status) ? obj.status : '';
        this.isActive = (obj && obj.isActive) ? obj.isActive : false;
        this.channels = (obj && obj.channels && obj.channels.length > 0) ? obj.channles : [];
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
            fullName: this.fullName,
            namePronunciation: this.namePronunciation,
            title: this.title,
            phone: this.phone,
            status: this.status,
            isActive: this.isActive,
            channels: this.channels,
        }
    }
}


