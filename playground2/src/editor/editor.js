import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';

import 'codemirror/lib/codemirror.js';
import 'codemirror/addon/selection/selection-pointer.js';
import 'codemirror/addon/selection/active-line.js';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/xml/xml.js';
import './editor.css';

import CodeMirror from 'codemirror';

const DEFAULT_DEBOUNCE_RATE = 500;

export default class Editor {

  constructor(container) {
    this.container = container;
    this.debounceRate = DEFAULT_DEBOUNCE_RATE;
    this.listeners = [];
    this.createCodeMirror();
    this.errorMarkers = [];
  }

  createCodeMirror() {
    const input = document.createElement('textarea');
    this.container.appendChild(input);
    this.codeMirror = CodeMirror.fromTextArea(input, {
      mode: "text/html",
      selectionPointer: true,
      styleActiveLine: true,
      lineNumbers: true,
      showCursorWhenSelecting: true,
      cursorBlinkRate: 300,
      gutters: ['CodeMirror-error-markers'],
      lint: true
    });
    //this.codeMirror.setSize('100%', '100%');
    this.codeMirror.on('changes', () => {
      console.log('editor input changed');
      if (this.timeout) {
        window.clearTimeout(this.timeout);
      }
      this.timeout = window.setTimeout(() => {
        this.notifyListeners();
        this.debounceRate = DEFAULT_DEBOUNCE_RATE;
      }, this.debounceRate);
    });
  }

  setSource(text) {
    this.debounceRate = 0;  // Validate immediately.
    this.codeMirror.setValue(text);
  }

  getSource() {
      return this.codeMirror.getValue();
  }

  setCursorAndFocus(line, col) {
    this.codeMirror.setCursor(line-1, col, {'scroll': true});
    this.codeMirror.focus();
  }

  setValidationResult(validationResult) {
    this.codeMirror.clearGutter('CodeMirror-error-markers');
    this.codeMirror.operation(() => {
      validationResult.errors.forEach((error, index) => {
        const marker = document.createElement("div");
        const message = marker.appendChild(document.createElement("span"));
        message.appendChild(document.createTextNode(error.message));
        marker.className = "gutter-" + error.icon;
        this.codeMirror.setGutterMarker(error.line-1, 'CodeMirror-error-markers', marker);
      });
    });
  }

  addChangeListener(listener) {
    this.listeners.push(listener);
  }

  notifyListeners() {
    this.listeners.forEach(callback => callback(this));
  }

}

