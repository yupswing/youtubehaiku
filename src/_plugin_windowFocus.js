$(function () {
  // * Detect when the current window/tab get or lose focus in the browser
  // source: http://stackoverflow.com/questions/16529860/stop-animation-on-window-blur

  var hidden = "hidden";

  // Standards:
  if (hidden in document)
    document.addEventListener("visibilitychange", onchange);
  else if ((hidden = "mozHidden") in document)
    document.addEventListener("mozvisibilitychange", onchange);
  else if ((hidden = "webkitHidden") in document)
    document.addEventListener("webkitvisibilitychange", onchange);
  else if ((hidden = "msHidden") in document)
    document.addEventListener("msvisibilitychange", onchange);
  // IE 9 and lower:
  else if ("onfocusin" in document)
    document.onfocusin = document.onfocusout = onchange;
  // All others:
  else
    window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onchange;

  function onchange(evt) {
    var v = "visible",
      h = "hidden",
      evtMap = {
        focus: v,
        focusin: v,
        pageshow: v,
        blur: h,
        focusout: h,
        pagehide: h,
      };

    evt = evt || window.event;
    if (evt.type in evtMap) status = evtMap[evt.type];
    else status = this[hidden] ? "hidden" : "visible";
    window.isWindowFocused = status == "visible";
    if (status == "hidden" && window.onWindowBlur) window.onWindowBlur();
    if (status == "visible" && window.onWindowFocus) window.onWindowFocus();
  }

  // set the initial state (but only if browser supports the Page Visibility API)
  if (document[hidden] !== undefined)
    onchange({
      type: document[hidden] ? "blur" : "focus",
    });
});
