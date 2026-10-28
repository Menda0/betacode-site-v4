/*
 * Betacode redesign: tiny standalone runtime for the exported prototype pages.
 * It renders the page template (<template id="dc-tpl">) with React, using the
 * page logic class (<script type="text/x-dc-logic">). This file only exists to
 * make the exported HTML interactive; the production site should be rebuilt as
 * real components (see IMPLEMENTATION.md).
 */
(function () {
  'use strict';
  var h = React.createElement;
  var ROOT = window.DC_ROOT || '';

  // ---------- link mapping (prototype artboards + live-site URLs -> local files)
  var ART = {
    'Main': 'index.html', 'Dark': 'index.html', 'Pricing': 'pricing.html', 'PricingDark': 'pricing.html',
    'Ventures': 'betacode-ventures.html', 'VenturesDark': 'betacode-ventures.html',
    'Insights': 'insights.html', 'InsightsDark': 'insights.html', 'Contact': 'contact.html', 'ContactDark': 'contact.html',
    'ArtAgentic': 'insights/the-agentic-era-of-software.html',
    'ArtCofounder': 'insights/why-startups-need-a-technical-co-founder.html',
    'ArtStack': 'insights/building-applications-with-javascript-typescript-as-the-backbone.html',
    'ArtLean': 'insights/why-lean-startup-is-the-rosetta-stone-of-betacode.html',
    'ArtLegacy': 'insights/how-to-transform-legacy-software-into-a-modern-product.html',
    'ArtMvp': 'insights/how-to-build-an-mvp-in-3-months.html',
    'ArtAi': 'insights/how-ai-can-help-you-create-your-next-project.html'
  };
  var SITE = { '': 'index.html', 'pricing': 'pricing.html', 'betacode-ventures': 'betacode-ventures.html', 'insights': 'insights.html', 'contact': 'contact.html' };
  function mapHref(v) {
    if (typeof v !== 'string') return v;
    var m = v.match(/^\/?([A-Za-z]+)\.dc\.html(#.*)?$/);
    if (m && ART[m[1]]) return ROOT + ART[m[1]] + (m[2] || '');
    m = v.match(/^https?:\/\/(?:www\.)?betacode\.tech\/(?:pt|en)\/?([^?#]*)(#.*)?$/);
    if (m) {
      var p = m[1].replace(/\/$/, '');
      if (SITE[p] !== undefined) return ROOT + SITE[p] + (m[2] || '');
      if (/^insights\/[\w-]+$/.test(p)) return ROOT + p + '.html';
    }
    return v;
  }

  // ---------- template helpers
  var LIT = { 'true': true, 'false': false, 'null': null, 'undefined': undefined };
  function lookup(path, scope) {
    path = path.trim();
    if (path in LIT) return LIT[path];
    if (/^-?\d+(\.\d+)?$/.test(path)) return Number(path);
    if (/^(['"]).*\1$/.test(path)) return path.slice(1, -1);
    var parts = path.split('.'), v = scope;
    for (var i = 0; i < parts.length; i++) { if (v == null) return undefined; v = v[parts[i]]; }
    return v;
  }
  var WHOLE = /^\s*\{\{([^{}]+)\}\}\s*$/, ANY = /\{\{([^{}]+)\}\}/g;
  function interp(s, scope) {
    return s.replace(ANY, function (_, p) { var v = lookup(p, scope); return v == null ? '' : String(v); });
  }
  function camel(s) { return s.replace(/-([a-z])/g, function (_, c) { return c.toUpperCase(); }); }
  function parseStyle(s) {
    var out = {}, buf = '', depth = 0, parts = [];
    for (var i = 0; i < s.length; i++) {
      var c = s[i];
      if (c === '(') depth++; else if (c === ')') depth--;
      if (c === ';' && depth === 0) { parts.push(buf); buf = ''; } else buf += c;
    }
    parts.push(buf);
    parts.forEach(function (d) {
      var k = d.indexOf(':'); if (k < 0) return;
      var name = d.slice(0, k).trim(), val = d.slice(k + 1).trim();
      if (!name) return;
      if (name.indexOf('--') === 0) out[name] = val;
      else if (name.indexOf('-webkit-') === 0) out['Webkit' + camel(name.slice(8)).replace(/^./, function (x) { return x.toUpperCase(); })] = val;
      else out[camel(name)] = val;
    });
    return out;
  }
  var ATTR = { 'class': 'className', 'for': 'htmlFor', 'tabindex': 'tabIndex', 'readonly': 'readOnly', 'maxlength': 'maxLength',
    'minlength': 'minLength', 'autocomplete': 'autoComplete', 'autofocus': 'autoFocus', 'novalidate': 'noValidate', 'inputmode': 'inputMode',
    'enterkeyhint': 'enterKeyHint', 'spellcheck': 'spellCheck', 'srcset': 'srcSet', 'crossorigin': 'crossOrigin', 'colspan': 'colSpan',
    'rowspan': 'rowSpan', 'datetime': 'dateTime', 'contenteditable': 'contentEditable', 'xlink:href': 'xlinkHref', 'xml:space': 'xmlSpace',
    'referrerpolicy': 'referrerPolicy', 'fetchpriority': 'fetchPriority', 'playsinline': 'playsInline' };
  var EVT = { click: 'Click', input: 'Input', change: 'Change', submit: 'Submit', keydown: 'KeyDown', keyup: 'KeyUp', focus: 'Focus', blur: 'Blur',
    mouseenter: 'MouseEnter', mouseleave: 'MouseLeave', mouseover: 'MouseOver', mouseout: 'MouseOut', mousedown: 'MouseDown', mouseup: 'MouseUp',
    pointerdown: 'PointerDown', pointerup: 'PointerUp', pointermove: 'PointerMove', pointerenter: 'PointerEnter', pointerleave: 'PointerLeave',
    dblclick: 'DoubleClick', scroll: 'Scroll', wheel: 'Wheel', animationend: 'AnimationEnd', transitionend: 'TransitionEnd', load: 'Load', error: 'Error' };
  var BOOL = { disabled: 1, checked: 1, required: 1, hidden: 1, novalidate: 1, readonly: 1, multiple: 1, selected: 1, autofocus: 1, open: 1, playsinline: 1, muted: 1, autoplay: 1, loop: 1 };
  var FORM = { input: 1, textarea: 1, select: 1 };

  function attrsToProps(el, scope, key) {
    var props = { key: key }, tag = el.localName;
    for (var i = 0; i < el.attributes.length; i++) {
      var a = el.attributes[i], n = a.name, raw = a.value, v;
      if (n.indexOf('hint-') === 0) continue;
      var w = raw.match(WHOLE);
      v = w ? lookup(w[1], scope) : (raw.indexOf('{{') >= 0 ? interp(raw, scope) : raw);
      if (n.indexOf('on') === 0 && EVT[n.slice(2)]) {
        if (typeof v !== 'function') continue;
        var ev = EVT[n.slice(2)];
        if (ev === 'Input' && FORM[tag]) ev = 'Change';
        props['on' + ev] = v; continue;
      }
      if (n === 'style') { props.style = typeof v === 'string' ? parseStyle(v) : v; continue; }
      if (n === 'href' || n === 'action') v = mapHref(v);
      if (BOOL[n] && !w) v = true;
      if (v === undefined || v === null) continue;
      if (v === false && n.indexOf('aria-') !== 0) continue;
      var p = ATTR[n] || ((n.indexOf('aria-') === 0 || n.indexOf('data-') === 0) ? n : (n.indexOf('-') > 0 ? camel(n) : n));
      if (p === 'value' && tag === 'textarea') { props.value = v == null ? '' : v; continue; }
      props[p] = v;
    }
    if (FORM[tag] && 'value' in props && !props.onChange) props.onChange = function () {};
    return props;
  }

  function renderNodes(nodes, scope, prefix) {
    var out = [];
    for (var i = 0; i < nodes.length; i++) {
      var r = renderNode(nodes[i], scope, prefix + '.' + i);
      if (r === null || r === undefined) continue;
      if (Array.isArray(r)) out.push.apply(out, r); else out.push(r);
    }
    return out;
  }
  function renderNode(n, scope, key) {
    if (n.nodeType === 3) {
      var t = n.nodeValue;
      if (t.indexOf('{{') < 0) return t;
      var w = t.match(WHOLE);
      if (w) { var v = lookup(w[1], scope); return v == null ? '' : String(v); }
      return interp(t, scope);
    }
    if (n.nodeType !== 1) return null;
    var tag = n.localName;
    if (tag === 'helmet') return null;
    if (tag === 'sc-if') {
      var c = n.getAttribute('value'), m = c && c.match(WHOLE), val = m ? lookup(m[1], scope) : c;
      return val ? h(React.Fragment, { key: key }, renderNodes(n.childNodes, scope, key)) : null;
    }
    if (tag === 'sc-for') {
      var lm = (n.getAttribute('list') || '').match(WHOLE), list = lm ? lookup(lm[1], scope) : [];
      var as = n.getAttribute('as') || 'item';
      if (!list || !list.length) return null;
      return list.map(function (item, idx) {
        var s = Object.create(scope); s[as] = item; s.$index = idx;
        return h(React.Fragment, { key: key + ':' + idx }, renderNodes(n.childNodes, s, key + ':' + idx));
      });
    }
    var kids = renderNodes(n.childNodes, scope, key);
    var props = attrsToProps(n, scope, key);
    if (tag === 'textarea') kids = [];
    if (tag === 'style') { props.dangerouslySetInnerHTML = { __html: n.textContent }; kids = []; }
    return h.apply(null, [tag, props].concat(kids.length ? kids : []));
  }

  // ---------- DCLogic base class
  var TPL = document.getElementById('dc-tpl');
  function DCLogic(props) { React.Component.call(this, props); this.state = this.state || {}; }
  DCLogic.prototype = Object.create(React.Component.prototype);
  DCLogic.prototype.constructor = DCLogic;
  DCLogic.prototype.renderVals = function () { return {}; };
  DCLogic.prototype.render = function () {
    var vals = this.renderVals() || {};
    var st = this.state || {}, pr = this.props || {};
    window.__dcCur = { lang: st.lang || pr.lang || 'pt', theme: st.theme || pr.theme || 'light' };
    return h(React.Fragment, null, renderNodes(TPL.content.childNodes, vals, 'r'));
  };
  window.DCLogic = DCLogic;

  // keep language/theme when navigating between exported pages
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || !window.__dcCur) return;
    var href = a.getAttribute('href');
    if (!/\.html(#.*)?$/.test(href) || /^https?:/.test(href)) return;
    var parts = href.split('#');
    a.setAttribute('href', parts[0] + '?lang=' + window.__dcCur.lang + '&theme=' + window.__dcCur.theme + (parts[1] ? '#' + parts[1] : ''));
  }, true);

  // ---------- boot
  var code = document.querySelector('script[type="text/x-dc-logic"]').textContent;
  var Component = new Function('DCLogic', 'React', code + '\nreturn Component;')(DCLogic, React);
  var q = new URLSearchParams(location.search), props = Object.assign({}, window.DC_PROPS || {});
  if (q.get('lang') === 'en' || q.get('lang') === 'pt') props.lang = q.get('lang');
  if (q.get('theme') === 'dark' || q.get('theme') === 'light') props.theme = q.get('theme');
  var rootEl = document.getElementById('root');
  ReactDOM.createRoot(rootEl).render(h(Component, props));
  // match the browser canvas to the page background (avoids white overscroll in dark mode)
  setInterval(function () {
    var f = rootEl.firstElementChild; if (!f) return;
    var bg = getComputedStyle(f).backgroundColor;
    if (bg && bg !== 'rgba(0, 0, 0, 0)' && document.body.style.background !== bg) document.body.style.background = bg;
    if (window.__dcCur) document.documentElement.lang = window.__dcCur.lang;
  }, 300);
  if (location.hash) setTimeout(function () { var t = document.getElementById(location.hash.slice(1)); if (t) t.scrollIntoView(); }, 400);
})();
