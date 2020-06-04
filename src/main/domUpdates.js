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
    
    this.checkUserType(username.match(regEx)[0]);
  };

  checkUserType(userType) {
    return (userType === 'traveler') ? this.startTravelerUx()
    : (userType === 'agency') ? this.startAgencyUx()
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