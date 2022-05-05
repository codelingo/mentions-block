declare namespace MediumEditor {
    declare interface MediumEditor {
      Extension: {
        extend<P>(args: MediumEditorExtensionArgs<P> & P);
      };
  
      extensions: any[];
  
      util: {
        getClosestTag(element: EventTarget | null, nodeType: string);
      };
    }
  
    type MediumEditorExtensionArgs<P> = {
      readonly name?: string;
      init?(this: MediumEditorExtensionAPI & P);
      destroy?(this: MediumEditorExtensionAPI & P);
      checkState?(this: MediumEditorExtensionAPI & P, handler: CheckStateHandlerFn);
    };
  
    type MediumEditorExtensionAPI = {
      readonly name: string;
      readonly base: MediumEditor.MediumEditor;
      document: Document;
      window: Window;
      getEditorElements(this: MediumEditorExtensionArgs): HTMLElement[];
      getEditorId(this: MediumEditorExtensionArgs): string;
      getEditorOption<T = any>(this: MediumEditorExtensionArgs, option: string): T;
      on(
        targets: HTMLElement | NodeList,
        event: string,
        listener: EventListenerOrEventListenerObject,
        useCapture?: boolean
      ): MediumEditor;
      off(
        targets: HTMLElement | NodeList,
        event: string,
        listener: EventListenerOrEventListenerObject,
        useCapture?: boolean
      ): MediumEditor;
      subscribe(name: string, listener: (data: any, editable: HTMLElement) => void): MediumEditor;
      unsubscribe(name: string, listener: (data: any, editable: HTMLElement) => void): MediumEditor;
    };
  
    type CustomExtensionType<T> = MediumEditorExtensionInstance<T>;
  
    type CheckStateHandlerFn = (node: Node) => any;
  }
  