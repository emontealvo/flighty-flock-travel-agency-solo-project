class DomUpdates {
  constructor(querySelectors, data) {
    this.user = {}
    Object.assign(this, querySelectors, data)
  }

  declareEventListeners() {
    this.loginBtn.addEventListener('click', () => this.loginForm.classList.toggle('hidden'));
    this.logoutBtn.addEventListener('click', () => this.logUserOut());
    this.loginForm.addEventListener('submit', () => this.logUserIn());
  }

  logUserIn() {
    event.preventDefault()
    let username = document.forms[0].elements[0].value;
    let password = document.forms[0].elements[1].value
    this.checkUserType(username, password);
  };

  checkUserType(username, password) {
    let regEx = /[^a-z]*/g;
    let userType = username.split(regEx).join('');
    let passWordCheck = (password === "travel2020");

    return (userType === 'traveler' && passWordCheck) ? this.startTravelerUx(username)
    : (userType === 'agency' && passWordCheck) ? this.startAgencyUx()
    : alert('Invalid Username');
  };

  startTravelerUx(username) {
    this.toggleUserInterface("travelerPage");
    this.findUser(username);
    this.saveUser('traveler');
    this.loginForm.classList.add('hidden')
  };

  startAgencyUx() {
    this.toggleUserInterface("agencyPage");
    this.saveUser();
  };

  findUser(username) {
    let regEx = /[a-z]*/g
    let userId = username.split(regEx).join('')
    this.user = this.travelers.find(user => user.id == userId)
  }

  saveUser(userType) {
    localStorage.setItem('user', JSON.stringify({type: userType, info:this.user}));
  }

  toggleUserInterface(userType) {
    this.welcomePage.classList.add('hidden');
    this.loginBtn.classList.add('hidden');
    this[userType].classList.remove('hidden');
    this.logoutBtn.classList.remove('hidden');
  };

  logUserOut() {
    this.welcomePage.classList.remove('hidden');
    this.loginBtn.classList.remove('hidden');
    this.logoutBtn.classList.add('hidden');
    this.agencyPage.classList.remove('hidden');
    this.travelerPage.classList.remove('hidden');
    localStorage.clear()
  }

  checkLocalStorage4User() {
    if(localStorage.user) {
      console.log('a step forward')
    }
  }
};

export default DomUpdates;