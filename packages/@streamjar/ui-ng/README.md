# StreamJar UI
@streamjar/ui is a package that backs all of our Angular 4+ based applications.

## Getting Started
Installing `@streamjar/ui` is relatively simple.

### Install package
> npm install @streamjar/ui --registry=https://npm.sjsrv.uk

### Configure Angular
Add the following to your assets in angular.json

```json
{
  "glob": "**/*",
  "input": "node_modules/@streamjar/ui-shared/assets",
  "output": "/assets"
}
```

Each module is exported separately, make sure to import what you need:

```ts
import  { ButtonModule }  from  '@streamjar/ui-ng';
```

Some modules have services or require overlays, for these you will
want to call .forRoot() in your base application, and import normally
at higher levels.

- TooltipModule
- FilterModule
- MenuModule
- InputModule
- ColourModule
- DialogModule

## Documentation
Inside this project in `/demo` you can find a demo angular-cli application which shows all components, what's available and examples on how to use them.
