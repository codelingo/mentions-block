import computeScrollIntoView from "compute-scroll-into-view";

import * as Remarkable from "remarkable";
// import type { CodeToken, OrderedListOpenToken } from "remarkable/lib";

// workaround Remarkable's types having `utils` at the wrong location :facepalm: (as at v2.0.1 @ 6-May-2021)
declare type EscapeHtml = typeof Remarkable.Remarkable.utils.escapeHtml;
const escapeHtml: EscapeHtml = (Remarkable as any).utils.escapeHtml;

const remarkable = new Remarkable.Remarkable({ html: true });
const rules = remarkable.renderer.rules;
rules.code = remarkableCodeRendererWithoutSpellcheck;
rules.ordered_list_open = remarkableOLRenderer;
rules.bullet_list_open = remarkableULRenderer;

/** custom renderer for <code> blocks detected by `backticked` code in markdown */
function remarkableCodeRendererWithoutSpellcheck(tokens: any[] /*CodeToken[]*/, i: number) {
  const content = escapeHtml(tokens[i].content!);
  if (tokens[i].block) {
    return `<pre><code spellcheck="false">${content}</code></pre>${rules.getBreak(tokens, i)}`;
  }
  return `<code spellcheck="false">${content}</code>`;
}

/** custom renderer for <ol> blocks in markdown */
function remarkableOLRenderer(tokens: any[] /*OrderedListOpenToken[]*/, i: number) {
  return `<ol class="list-decimal mx-4">`;
}

/** custom renderer for <ol> blocks in markdown */
function remarkableULRenderer(tokens: any[] /*OrderedListOpenToken[]*/, i: number) {
  return `<ul class="list-disc mx-4">`;
}

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
  

  export function inlineMarkdownToHTML(markdown: string): string {
    return remarkable.renderInline(markdown);
  }
  
  // export function blockMarkdownToHTML(markdown: string): string {
  //   return remarkable.render(markdown);
  // }
  
  export function fragmentToHTML(frag: DocumentFragment): string {
    const elem = document.createElement("div");
    elem.appendChild(frag);
    return elem.innerHTML;
  }