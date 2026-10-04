declare module 'tracked-toolbox' {
  export function localCopy(path: string): PropertyDecorator;
  export function tracked(path: string): PropertyDecorator;
  export function dedupeTracked(): PropertyDecorator;
}
