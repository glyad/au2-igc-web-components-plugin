import { DialogCloseResult, DialogService, IDialogController, IDialogCustomElementViewModel } from "@aurelia/dialog";
import { resolve } from "@aurelia/kernel";
import { IgcDialogComponent } from "igniteui-webcomponents";

export class Alert  implements IDialogCustomElementViewModel {
  public dialog: IgcDialogComponent;

  constructor(readonly dialogService: DialogService = resolve(DialogService)){}
  
  $dialog: IDialogController;
  
  activate?: (model?: unknown) => void | Promise<void> = (model?: unknown) => {
    console.log('Dialog Activated with model:', model);
  };
  // canDeactivate?: (result: DialogCloseResult) => boolean | Promise<boolean>;
  deactivate?: (result: DialogCloseResult) => void | Promise<void> = (result: DialogCloseResult) => {
    console.log('Dialog Deactivated with result:', result);
  };

  async attached() {
    
    console.log('Dialog Opened');
    
  }

  detaching() {
    console.log('Dialog Detached');
  }

  async cancel() {
    console.log('Dialog Cancel Event Triggered');
    const result = await this.dialog.hide();
    console.log('Dialog Cancelled:', result, this.dialog.returnValue);
    await this.$dialog.cancel(DialogCloseResult.create('cancel', 'Пиздец!'));
  }
  async ok() {
    console.log('Dialog OK Event Triggered');
    const result = await this.dialog.hide();
    console.log('Dialog OKed:', result, this.dialog.returnValue);
    await this.$dialog.ok(DialogCloseResult.create('ok', 'Заебись!'));
  }

  
}
