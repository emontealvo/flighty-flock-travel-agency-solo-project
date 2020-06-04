class DomUpdates {
  constructor(querySelectors) {
    Object.assign(this, querySelectors)
  }

  declareEventListeners() {
    return this.loginBtn.addEventListener('click', this.displayLoginPrompt);
  }

  displayLoginPrompt() {
    // console.log("hello?")
    let loginForm = document.querySelector('.login-form')
    console.log(loginForm)
    loginForm.classList.toggle('hidden');
  }
}

export default DomUpdates;