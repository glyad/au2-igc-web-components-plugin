import Aurelia, { AppTask, ITemplateCompiler, TemplateCompilerHooks } from 'aurelia';
import { DefaultDialogDomRenderer, DefaultDialogEventManager, DialogConfiguration, DialogService  } from '@aurelia/dialog'
import { MyApp } from './my-app';
import { AriaRoleHook, IgcAdapter } from "../src/index";
import { ValidationHtmlConfiguration, ValidationTrigger } from '@aurelia/validation-html';
import { defineAllComponents } from 'igniteui-webcomponents';

Aurelia
  .register(AppTask.creating(ITemplateCompiler, compiler => compiler.debug = true))
  .register(TemplateCompilerHooks.define(AriaRoleHook))
  .register(IgcAdapter.customize((options) => {
    options.useIgcValidation = true; // Enable Igc validation
  }))
  .register(AppTask.activated(() => {
            defineAllComponents();
  }))
  .register(ValidationHtmlConfiguration.customize((options) => {
    options.DefaultTrigger = ValidationTrigger.change;
  }))
  .register(DialogConfiguration.customize((settins) => {
    settins.startingZIndex = 10001;   
  }), [DialogService, DefaultDialogDomRenderer, DefaultDialogEventManager])
  .app(MyApp)
  .start();
