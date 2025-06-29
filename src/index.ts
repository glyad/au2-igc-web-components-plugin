import { AppTask, DI, IContainer, Registration } from 'aurelia';
import { IgcValidateCustomAttribute } from './igc-validate';
import { setupTwoWayBinding } from './setup-two-way-binding';
export { AriaRoleHook } from './aria-role-hook';

export interface IIgcAdapterOptions {
  useIgcValidation?: boolean;
}

const defaultOptions: IIgcAdapterOptions = {
  // useIgcValidation: false
};

export const IIgcAdapterOptions = DI.createInterface<IIgcAdapterOptions>('IIgcAdapterOptions');

function createConfiguration(optionsProvider: (options: IIgcAdapterOptions) => void) {
  return {
    register(container: IContainer): void {
      const options = { ...defaultOptions };
      optionsProvider(options);

      container.register(
        Registration.instance(IIgcAdapterOptions, options),
        AppTask.creating(IContainer, container => setupTwoWayBinding(container)),        
        IgcValidateCustomAttribute
      );      

    },
    customize(cb: (options: IIgcAdapterOptions) => void) {
      return createConfiguration(cb);
    }
  };  
}

export const IgcAdapter = createConfiguration(() => {
  // Default configuration - no changes needed
});



