import computeScrollIntoView from "compute-scroll-into-view";

/** scrollIntoView takes advantage of WebKit/Chromium's `scrollIntoViewIfNeeded` function, with fallback to the standard `scrollIntoView` */
export function scrollIntoView(element: HTMLElement) {
    // this code needs to take the title bar view into account when scrolling... hmmm how to do so?
  
    try {
      const actions = computeScrollIntoView(element, {
        scrollMode: "if-needed",
        block: "nearest",
        inline: "nearest",
      });
  
      setTimeout(() => {
        actions.forEach(({ el, top, left }) => {
          el.scrollTop = top;
          el.scrollLeft = left;
        });
      });
    } catch {}
  }
  