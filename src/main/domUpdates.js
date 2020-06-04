class DomUpdates {
  constructor(querySelectors) {
    Object.assign(this, querySelectors)
  }

  declareEventListeners() {
    this.loginBtn.addEventListener('click', () => this.loginForm.classList.toggle('hidden'));
    this.loginForm.addEventListener('submit', () => this.logUserIn())
  }

  logUserIn() {
    event.preventDefault()
    let regEx = /[a-z]*/
    let username = document.forms[0].elements[0].value;
    let password = document.forms[0].elements[1].value
    this.checkUserType(username.match(regEx)[0], password);
  };

  checkUserType(userType, password) {
    let passWordCheck = (password === "travel2020");
    return (userType === 'traveler' && passWordCheck) ? this.startTravelerUx()
    : (userType === 'agency' && passWordCheck) ? this.startAgencyUx()
    : alert('Invalid Username');
  };

  startTravelerUx() {
    this.welcomePage.classList.add('hidden');
    this.userPage.classList.remove('hidden');
  }

  startAgencyUx() {
    this.welcomePage.classList.add('hidden');
    this.agencyPage.classList.remove('hidden');
  }
};

export default DomUpdates;