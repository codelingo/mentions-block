import MediumEditor from "medium-editor";
//import { history } from "../../../../store/configureStore";

declare const _mediumEditors: MediumEditor.MediumEditor[];

type WithAPI<T> = MediumEditor.MediumEditorExtensionAPI & T;

interface AnchorPreviewProps {
  hideDelay: number;
  previewValueSelector: string;
  showWhenToolbarIsVisible: boolean;
  showOnEmptyLinks: boolean;
  anchorPreview?: HTMLElement;
  anchorToPreview?: HTMLElement | null;
  activeAnchor?: HTMLElement | null;
  diffLeft: number;
  diffTop: number;
  lastOver: number;
  hovering: boolean | null;
  intervalTimer: number;
  instanceHandlePreviewMouseover:
    | ((this: WithAPI<this>, event: MouseEvent) => void)
    | null;
  instanceHandlePreviewMouseout:
    | ((this: WithAPI<this>, event: MouseEvent) => void)
    | null;
  instanceHandleAnchorMouseout:
    | ((this: WithAPI<this>, event: MouseEvent) => void)
    | null;
  handleClick(this: WithAPI<this>, event: MouseEvent): void;
  handlePreviewMouseover(this: WithAPI<this>): void;
  handlePreviewMouseout(this: WithAPI<this>, event: MouseEvent): void;
  handleAnchorMouseout(this: WithAPI<this>, event: MouseEvent): void;
  handleEditableMouseover(this: WithAPI<this>, event: MouseEvent): void;
  handlePositionedToolbar(this: WithAPI<this>): void;
  positionPreview(this: WithAPI<this>, activeAnchor?: HTMLElement | null): any;
  createPreview(this: WithAPI<this>): HTMLElement;
  getInteractionElements(this: WithAPI<this>): any;
  getPreviewElement(this: WithAPI<this>): any;
  showPreview(this: WithAPI<this>, anchorEl: HTMLElement): any;
  updatePreview(this: WithAPI<this>): any;
  hidePreview(this: WithAPI<this>): any;
  getTemplate(this: WithAPI<this>): any;
  attachToEditables(this: WithAPI<this>): any;
  attachPreviewHandlers(this: WithAPI<this>): any;
  detachPreviewHandlers(this: WithAPI<this>): any;
  hideOtherMediumEditorInstances(this: WithAPI<this>): any;
}

type NBAnchorPreviewType = WithAPI<
  MediumEditor.MediumEditorExtensionArgs<AnchorPreviewProps>
> &
  AnchorPreviewProps;

export const NBAnchorPreview =
  MediumEditor.Extension.extend<AnchorPreviewProps>({
    name: "nb-anchor-preview",

    // Anchor Preview Options

    /* hideDelay: [number]  (previously options.anchorPreviewHideDelay)
     * time in milliseconds to show the anchor tag preview after the mouse has left the anchor tag.
     */
    hideDelay: 375,

    /* previewValueSelector: [string]
     * the default selector to locate where to put the activeAnchor value in the preview
     */
    previewValueSelector: "a",

    /* showWhenToolbarIsVisible: [boolean]
     * determines whether the anchor tag preview shows up when the toolbar is visible
     */
    showWhenToolbarIsVisible: false,

    /* showOnEmptyLinks: [boolean]
     * determines whether the anchor tag preview shows up on links with href="" or href="#something"
     */
    showOnEmptyLinks: true,

    diffLeft: 0,
    diffTop: 0,
    hovering: false,
    intervalTimer: 0,
    lastOver: 0,
    instanceHandlePreviewMouseout: null,
    instanceHandleAnchorMouseout: null,
    instanceHandlePreviewMouseover: null,

    init() {
      this.anchorPreview = this.createPreview();

      this.attachToEditables();
    },

    getInteractionElements() {
      return this.getPreviewElement();
    },

    // TODO: Remove this function in 6.0.0
    getPreviewElement() {
      return this.anchorPreview;
    },

    createPreview() {
      var el = this.document.createElement("div");

      el.id = "medium-editor-anchor-preview-" + this.getEditorId();
      el.className = "medium-editor-anchor-preview";
      el.innerHTML = this.getTemplate();

      this.on(el, "click", this.handleClick.bind(this) as any);
      this.getEditorOption("elementsContainer").appendChild(el);
      return el;
    },

    getTemplate() {
      return (
        '<div class="medium-editor-toolbar-anchor-preview" id="medium-editor-toolbar-anchor-preview">' +
        '    <a class="medium-editor-toolbar-anchor-preview-inner" target="_blank"></a>' +
        "</div>"
      );
    },

    destroy() {
      if (this.anchorPreview) {
        if (this.anchorPreview.parentNode) {
          this.anchorPreview.parentNode.removeChild(this.anchorPreview);
        }
        delete this.anchorPreview;
      }
    },

    hidePreview() {
      if (this.anchorPreview) {
        this.anchorPreview.classList.remove(
          "medium-editor-anchor-preview-active"
        );
      }
      this.activeAnchor = null;
    },

    showPreview(anchorEl: HTMLElement) {
      const anchorPreview = this.anchorPreview;
      if (!anchorPreview) {
        return false;
      }

      if (
        anchorPreview.classList.contains(
          "medium-editor-anchor-preview-active"
        ) ||
        anchorEl.getAttribute("data-disable-preview")
      ) {
        return true;
      }

      if (this.previewValueSelector) {
        const anchorPreviewSelector = anchorPreview.querySelector(
          this.previewValueSelector
        ) as HTMLAnchorElement | null;
        if (anchorPreviewSelector) {
          const href = anchorEl.attributes.getNamedItem("href")?.value!;
          const isRootRelativeURL = href.match(/^\//);
          if (isRootRelativeURL) {
            anchorPreviewSelector.target = "";
            anchorPreviewSelector.onclick = function (e) {
              //history.push(href);
              e.preventDefault();
              e.stopPropagation();
            };
          }
          anchorPreviewSelector.textContent = href;
          anchorPreviewSelector.href = href;
        }
      }

      anchorPreview.classList.add("medium-toolbar-arrow-over");
      anchorPreview.classList.remove("medium-toolbar-arrow-under");

      if (
        !anchorPreview.classList.contains("medium-editor-anchor-preview-active")
      ) {
        anchorPreview.classList.add("medium-editor-anchor-preview-active");
      }

      this.activeAnchor = anchorEl;

      this.positionPreview();
      this.attachPreviewHandlers();
      this.hideOtherMediumEditorInstances();

      return this;
    },

    hideOtherMediumEditorInstances() {
      let extensionIndex = this.base.extensions.findIndex(
        (e) => e.name === this.name
      );
      for (let i = _mediumEditors.length - 1; i >= 0; i--) {
        const editor = _mediumEditors[i];
        if (!editor) break;
        if (editor === this.base) continue;

        const anchorPreviewExt: NBAnchorPreviewType =
          editor.extensions[extensionIndex];
        anchorPreviewExt?.hidePreview();
      }
    },

    positionPreview(activeAnchor?: HTMLElement | null) {
      if (!this.anchorPreview) {
        return;
      }

      activeAnchor = activeAnchor ?? this.activeAnchor;
      if (!activeAnchor) {
        return;
      }

      type Sized = { top: number; left: number; width: number; height: number };

      var containerWidth = this.window.innerWidth,
        buttonHeight = this.anchorPreview.offsetHeight,
        boundary: Sized = activeAnchor.getBoundingClientRect(),
        diffLeft = this.diffLeft,
        diffTop = this.diffTop,
        elementsContainer =
          this.getEditorOption<HTMLElement>("elementsContainer"),
        elementsContainerAbsolute =
          ["absolute", "fixed"].indexOf(
            window
              .getComputedStyle(elementsContainer)
              .getPropertyValue("position")
          ) > -1,
        relativeBoundary: Sized = { top: 0, left: 0, width: 0, height: 0 },
        halfOffsetWidth,
        defaultLeft,
        middleBoundary: number,
        elementsContainerBoundary: Sized,
        top;

      halfOffsetWidth = this.anchorPreview.offsetWidth / 2;
      var toolbarExtension = this.base.getExtensionByName("toolbar");
      if (toolbarExtension) {
        diffLeft = toolbarExtension.diffLeft;
        diffTop = toolbarExtension.diffTop;
      }
      defaultLeft = diffLeft - halfOffsetWidth;

      // If container element is absolute / fixed, recalculate boundaries to be relative to the container
      if (elementsContainerAbsolute) {
        elementsContainerBoundary = elementsContainer.getBoundingClientRect();
        for (const key of ["top", "left"] as const) {
          relativeBoundary[key] =
            boundary[key] - elementsContainerBoundary[key];
        }

        relativeBoundary.width = boundary.width;
        relativeBoundary.height = boundary.height;
        boundary = relativeBoundary;

        containerWidth = elementsContainerBoundary.width;

        // Adjust top position according to container scroll position
        top = elementsContainer.scrollTop;
      } else {
        // Adjust top position according to window scroll position
        top = this.window.pageYOffset;
      }

      middleBoundary = boundary.left + boundary.width / 2;
      top +=
        buttonHeight +
        boundary.top +
        boundary.height -
        diffTop -
        this.anchorPreview.offsetHeight;

      this.anchorPreview.style.top = Math.round(top) + "px";
      this.anchorPreview.style.right = "initial";
      if (middleBoundary < halfOffsetWidth) {
        this.anchorPreview.style.left = defaultLeft + halfOffsetWidth + "px";
        this.anchorPreview.style.right = "initial";
      } else if (containerWidth - middleBoundary < halfOffsetWidth) {
        this.anchorPreview.style.left = "auto";
        this.anchorPreview.style.right = "0";
      } else {
        this.anchorPreview.style.left = defaultLeft + middleBoundary + "px";
        this.anchorPreview.style.right = "initial";
      }
    },

    attachToEditables() {
      this.subscribe(
        "editableMouseover",
        this.handleEditableMouseover.bind(this)
      );
      this.subscribe(
        "positionedToolbar",
        this.handlePositionedToolbar.bind(this)
      );
    },

    handlePositionedToolbar() {
      // If the toolbar is visible and positioned, we don't need to hide the preview
      // when showWhenToolbarIsVisible is true
      if (!this.showWhenToolbarIsVisible) {
        this.hidePreview();
      }
    },

    handleClick(event) {
      var anchorExtension = this.base.getExtensionByName("anchor"),
        activeAnchor = this.activeAnchor;

      if (anchorExtension && activeAnchor) {
        event.preventDefault();

        this.base.selectElement(activeAnchor);

        // Using setTimeout + delay because:
        // We may actually be displaying the anchor form, which should be controlled by delay
        this.base.delay(
          function () {
            if (activeAnchor) {
              var opts = {
                value: activeAnchor.getAttribute("href"),
                target: activeAnchor.getAttribute("target"),
                buttonClass: activeAnchor.getAttribute("class")
              };
              anchorExtension.showForm(opts);
              activeAnchor = null;
            }
          }.bind(this)
        );
      }

      this.hidePreview();
    },

    handleAnchorMouseout() {
      if (!this.activeAnchor) {
        return;
      }
      this.anchorToPreview = null;
      this.off(
        this.activeAnchor,
        "mouseout",
        this.instanceHandleAnchorMouseout as any
      );
      this.instanceHandleAnchorMouseout = null;
    },

    handleEditableMouseover(event: MouseEvent) {
      var target = MediumEditor.util.getClosestTag(event.target, "a");

      if (false === target) {
        return;
      }

      // Detect empty href attributes
      // The browser will make href="" or href="#top"
      // into absolute urls when accessed as event.target.href, so check the html
      if (
        !this.showOnEmptyLinks &&
        (!/href=["']\S+["']/.test(target.outerHTML) ||
          /href=["']#\S+["']/.test(target.outerHTML))
      ) {
        return true;
      }

      // only show when toolbar is not present
      var toolbar = this.base.getExtensionByName("toolbar");
      if (
        !this.showWhenToolbarIsVisible &&
        toolbar &&
        toolbar.isDisplayed &&
        toolbar.isDisplayed()
      ) {
        return true;
      }

      // detach handler for other anchor in case we hovered multiple anchors quickly
      if (this.activeAnchor && this.activeAnchor !== target) {
        this.detachPreviewHandlers();
      }

      this.anchorToPreview = target;
      if (!this.anchorToPreview) {
        return;
      }

      this.instanceHandleAnchorMouseout = this.handleAnchorMouseout.bind(this);
      this.on(
        this.anchorToPreview,
        "mouseout",
        this.instanceHandleAnchorMouseout as any
      );
      // Using setTimeout + delay because:
      // - We're going to show the anchor preview according to the configured delay
      //   if the mouse has not left the anchor tag in that time
      this.base.delay(() => {
        if (this.anchorToPreview) {
          this.showPreview(this.anchorToPreview);
        }
      });
    },

    handlePreviewMouseover() {
      this.lastOver = new Date().getTime();
      this.hovering = true;
    },

    handlePreviewMouseout(event) {
      if (
        !event.relatedTarget ||
        !/anchor-preview/.test((event.relatedTarget as HTMLElement).className)
      ) {
        this.hovering = false;
      }
    },

    updatePreview() {
      if (this.hovering) {
        return true;
      }
      var durr = new Date().getTime() - this.lastOver;
      if (durr > this.hideDelay) {
        // hide the preview 1/2 second after mouse leaves the link
        this.detachPreviewHandlers();
      }
    },

    detachPreviewHandlers() {
      // cleanup
      clearInterval(this.intervalTimer);
      if (this.instanceHandlePreviewMouseover) {
        this.off(
          this.anchorPreview!,
          "mouseover",
          this.instanceHandlePreviewMouseover as any
        );
        this.off(
          this.anchorPreview!,
          "mouseout",
          this.instanceHandlePreviewMouseout as any
        );
        if (this.activeAnchor) {
          this.off(
            this.activeAnchor,
            "mouseover",
            this.instanceHandlePreviewMouseover as any
          );
          this.off(
            this.activeAnchor,
            "mouseout",
            this.instanceHandlePreviewMouseout as any
          );
        }
      }

      this.hidePreview();

      this.hovering =
        this.instanceHandlePreviewMouseover =
        this.instanceHandlePreviewMouseout =
          null;
    },

    // TODO: break up method and extract out handlers
    attachPreviewHandlers() {
      this.lastOver = new Date().getTime();
      this.hovering = true;

      this.instanceHandlePreviewMouseover =
        this.handlePreviewMouseover.bind(this);
      this.instanceHandlePreviewMouseout =
        this.handlePreviewMouseout.bind(this);

      this.intervalTimer = window.setInterval(
        this.updatePreview.bind(this),
        200
      );

      this.on(
        this.anchorPreview!,
        "mouseover",
        this.instanceHandlePreviewMouseover as any
      );
      this.on(
        this.anchorPreview!,
        "mouseout",
        this.instanceHandlePreviewMouseout as any
      );
      this.on(
        this.activeAnchor!,
        "mouseover",
        this.instanceHandlePreviewMouseover as any
      );
      this.on(
        this.activeAnchor!,
        "mouseout",
        this.instanceHandlePreviewMouseout as any
      );
    }
  });
