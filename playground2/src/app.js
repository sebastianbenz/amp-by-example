import './app.critical.css';
import Editor from './editor/editor.js';
import Preview from './preview/preview.js';
import Validator from './validator/validator.js';
import ErrorList from './error-list/error-list.js';
import Fab from './fab/fab.js';
import SplitPane from './split-pane/split-pane.js';
import runtime from './runtime/runtimes.js';

let activeRuntime = runtime.AMPHTML;
const editor = new Editor(document.getElementById('source'));
const splitPane = new SplitPane(document.querySelector('main'));
const preview = new Preview(document.getElementById('preview'));
const validator = new Validator(activeRuntime);

const errorIndicator = document.getElementById('error-indicator');
const errorListContainer = document.getElementById('error-list');
const errorList = new ErrorList(errorListContainer, errorIndicator);
errorList.addEventListener(error => {
  editor.setCursorAndFocus(error.line, error.col);
});


if(navigator.serviceWorker) {
  window.onload = () => {
    console.log('registering service worker');
    navigator.serviceWorker.register('sw.js')
      .catch(function(err) {
        console.error('Unable to register service worker.', err);
      });
  };
}

// runtime select
const runtimeSelector = document.getElementById('runtime');
runtimeSelector.addEventListener('change', () => {
  const newRuntime = runtime[runtimeSelector.value];
  if (!newRuntime) {
    console.error('unknown runtime: ' + newRuntime);
    return;
  }
  activeRuntime = newRuntime;
  validator.setRuntime(activeRuntime);
  validator.validate(editor.getSource());
});

// configure editor
editor.addChangeListener((editor) => {
  preview.refresh(editor.getSource());
  validator.validate(editor.getSource());
});
editor.setSource(activeRuntime.template);

// configure preview
const previewPanel = document.getElementById('preview');
const showPreview = new Fab(document.body, '▶', () => {
  previewPanel.classList.add('show');
  history.pushState({}, 'Source', '#preview');
});

preview.onClose(() => {
  history.back();
});

showPreview.show();

window.onpopstate = event => {
  if (!window.location.pathname.endsWith('#preview')) {
    previewPanel.classList.remove('show');
    showPreview.show();
  }
};

// configure validator
validator.addEventListener(validationResult => {
  errorList.update(validationResult);
  editor.setValidationResult(validationResult);
  window.requestAnimationFrame(() => {
    errorIndicator.classList.remove('waiting');
    if (validationResult.status == 'PASS') {
      errorIndicator.classList.add('pass');
      errorIndicator.innerHTML = 'valid';
    } else {
      errorIndicator.classList.remove('pass');
      errorIndicator.innerHTML = validationResult.errors.length + ' Errors ';
    }
  });
});



