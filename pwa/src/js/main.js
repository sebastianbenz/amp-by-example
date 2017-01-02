import { createAmpDoc } from './amp-document.js';

class Router  {
  constructor() {
    this.root = document.getElementById('root');
    this.path = null;
    window.onpopstate = this.pop.bind(this);
  }
  push(path) {
    console.log('router: push ', path);
    const previous = this.path;
    this.path = path.replace(/\/pwa/, '');

    if (this.doc) {
      this.doc.componentWillUnmount();
      this.root.innerHTML = '';
    }
    this.doc = createAmpDoc({
      src: this.path + 'embed/',
      win: window,
      router: this
    });
    this.doc.render(this.root);
    this.doc.componentDidMount();
    history.pushState({}, '', '/pwa' + this.path);
  }
  
  pop(event) {
    console.log('router: pop ', event.state);
    if (event.state == null) {
      return;
    }
    router.push(window.location.pathname);
  }

}

const router = new Router();
router.push(window.location.pathname);

