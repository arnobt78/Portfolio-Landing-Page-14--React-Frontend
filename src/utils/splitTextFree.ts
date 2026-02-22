/**
 * Free SplitText replacement: splits text into chars/words/lines for GSAP animations.
 * Compatible with ScrollTrigger-only setup (no paid GSAP plugins).
 */

export interface SplitResult {
  chars: HTMLElement[];
  words: HTMLElement[];
  lines: HTMLElement[];
  revert: () => void;
}

export type SplitType = "chars,lines" | "lines,words";

export interface SplitOptions {
  type: SplitType;
  linesClass?: string;
}

function splitElement(
  el: HTMLElement,
  type: SplitType,
  linesClass: string
): SplitResult {
  const originalHTML = el.innerHTML;
  const result: SplitResult = {
    chars: [],
    words: [],
    lines: [],
    revert: () => {
      el.innerHTML = originalHTML;
    },
  };

  if (type === "chars,lines") {
    let lineTexts: string[];
    if (originalHTML.toLowerCase().includes("<br")) {
      // Parse lines by <br /> so we always respect explicit line breaks
      lineTexts = originalHTML
        .split(/<br\s*\/?>/i)
        .map((part) => {
          const div = document.createElement("div");
          div.innerHTML = part;
          return (div.textContent ?? "").trim();
        })
        .filter(Boolean);
    } else {
      const text = el.innerText ?? el.textContent ?? "";
      lineTexts = text.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
    }
    if (lineTexts.length === 0) lineTexts = [""];
    const container = document.createElement("div");
    container.style.cssText = "display:block; width:100%";
    const allSpans: HTMLElement[] = [];
    const lineDivs: HTMLElement[] = [];
    for (const lineText of lineTexts) {
      const lineDiv = document.createElement("div");
      lineDiv.className = linesClass;
      lineDiv.style.overflow = "hidden";
      for (const char of lineText) {
        const span = document.createElement("span");
        span.style.display = "inline-block";
        span.textContent = char === " " ? "\u00A0" : char;
        lineDiv.appendChild(span);
        allSpans.push(span);
      }
      container.appendChild(lineDiv);
      lineDivs.push(lineDiv);
    }
    el.innerHTML = "";
    el.appendChild(container);
    result.chars = allSpans;
    result.lines = lineDivs;
  } else {
    const text = el.textContent ?? "";
    const words = text.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return result;
    const container = document.createElement("div");
    container.style.cssText = "display:block; width:100%";
    for (const word of words) {
      const span = document.createElement("span");
      span.style.display = "inline-block";
      span.style.whiteSpace = "pre";
      span.textContent = word + " ";
      container.appendChild(span);
    }
    el.innerHTML = "";
    el.appendChild(container);
    void el.offsetHeight;
    const wordSpans = Array.from(container.querySelectorAll("span")) as HTMLElement[];
    let lastTop = wordSpans[0].getBoundingClientRect().top;
    const lineGroups: HTMLElement[][] = [];
    let currentLine: HTMLElement[] = [];
    for (const span of wordSpans) {
      const top = span.getBoundingClientRect().top;
      if (currentLine.length > 0 && top !== lastTop) {
        lineGroups.push(currentLine);
        currentLine = [];
        lastTop = top;
      }
      currentLine.push(span);
    }
    if (currentLine.length) lineGroups.push(currentLine);
    container.innerHTML = "";
    const lineDivs: HTMLElement[] = [];
    for (const group of lineGroups) {
      const div = document.createElement("div");
      div.className = linesClass;
      div.style.overflow = "hidden";
      group.forEach((s) => div.appendChild(s));
      container.appendChild(div);
      lineDivs.push(div);
    }
    result.words = wordSpans;
    result.lines = lineDivs;
  }
  return result;
}

/**
 * Split one or more elements. Selector can be a string or array of strings.
 * Returns combined chars/words/lines and a single revert that restores all.
 */
export function splitText(
  selector: string | string[],
  options: SplitOptions
): SplitResult {
  const linesClass = options.linesClass ?? "split-line";
  const type = options.type;
  const elements = Array.isArray(selector)
    ? selector.flatMap((s) => Array.from(document.querySelectorAll<HTMLElement>(s)))
    : Array.from(document.querySelectorAll<HTMLElement>(selector));
  const results = elements.map((el) => splitElement(el, type, linesClass));
  return {
    chars: results.flatMap((r) => r.chars),
    words: results.flatMap((r) => r.words),
    lines: results.flatMap((r) => r.lines),
    revert: () => results.forEach((r) => r.revert()),
  };
}

/**
 * Split a single element (for use in scroll-triggered sections where we store split on the element).
 */
export function splitSingleElement(
  el: HTMLElement,
  options: SplitOptions
): SplitResult {
  const linesClass = options.linesClass ?? "split-line";
  return splitElement(el, options.type, linesClass);
}
