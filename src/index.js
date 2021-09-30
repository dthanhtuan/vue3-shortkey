const vueHotKey = () => {
  const mapFunctions = {};
  let elementAvoided = [];

  const commandKeys = { shift: 'shift', ctrl: 'ctrl', meta: 'meta', alt: 'alt' };
  const commandKeysVals = Object.keys(commandKeys);

  return {
    parseValue(originValue) {
      const value = typeof originValue === 'string' ? JSON.parse(originValue.replace(/'/gi, '"')) : originValue;
      if (value instanceof Array) {
        return { '': value };
      }
      return value;
    },
    createShortcutIndex(pKey) {
      let k = '';
      if (pKey.key === 'Shift' || pKey.shiftKey) {
        k += 'shift';
      }
      if (pKey.key === 'Control' || pKey.ctrlKey) {
        k += 'ctrl';
      }
      if (pKey.key === 'Meta' || pKey.metaKey) {
        k += 'meta';
      }
      if (pKey.key === 'Enter') {
        k += 'enter';
      }
      if (pKey.key === ' ') {
        k += 'space';
      }
      if ((pKey.key && pKey.key !== ' ' && pKey.key.length === 1) || /F\d{1,2}|\//g.test(pKey.key))
        k += pKey.key.toLowerCase();
      return k;
    },
    focusedElementFunction(el) {
      return mapFunctions[el.id];
    },
    dispatchShortkeyEvent(keyFunction) {
      const e = new CustomEvent('shortkey', { bubbles: false });
      if (keyFunction.key) e.srcKey = keyFunction.key;
      const elm = keyFunction.el;
      elm.dispatchEvent(e);
    },
    decodeKey(pKey) {
      return this.createShortcutIndex(pKey);
    },
    encodeKey(pKey) {
      const shortKey = {};
      shortKey.shiftKey = pKey.includes(commandKeys.shift);
      shortKey.ctrlKey = pKey.includes(commandKeys.ctrl);
      shortKey.metaKey = pKey.includes(commandKeys.meta);
      shortKey.altKey = pKey.includes(commandKeys.alt);
      let indexedKeys = this.createShortcutIndex(shortKey);
      const vKey = pKey.filter((item) => !commandKeysVals.includes(item));
      indexedKeys += vKey.join('');
      return indexedKeys;
    },
    mappingFunctions({ value, el }) {
      const elementFunction = this.focusedElementFunction(el.id) || {};
      Object.keys(value).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          const k = this.encodeKey(value[key]);
          elementFunction[k] = { el, key };
          mapFunctions[el.id] = elementFunction;
        }
      });
    },
    availableElement(keyFunction) {
      const filterAvoided = !!elementAvoided.find(
          (selector) => document.activeElement && document.activeElement.matches(selector),
      );
      return !!keyFunction && !filterAvoided;
    },
    bindValue(value, vnode) {
      this.mappingFunctions({ value, el: vnode.el });
    },
    unbindValue(value, el) {
      const focusedElementFunction = this.focusedElementFunction(el);
      Object.keys(value).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          const k = this.encodeKey(value[key]);
          delete focusedElementFunction[k];
        }
      });
    },
    shortKeyInit(Vue, options) {
      elementAvoided = [...(options && options.prevent ? options.prevent : [])];
      const that = this;
      Vue.directive('shortkey', {
        beforeMount(el, binding, vnode) {
          // Mapping the command
          const value = that.parseValue(binding.value);
          that.bindValue(value, vnode);
          that.addEventListeners(el, that);
        },
        unmounted(el, binding, vnode) {
          const value = that.parseValue(binding.value);
          that.unbindValue(value, vnode.el);
        },
      });
    },
    addEventListeners(el, that) {
      el.addEventListener('keydown', (pKey) => {
        if (pKey.repeat) {
          return;
        }
        const focusedElementFunction = that.focusedElementFunction(el);
        const decodedKey = that.decodeKey(pKey);
        if (decodedKey !== 'Enter' && decodedKey.length === 1) {
          return;
        }
        const keyFunction = focusedElementFunction[decodedKey];
        if (that.availableElement(keyFunction)) {
          pKey.preventDefault();
          pKey.stopPropagation();
          that.dispatchShortkeyEvent(keyFunction);
        }
      });
    },
  };
};

export default {
  install: (Vue, options) => {
    const hotkey = vueHotKey();
    hotkey.shortKeyInit(Vue, options);
  },
};
