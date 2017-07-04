import './error-list.css'

export default class ErrorList {

  constructor(container, trigger) {
    this.container = container;
    this.trigger = trigger;
    this.trigger.addEventListener('click', this.toggle.bind(this), false);
    this.container.addEventListener('click', this.onItemClick.bind(this), false);
    this.listeners = [];
  }

  update(validationResult) {
    this.validationResult = validationResult;
    this.container.innerHTML = '';
    const ul = document.createElement('ul');
    const fragment = `<ul>
    ${validationResult.errors.map(this.renderError).join('') }
    </ul>`;
    window.requestAnimationFrame(() => this.container.innerHTML = fragment );
		if (validationResult.errors.length === 0) {
			this.trigger.classList.toggle('close', false);
			this.container.classList.toggle('show', false);
		}
  }

  renderError(error, index) {
    return `<li class="${error.icon}" data-index="${index}">
            <div>
              <div class="message">${error.message}</div>
              <div class="location">line ${error.line}, column ${error.col}</div>
            </div>
            <div class="category">${error.category}</div>
      </li>`
  }

  toggle(e) {
    this.container.classList.toggle('show');
    setTimeout(() => this.trigger.classList.toggle('close'), 200);
  }

  onItemClick(e) {
    if (!this.validationResult) {
      return;
    }
    const target = e.target.closest('li');  
    if(!e.target) {
      return;
    }
    const index = target.dataset.index;
    const error = this.validationResult.errors[index];
    if (!error) {
      return;
    }
    e.preventDefault();  
    this.toggle();
    this.notifyListeners(error);
  }

  notifyListeners(error) {
    this.listeners.forEach(l => l(error));
  }

  addEventListener(listener) {
    this.listeners.push(listener);
  }

}
