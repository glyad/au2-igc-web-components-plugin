import { newInstanceForScope, resolve } from "@aurelia/kernel";
import { IValidationRules } from "@aurelia/validation";
import { IValidationController } from "@aurelia/validation-html";
import template from './my-app.html';
import styles from 'igniteui-webcomponents/themes/light/material.css';
import 'igniteui-webcomponents/themes/light/material.css';
import { customElement, shadowCSS } from "aurelia";
import { DialogService } from "@aurelia/dialog";
import { Alert } from "./alert";

interface Address {
  line1: string;
  line2?: string;
  city: string;
  pin: number;
}

class Person {
  public name: string = '';
  public age: number;
  public email: string;
  public pets: string[];
  public address: Address;
  public readonly validationRules: IValidationRules = resolve(IValidationRules) 
  
  public constructor() { 
    this.validationRules
      .on(this)
      .ensure('name')
        .minLength(2)
        .maxLength(4)
        .required();
  }
}

@customElement({
  name: 'my-app',
  template: template,
  dependencies: [shadowCSS(styles)],
})
export class MyApp {

  public person: Person = new Person();

  public constructor(
    readonly validationController: IValidationController = resolve(newInstanceForScope(IValidationController)),
    readonly dialogService: DialogService = resolve(DialogService)) {
    }
      
    public async openDefaultDialog() {
      await this.dialogService.open({ 
        component: () => Alert, 
        model: this.person, 
        keyboard: [ 'Escape', 'Enter' ], 
      overlayDismiss: true, 
        })        
        .whenClosed((result) => {
          console.log('Dialog Service Closed:', result);
        });
    }

}
