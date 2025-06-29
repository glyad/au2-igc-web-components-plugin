import { ITemplateCompilerHooks } from "aurelia";

/**
 * Implements the `ITemplateCompilerHooks` interface to automatically set appropriate ARIA roles
 * on custom elements within an HTML template during the compilation phase.
 *
 * - Adds `role="button"` to all `<igc-button>` elements that do not already have a `role` attribute or property.
 * - Adds `role="textbox"` to all `<igc-input type="text">` elements that do not already have a `role` attribute or property.
 *
 * This ensures better accessibility support for custom components by providing correct ARIA roles.
 * 
 * @usage
 * This hook should be registered in the Aurelia application configuration to ensure it is invoked 
 * during the template compilation process.
 * 
 * @remark
 * This hook is implemented partially and should provide roles for all IgniteUI Web Components in the future.
 */
export class AriaRoleHook implements ITemplateCompilerHooks {

  public constructor() {}

  public compiling?(template: HTMLTemplateElement) {
    const buttons = template.content.querySelectorAll('igc-button');
    for (const button of buttons) {
      if (!button.hasAttribute('role')) {
        button.setAttribute('role', 'button');
      }
      if (!button.role) {
        button.role = 'button'; // Ensure role is set in the property
      }
    }
    const inputs = template.content.querySelectorAll('igc-input[type="text"]');
    for (const input of inputs) {
      if (!input.hasAttribute('role')) {
        input.setAttribute('role', 'textbox');
      }
      if (!input.role) {
        input.role = 'textbox'; // Ensure role is set in the property
      }
    }
  }
}
