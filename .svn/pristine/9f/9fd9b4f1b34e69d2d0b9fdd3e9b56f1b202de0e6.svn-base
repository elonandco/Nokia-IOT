import {Injectable} from "@angular/core";
import {RouteRegistry} from "@angular/router-deprecated";
import {CustomAppComponent} from "../../custom/custom-app.component";


@Injectable()
export class DynamicRouteConfiguratorService {
  component = CustomAppComponent;

  constructor(private registry:RouteRegistry) {
  }

  addRoute(route) {
    //TODO: This is a hack to prevent adding the same route again when reloading a component (constructor will be invoked again)
    //TODO: find a better way of doing this!
    if (!this.registry.hasRoute(route.name, this.component)) {
      let routeConfig = this.getRoutes();
      routeConfig.configs.push(route);
      this.updateRouteConfig(routeConfig);
      this.registry.config(this.component, route);
    }
  }

  getRoutes() {
    return Reflect.getMetadata('annotations', this.component)
      .filter(a => {
        //return a.constructor.name === 'RouteConfig';
    	  return a.constructor.toString().match(/function (.{1,})\(/)[1] === 'RouteConfig';
      }).pop();
  }

  updateRouteConfig(routeConfig) {
    let annotations = Reflect.getMetadata('annotations', this.component);
    let routeConfigIndex = -1;
    for (let i = 0; i < annotations.length; i += 1) {
      if (annotations[i].constructor.toString().match(/function (.{1,})\(/)[1] === 'RouteConfig') {
        routeConfigIndex = i;
        break;
      }
    }
    if (routeConfigIndex < 0) {
      throw new Error('No route metadata attached to the component');
    }
    annotations[routeConfigIndex] = routeConfig;
    Reflect.defineMetadata('annotations', annotations, this.component);
  }
}
