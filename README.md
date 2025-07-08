# Aurelia Ignite UI for Web Components™ Adapter

Helps you build Aurelia 2 applications using Ignite UI for Web Components™. With it you can:

- have two-way binding on Ignite UI web-components.

## Install

1. Install dependencies:

```bash
npm install @aurelia/validation @aurelia/validation-html igniteui-webcomponents
```

2. Install optional dependencies for Aurelia Dialog integration:

```bash
npm install @aurelia/dialog
```

3. Install the plugin:

```bash
npm install aurelia-igc-web-components-adapter
```

or, if you want to directly use plugin's git repo,

```bash
npm install git@github.com:glyad/aurelia-igc-web-components-adapter.git
```

## Learn, How to Use

> See `dev-app/` folder for a working example of the plugin usage.

## Consume the plugin

In your `main.ts` , import the plugin and register it with Aurelia:

```ts
import Aurelia, { AppTask } from 'aurelia';
import { ValidationHtmlConfiguration, ValidationTrigger } from '@aurelia/validation-html';
import { defineAllComponents } from 'igniteui-webcomponents';
import { IgcAdapter } from 'aurelia-igc-web-components-adapter';
import { MyApp } from './my-app';

Aurelia
  // Load all exports from the plugin
  .register(IgcAdapter.customize((options) => {}))
  .register(AppTask.activated(() => {
            defineAllComponents();
            // or register specific components:
            // defineComponents(IgcInputComponent, IgcButtonComponent, ...);
  }))
  .register(ValidationHtmlConfiguration.customize((options) => {
    options.DefaultTrigger = ValidationTrigger.change;
  }))

  // Rest of registrations goes here
  .app(MyApp)
  .start();
```

In your Aurelia component, you can now use Ignite UI for Web Components™ components with two-way binding:

```html
<igc-input value.bind="myValue"></igc-input>
```

Use standard `validate` binding behavior and igcValidation attribute to the component to enable validation messages defined in your Aurelia validation rules:

```html
<igc-input type="text" igc-validate value.bind="myValue & validate" label="My Value" validation-errors.from-view="errors">
  <span slot="helper-text">The text should be between 2 and 4 characters or less</span>
  <span slot="invalid"><span repeat.for="error of errors">${error.result.message}</span></span>
</igc-input>
```

## Recipes

### Using Ignite UI for Web Components™ Dialog component without Aurelia Dialog service

```html
<igc-dialog ref="dialog" title="Confirmation" close-on-outside-click.bind="false">
  <p>Are you sure you want to delete the Annual_Report_2016.pdf and Annual_Report_2017.pdf files?</p>
  <igc-button slot="footer" click.trigger="dialog.hide()" variant="flat">Cancel</igc-button>
  <igc-button slot="footer" click.trigger="dialog.hide()" variant="flat">OK</igc-button>
</igc-dialog>
```

### Using Ignite UI for Web Components™ Dialog component with Aurelia Dialog service

- TBD

## Acknowledgements, Licenses, and Copyright Notices

This project is intended to be used with Ignite UI for Web Components™. The plugin is not affiliated with Infragistics, Inc. or its products and services. This project is licensed under the MIT License. The Ignite UI for Web Components™ library is licensed under the separate [Infragistics license](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/general-licensing#license-agreements-in-ignite-ui-for-web-components).

Copyright © 2025 David Kossoglyad
