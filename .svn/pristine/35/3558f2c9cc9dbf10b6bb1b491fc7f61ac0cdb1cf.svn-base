export class AuthenticationModel {
  sessionId:string;
  subscriberId:string;
  anonymous:boolean;

  constructor(auth:any = undefined) {
    if(auth){
      this.sessionId = auth.sessionId;
      this.subscriberId = auth.subscriberId;
      this.anonymous = auth.anonymous;
    }else{
      this.sessionId = "";
      this.subscriberId = "";
      this.anonymous = undefined;
    }
  }
}

