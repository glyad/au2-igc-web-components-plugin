import { AriaRoleHook } from '../src/aria-role-hook';

describe('AriaRoleHook', () => {
  let ariaRoleHook: AriaRoleHook;
  let template: HTMLTemplateElement;

  beforeEach(() => {
    ariaRoleHook = new AriaRoleHook();
    template = document.createElement('template');
  });

  describe('compiling', () => {
    it('should add role="button" to igc-button elements without a role', () => {
      template.innerHTML = '<igc-button></igc-button>';
      
      ariaRoleHook.compiling!(template);
      
      const button = template.content.querySelector('igc-button');
      expect(button?.getAttribute('role')).toBe('button');
    });

    it('should not override existing role on igc-button elements', () => {
      template.innerHTML = '<igc-button role="menuitem"></igc-button>';
      
      ariaRoleHook.compiling!(template);
      
      const button = template.content.querySelector('igc-button');
      expect(button?.getAttribute('role')).toBe('menuitem');
    });

    it('should add role="textbox" to igc-input[type="text"] elements without a role', () => {
      template.innerHTML = '<igc-input type="text"></igc-input>';
      
      ariaRoleHook.compiling!(template);
      
      const input = template.content.querySelector('igc-input');
      expect(input?.getAttribute('role')).toBe('textbox');
    });

    it('should not override existing role on igc-input[type="text"] elements', () => {
      template.innerHTML = '<igc-input type="text" role="search"></igc-input>';
      
      ariaRoleHook.compiling!(template);
      
      const input = template.content.querySelector('igc-input');
      expect(input?.getAttribute('role')).toBe('search');
    });

    it('should handle multiple elements correctly', () => {
      template.innerHTML = `
        <div>
          <igc-button></igc-button>
          <igc-button role="menuitem"></igc-button>
          <igc-input type="text"></igc-input>
          <igc-input type="text" role="search"></igc-input>
        </div>
      `;
      
      ariaRoleHook.compiling!(template);
      
      const buttons = template.content.querySelectorAll('igc-button');
      expect(buttons[0].getAttribute('role')).toBe('button');
      expect(buttons[1].getAttribute('role')).toBe('menuitem');
      
      const inputs = template.content.querySelectorAll('igc-input');
      expect(inputs[0].getAttribute('role')).toBe('textbox');
      expect(inputs[1].getAttribute('role')).toBe('search');
    });

    it('should not affect other elements', () => {
      template.innerHTML = `
        <div>
          <button>Regular button</button>
          <input type="text">
          <igc-something></igc-something>
        </div>
      `;
      
      ariaRoleHook.compiling!(template);
      
      const button = template.content.querySelector('button');
      const input = template.content.querySelector('input');
      const something = template.content.querySelector('igc-something');
      
      expect(button?.hasAttribute('role')).toBe(false);
      expect(input?.hasAttribute('role')).toBe(false);
      expect(something?.hasAttribute('role')).toBe(false);
    });
  });
});
