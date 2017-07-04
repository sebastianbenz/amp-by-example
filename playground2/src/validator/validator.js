const validatorPromise = new Promise(resolve => {
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://cdn.ampproject.org/v0/validator.js';
  script.onload = resolve;
  document.head.appendChild(script);
});

export default class Validator {

  constructor(runtime) {
    this.listeners = [];
    this.setRuntime(runtime);
  }

  validate(string) {
    validatorPromise.then(() => {
      const validationResult = amp.validator.validateString(string, this.runtime.id);
      this.processErrors(validationResult);
      this.notifyListeners(validationResult);
    });
  }

  setRuntime(runtime) {
    this.runtime = runtime;
  }

  notifyListeners(validationResult) {
    this.listeners.forEach(l => l(validationResult));
  }

  addEventListener(listener) {
    this.listeners.push(listener);
  }

  processErrors(validationResult) {
    validationResult.errors.forEach(error => {
      error.message = amp.validator.renderErrorMessage(error);
      error.category = amp.validator.categorizeError(error);
      error.icon = error.severity.toLowerCase();
      error.isError = error.severity === 'ERROR';
      error.isWarning = error.severity === 'WARNING';
    });
  }

}

