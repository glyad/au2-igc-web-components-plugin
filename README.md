# Aurelia Ignite UI for Web Components™ Adapter

Helps you build Aurelia 2 applications using Ignite UI for Web Components™. With it you can:

- have two-way binding on Ignite UI web-components.

## Install

```shell
npm install aurelia-igc-web-components-adapter
```

or, if you want to directly use plugin's git repo,

```shell
npm install git@github.com:username/aurelia-igc-web-components-adapter.git
```

## Consume the plugin

In your `main.ts` or file, import the plugin and register it with Aurelia:

```ts
import Aurelia, { AppTask } from 'aurelia';
import { ValidationHtmlConfiguration, ValidationTrigger } from '@aurelia/validation-html';
import { defineAllComponents } from 'igniteui-webcomponents';
import { IgcAdapter } from 'aurelia-igc-web-components-adapter';
import { MyApp } from './my-app';

Aurelia
  // Load all exports from the plugin
  .register(IgcAdapter.customize((options) => {
    options.useIgcValidation = true; // Enable Igc validation
  }))
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

## Acknowledgements, Licenses, and Copyright Notices

This project is intended to be used with Ignite UI for Web Components™. The plugin is not affiliated with Infragistics, Inc. or its products and services. This project is licensed under the MIT License. The Ignite UI for Web Components™ library is licensed under the separate [Infragistics license](https://www.infragistics.com/products/ignite-ui-web-components/web-components/components/general-licensing#license-agreements-in-ignite-ui-for-web-components).

Copyright © 2023 David Kossoglyad
