export class DomainView {
  id: string;
  constructor(public services?:Array<ServiceView>) {
    this.services = [];
  }
}

export class ServiceView {
  public id: string;
  public name: string;
  public expanded:boolean = false;

	constructor(public operations?: Array<OperationView>) {
		this.operations = [];
	}

  toggle(): void {
    if (this.operations.length === 0) {
      console.log('should navigate to route');
    } else {
      this.expanded = !this.expanded;
    }
  }

}

export class OperationView {
  public id: string;
  public name: string;
  constructor() {
  }
}
