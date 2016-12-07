import {BrowserXhr} from "@angular/http";
import {Injectable} from "@angular/core";
/**
 * Created by jlmayorga on 3/15/16.
 */
@Injectable()
export class CustomBrowserXhr extends BrowserXhr {
  constructor() {
    super();
  }

  build():any {
    let xhr = super.build();
    xhr.withCredentials = true;

    return <any>(xhr);
  }
}
