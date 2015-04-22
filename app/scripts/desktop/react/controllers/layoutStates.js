class LayoutStatesController {
  constructor(layoutEl = document.body) {
    this.layoutEl = layoutEl;
    this.states = {
      userToolbar: 'main-toolbar-open'
    };
  }

  toggleState(UIelement, value) {
    let stateName = this.states[UIelement];
    // Используем add и remove вместо toggle, чтобы явно следовать внутренним стейтам
    // компонентов. Если у в лейауте был класс компонента, а из компонента пришло
    // что нужно его установить, то мы просто вызываем add, который ничего не испортит.
    // Если же будет toggle, то он уберёт класс компонента и будет рассинхрон.
    let methodName = value ? 'add' : 'remove';
    this.layoutEl.classList[methodName](stateName);
  }
}

export default LayoutStatesController;