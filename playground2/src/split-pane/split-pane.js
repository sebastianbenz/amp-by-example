export default class SplitPane {

  constructor(container) {
    this.container = container;
    const children = container.children;
    if (children.length !== 3) {
      console.error('webui-splitpane must have three children: left, handle, right');
      return;
    }
    // init panes & drag handle
    this._left = children[0];
    this._dragHandle = children[1];
    this._right = children[2];

    // register dragging listeners
    this._dragHandle.onmousedown = this._startResizing.bind(this);
    document.onmousemove = this._resizing.bind(this);
    document.onmouseup = this._endResizing.bind(this);

    // set initial size
    this._onResize();
    this._isResizing = false;
  }

  _startResizing(e) {
    this._isResizing = true;
    // disable pointer events for all children to avoid mouse events
    // being swallowed by the iframe and changing the editor scroll 
    // position
    this._setPointerEvent('none');
  }

  _resizing(e) {
    // we don't want to do anything if we aren't resizing.
    if (!this._isResizing) {
      return;
    }
    this._updateSize(e.clientX - this.container.getBoundingClientRect().left);
  }

  _endResizing(e) {
    // we don't want to do anything if we aren't resizing.
    if (!this._isResizing) {
      return;
    }
    this._isResizing = false;
    // re-enable pointer events for all children
    this._setPointerEvent('auto');
    // save the pane ratio
    this.ustomRatio = this._left.offsetWidth / this.offsetWidth;
  }

  _updateSize(size) {
    // adjust the panes size
    this._size = size;
    window.requestAnimationFrame(this._updatePanes.bind(this));
  }

  _updatePanes(timestamp) {
    this._left.style.width = this._size + 'px';
    this._right.style.width = '' + (this.container.offsetWidth - this._size - this._dragHandle.offsetWidth) + 'px';
  }

  _setPointerEvent(value) {
    const children = this.container.getElementsByTagName("*");
    for (let i = 0; i < children.length; i++) {
      children[i].style['pointer-events'] = value;
    };
  }

  _onResize() {
    if (!this.ratio) {
      return;
    }
    this._updateSize(this.offsetWidth * this.ratio);
  }

  _localStorageLoad() {
    if (this.customRatio) {
      this.ratio = this.customRatio;
      this._onResize();
    }
  }
}
