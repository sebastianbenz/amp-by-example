/**
 * Fetches the AMP document at a given `src` URL and renders it via Shadow DOM.
 */
class AmpDocument {
  constructor(props) {

    this.props = props;
    this.win = props.win;

    window.AMP_SHADOW = true;
    /**
     * `window.AMP` is set by the AMP runtime when it finishes loading.
     * @const
     * @private
     */
    this.ampReadyPromise_ = new Promise(resolve => {
      (window.AMP = window.AMP || []).push(resolve);
    });
    this.ampReadyPromise_.then(AMP => {
      console.log('AMP LOADED:', AMP);
    });

    this.src_ = props.src;

    /**
     * Child element that the AMP document will be added as a shadow root to.
     * @private
     * @type {Element}
     */
    this.container_ = null;

    /**
     * XMLHTTPRequest that fetches the AMP document.
     * @private
     * @type {XMLHTTPRequest}
     */
    this.xhr_ = null;

    /**
     * Provides AMP functionality on the newly created shadow root after
     * an AMP document is attached.
     * @private
     * @type {Object}
     */
    this.shadowAmp_ = null;

    /** @private */
    this.boundClickListener_ = this.clickListener_.bind(this);
  }

  componentDidMount() {
    this.container_.addEventListener('click', this.boundClickListener_);
    this.fetchAndAttachAmpDoc_(this.src_);
  }

  componentWillUnmount() {
    // Cleans up internal shadow AMP document state.
    if (typeof(this.shadowAmp_.close) === 'function') {
      this.shadowAmp_.close();
    }

    this.container_.removeEventListener('click', this.boundClickListener_);

    if (this.xhr_) {
      this.xhr_.abort();
      this.xhr_ = null;
    }
  }

  componentWillReceiveProps(nextProps) {
    this.fetchAndAttachAmpDoc_(nextProps.src);
  }

  render(root) {
    this.container_ = window.document.createElement('div');
    this.container_.classList.add('amp-container');
    root.appendChild(this.container_);
  }

  /**
   * Fetches the AMP document at `url` and attaches it as a shadow root.
   * @private
   * @param {string} url
   */
  fetchAndAttachAmpDoc_(url) {
    this.fetchDocument_(url).then(doc => {
      return this.ampReadyPromise_.then(amp => {
        console.log('attaching doc');
        // Hide navigational and other unwanted elements before displaying.
        this.hideUnwantedElementsOnDocument_(doc);
        // Attach the document as a shadow root to the container.
        this.shadowAmp_ = amp.attachShadowDoc(this.container_, doc, url);
        window.document.title = this.amp_.title || '';
        amp.onMessage(this.onMessage_.bind(this));
        amp.setVisibilityState('visible');
      });
    }).catch(error => {
      this.setState({'offline': true});
    });
  }

  /**
   * Hides elements (e.g. banners) that would clash with the app shell.
   * @param {!Document} doc
   * @private
   */
   hideUnwantedElementsOnDocument_(doc) {
     const banners = doc.getElementsByClassName('banner');
     for (let i = 0; i < banners.length; i++) {
       banners[i].style.display = 'none';
     }
   }

  /**
   * Fetches and parses HTML at `url`.
   * @private
   * @param {string} url
   * @return {!Promise<!Document|!string>} If fetch succeeds, resolved with {!Document}.
   *         Otherwise, rejects with {!string} error description.
   */
  fetchDocument_(url) {
    return new Promise((resolve, reject) => {
      this.xhr_ = new XMLHttpRequest();
      this.xhr_.open('GET', url, true);
      this.xhr_.responseType = 'document';
      // This is set to text/* instead of text/html because the development server
      // only forwards requests to the proxy for requests whose 'Accept' header
      // is NOT text/html.
      // https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#proxying-api-requests-in-development
      this.xhr_.setRequestHeader('Accept', 'text/*');
      this.xhr_.onreadystatechange = () => {
        if (this.xhr_.readyState < /* STATUS_RECEIVED */ 2) {
          return;
        }
        if (this.xhr_.status < 100 || this.xhr_.status > 599) {
          this.xhr_.onreadystatechange = null;
          reject(new Error(`Unknown HTTP status ${this.xhr_.status}`));
          this.xhr_ = null;
          return;
        }
        if (this.xhr_.readyState === /* COMPLETE */ 4) {
          if (this.xhr_.responseXML) {
            resolve(this.xhr_.responseXML);
          } else {
            reject(new Error('No xhr.responseXML'));
          }
          this.xhr_ = null;
        }
      };
      this.xhr_.onerror = () => { reject(new Error('Network failure')); };
      this.xhr_.onabort = () => { reject(new Error('Request aborted')); };
      this.xhr_.send();
    });
  }

  /**
   * Event listener that redirects clicks on same-domain links to react-router.
   * This avoids page reload due to navigation from same-domain links in the AMP document,
   * which affords seamless UX in the style of a single-page app.
   * @private
   * @param e {!Event}
   */
  clickListener_(e) {
    if (e.defaultPrevented) {
      return false;
    }
    // Check `path` since events that cross the Shadow DOM boundary are retargeted.
    // See http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-301/#toc-events
    for (let i = 0; i < e.path.length; i++) {
      const a = e.path[i];
      if (a.tagName === 'A' && a.href) {
        const url = new URL(a.href);
        if (url.origin === window.location.origin) {
          // Perform router push instead of page navigation.
          e.preventDefault();
          this.props.router.push(url.pathname);
          // Scroll to top of new document.
          window.scrollTo(0, 0);
          return false;
        }
      }
    }
    return true;
  }
}

export function createAmpDoc(props) {
  return new AmpDocument(props);
};
