import { newInstanceForScope, newInstanceOf, resolve } from "@aurelia/kernel";
import { IValidationRules } from "@aurelia/validation";
import { IValidationController } from "@aurelia/validation-html";
import { customElement, shadowCSS } from "aurelia";
import { DialogService } from "@aurelia/dialog";
import { required, maxLength, minLength, displayName } from 'aurelia-validation-decorators'
import { Alert } from "./alert";
import template from './my-app.html';
import styles from 'igniteui-webcomponents/themes/light/material.css';

interface Address {
  line1: string;
  line2?: string;
  city: string;
  pin: number;
}

class Person {
  protected readonly validationRules: IValidationRules = resolve(newInstanceOf(IValidationRules));
  @required({message: 'Name is required.' })
  @minLength(2, {when: (value: Person) => { 
    return value.age > 0; } })
  @maxLength(4)
  @displayName('Full Name')
  public name: string = '';
  public age: number = 1;
  public email: string;
  public pets: string[];
  public address: Address;
  
}

@customElement({
  name: 'my-app',
  template: template,
  dependencies: [shadowCSS(styles)],
})
export class MyApp {

  public person: Person = new Person();

  public constructor(
    protected readonly validationController: IValidationController = resolve(newInstanceForScope(IValidationController)),
    private readonly dialogService: DialogService = resolve(DialogService)) {
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
