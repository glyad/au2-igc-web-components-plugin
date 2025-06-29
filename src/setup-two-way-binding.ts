import { IContainer, IAttrMapper, NodeObserverLocator } from 'aurelia';

/**
 * Configures two-way data binding and property observation for custom IGC web components
 * within the provided Aurelia dependency injection container.
 *
 * This function registers rules for determining which properties of specific IGC elements
 * should support two-way binding (such as `value` and `checked`), and
 * specifies which DOM events Aurelia should listen to in order to observe changes to those
 * properties (typically `igcChange` and `igcInput`).
 *
 * @param container - The Aurelia dependency injection container used to resolve
 *   `IAttrMapper` and `NodeObserverLocator` services for binding configuration.
 */
export function setupTwoWayBinding(container: IContainer) {
  const attrMapper = container.get(IAttrMapper);
  const nodeObserverLocator = container.get(NodeObserverLocator);
  attrMapper.useTwoWay((el, property) => {
    switch (el.tagName) {
      case 'IGC-CALENDAR':
        return property === 'value' || property === 'values';
      case 'IGC-DATE-PICKER':
      case 'IGC-DATE-TIME-INPUT':
      case 'IGC-FILE-INPUT':
      case 'IGC-INPUT':
      case 'IGC-MASK-INPUT':
      case 'IGC-RATING':
      case 'IGC-SELECT':
      case 'IGC-SLIDER':
      case 'IGC-TEXTAREA':
        return property === 'value';
      case 'IGC-CHECKBOX':
      case 'IGC-RADIO':
      case 'IGC-SWITCH':
        return property === 'checked';
      case 'IGC-RANGE-SLIDER':
        return property === 'lower' || property === 'upper';
      default:
        return false;
    };
  });

  // Teach Aurelia what events to use to observe properties of elements.
  // Because FAST components all use a single change event to notify,
  // we can use a single common object
  const valuePropertyConfig = { events: ['igcChange', 'igcInput'] };
  nodeObserverLocator.useConfig({
    'IGC-CALENDAR': {
      value: valuePropertyConfig,
      values: valuePropertyConfig
    },
    'IGC-DATE-PICKER': {
      value: valuePropertyConfig
    },
    'IGC-DATE-TIME-INPUT': {
      value: valuePropertyConfig
    },
    'IGC-FILE-INPUT': {
      value: valuePropertyConfig
    },
    'IGC-INPUT': {
      value: valuePropertyConfig
    },
    'IGC-MASK-INPUT': {
      value: valuePropertyConfig
    },
    'IGC-CHECKBOX': {
      checked: valuePropertyConfig
    },
    'IGC-RATING': {
      value: valuePropertyConfig
    },
    'IGC-SELECT': {
      value: valuePropertyConfig
    },
    'IGC-SLIDER': {
      value: valuePropertyConfig
    },
    'IGC-TEXTAREA': {
      value: valuePropertyConfig
    },
    'IGC-RANGE-SLIDER': {
      lower: valuePropertyConfig,
      upper: valuePropertyConfig
    },
    'IGC-SWITCH': {
      checked: valuePropertyConfig
    }
  });


}
