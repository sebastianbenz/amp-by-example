import './preview.css'
import header from './header.html'

const PREVIEW_REQUEST_URL = 'playground/preview/';


export default class Preview {

  constructor(container) {
    this.previewContainer = container;
    this.createHeader();
  }

  createHeader() {
    const closeButton = this.previewContainer.querySelector('#preview-header-close');
    closeButton.addEventListener('click', () => this.onCloseCallBack());
  }

  createIframe() {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('frameBorder', '0');
    iframe.setAttribute('id', 'previewIframe');
    iframe.setAttribute('title', 'AMP Playground Output');
    return iframe;
  }

  refresh(documentString) {
    window.requestAnimationFrame(() => {
      console.log('update preview');
      this.state = this.saveState(this.previewIframe);
      this.updatePreview(documentString);
      this.restoreState(this.previewIframe, this.state);
    });
  }

  onClose(callback) {
    this.onCloseCallBack = callback;
  }

  updatePreview(documentString) {
    // create a new preview iframe
    this.previewIframe = this.createIframe();
    this.clearPreviews();
    this.previewContainer.appendChild(this.previewIframe);
    // create the preview
    let childDoc = this.previewIframe.contentDocument;
    const childWindow = this.getIframeWindow(this.previewIframe);
    if (!childDoc) childDoc = childWindow.document;
    childDoc.open();
    childDoc.write('');
    childDoc.write(documentString);
    childDoc.close();
  }

  getIframeWindow(iframeElement) {
    return iframeElement.contentWindow || iframeElement.contentDocument.parentWindow;
  }

  clearPreviews() {
    const childFrames = [].slice.call(this.previewContainer.getElementsByTagName('iframe'));
    childFrames.forEach(e => this.previewContainer.removeChild(e));
  }

  saveState(iframe) {
    if (!iframe) return {};
    const win = this.getIframeWindow(iframe);
    if (!win) return {};
    return {
      scroll: {
        x: win.scrollX,
        y: win.scrollY
      }
    };
  }

  restoreState(iframe, state) {
    if (!iframe) return {};
    const win = this.getIframeWindow(iframe);
    if (!win) return {};
    if (state.scroll) {
      win.scrollTo(state.scroll.x, state.scroll.y);
    }
  }
}
