/**
 * Created by jlmayorga on 4/7/16.
 *
 * Element definition that defines common properties for Domains, Services and Operations
 *
 */
export interface Element {
  id:string;
  attributes:Object;
  name:string;
  displayName:string;
  type:string;
}

/**
 * Domain / Service / Operation root class that mimics the results returned by SSC.
 */
export class DSOModel {
  domains:Domains;
}

/**
 * Domains
 */
export interface Domains {
  domain:Array<Domain>;
}

/**
 * Domain
 */
export interface Domain extends Element {
  services:Services;
}

/**
 * Services
 */
export interface Services {
  service:Array<Service>;
}

/**
 * Service
 */
export interface Service extends Element {
  operations:Operations;
}
/**
 * Operations
 */
export interface Operations {
  operation:Array<Operation>;
}
/**
 * Operation
 */
export interface Operation extends Element {
  operationName:string
}

