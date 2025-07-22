import { IIgcAdapterOptions } from "./index";
import { resolve } from "aurelia";
import { IHydratedController, INode } from "@aurelia/runtime-html";
import { IgcFormControl } from "igniteui-webcomponents/components/common/mixins/forms/types";
import {
  ValidationEvent,
  ValidationResultsSubscriber,
  ValidationResultTarget,
} from "@aurelia/validation-html";

/**
 * Custom attribute class that subscribes to validation events and manages custom validity messages
 * for form controls implementing the `IgcFormControl` interface.
 *
 * This class listens for validation events, updates the custom validity message on the associated
 * form control based on validation results, and ensures the control's validity state is reported.
 * It is intended to be used as a custom attribute in Aurelia applications.
 *
 * @implements {ValidationResultsSubscriber}
 */
export class IgcValidateCustomAttribute implements ValidationResultsSubscriber {
  private options: IIgcAdapterOptions = resolve(
    IIgcAdapterOptions
  ) as IIgcAdapterOptions;
  private element: HTMLElement = resolve(INode) as HTMLElement;
  private viewModel;

  handleValidationEvent(event: ValidationEvent): void {
    // This method is called when validation events occur
    const input: IgcFormControl = this.element as IgcFormControl;

    // You can handle specific validation events here if needed
    const invalidResultsTargets: ValidationResultTarget[] =
      event.addedResults.filter(
        (validationResultTarget: ValidationResultTarget) =>
          !validationResultTarget.result.valid
      );

    invalidResultsTargets.forEach(
      (validationResultTarget: ValidationResultTarget) =>
        validationResultTarget.targets.forEach((target: IgcFormControl) =>
          target.setCustomValidity(validationResultTarget.result.message)
        )
    );

    if (invalidResultsTargets.length === 0) {
      const validResultsTargets: ValidationResultTarget[] =
        event.addedResults.filter(
          (validationResultTarget: ValidationResultTarget) =>
            validationResultTarget.result.valid
        );

      validResultsTargets.forEach(
        (validationResultTarget: ValidationResultTarget) => {
          validationResultTarget.targets.forEach((target: IgcFormControl) => {
            target.setCustomValidity("");
            //target.reportValidity();
          });
        }
      );
    }

    input.reportValidity();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  bound(initiator: IHydratedController, _: IHydratedController) {
    this.viewModel = initiator.viewModel;
    if (!this.viewModel.validationController) {
      return;
    }
    this.viewModel.validationController.addSubscriber(this);
  }

  detaching() {
    this.viewModel.validationController.removeSubscriber(this);
  }
}
