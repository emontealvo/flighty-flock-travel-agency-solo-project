class DomUpdates {
  constructor(querySelectors) {
    Object.assign(this, querySelectors)
  }

  declareEventListeners() {
    this.loginBtn.addEventListener('click', this.displayLoginPrompt);
  }

  displayLoginPrompt() {
    
  }
}

export default DomUpdates;