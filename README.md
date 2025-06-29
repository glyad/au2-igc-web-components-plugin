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
