import Agency from './agency'
import Traveler from './traveler'
import ApiFetch from './apiFetch'

class DomUpdates {
  constructor(querySelectors, responseData) {
    this.user = {type: "Guest"};
    Object.assign(this, querySelectors, responseData);
  }

  declareEventListeners() {
    this.loginBtn.addEventListener('click', () =>
      this.loginForm.classList.toggle('hidden'));
    this.logoutBtn.addEventListener('click', () => this.logUserOut());
    this.loginForm.addEventListener('submit', () => this.logUserIn());
    this.bookTripBtn.addEventListener('click', () => this.displayRequestForm());
    this.tripRequestForm.addEventListener('submit', () => {
      event.preventDefault();
      this.createTripRequest(this.tripRequestForm.children);
    });
  }

  logUserIn() {
    let username = document.forms[0].elements[0].value;
    let password = document.forms[0].elements[1].value
    this.checkUserInput(username, password);
  }

  checkUserInput(username, password) {
    let regEx = /[^a-z]*/g;
    let userType = username.split(regEx).join('');
    let passWordCheck = (password === "travel2020");

    return (userType === 'traveler' && passWordCheck) ? this.startTravelerUx(username)
      : (userType === 'agency' && passWordCheck) ? this.startAgencyUx()
        : alert('Invalid Username');
  }

  startTravelerUx(username) {
    this.toggleUserInterface("travelerPage");
    this.findUser(username);
    this.saveUser('traveler');
    this.loginForm.classList.add('hidden')
  }

  startAgencyUx() {
    this.user = new Agency (this.trips, this.destinations);
    this.toggleUserInterface("agencyPage");
    this.saveUser('agency');
  }

  findUser(username) {
    let regEx = /[a-z]*/g
    let userId = parseInt(username.split(regEx).join(''))
    let travlerInfo = this.travelers.find(user => user.id === userId);
    this.user = new Traveler (this.trips, this.destinations, travlerInfo);
  }

  saveUser() {
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  toggleUserInterface(userType) {
    this.welcomePage.classList.add('hidden');
    this.loginBtn.classList.add('hidden');
    this[userType].classList.remove('hidden');
    this.logoutBtn.classList.remove('hidden');
    this.createMainDisplay();
  }

  logUserOut() {
    this.welcomePage.classList.remove('hidden');
    this.loginBtn.classList.remove('hidden');
    this.logoutBtn.classList.add('hidden');
    this.agencyPage.classList.remove('hidden');
    this.travelerPage.classList.remove('hidden');
    localStorage.clear()
  }

  checkLocalStorage4User() {
    if (!localStorage.user) {
      return
    } 

    let previousUser = JSON.parse(localStorage.getItem('user'))
    if (previousUser.type === 'Traveler') {
      let userInfo = {
        id: previousUser.id,
        name: previousUser.name,
        travelerType: previousUser.travelerType
      };
      this.user = new Traveler(this.trips, this.destinations, userInfo);
      this.toggleUserInterface("travelerPage")
    } else if (previousUser.type === 'agency') {
      this.user = new Agency (this.trips, this.destinations);
      this.toggleUserInterface("agencyPage");
    }
  }
  

  createMainDisplay() {
    if (this.user.type === "Guest") {
      this.createDestinationCatalog(this.destinationsCatalog, this.destinations);
    } else if (this.user.type === "Traveler") {
      let destinations = this.user.trips
        .map(trip => this.user.findDestinationDetails(trip));
      this.createDestinationCatalog(this.travelerPage, destinations);
      this.createUserYear2DateFinanceMetric(this.userFinanceMetricArticles[0], this.user.calculateTravelExpenses4yr('2020'))
    } else if (this.user.type === "agency") {
      let destinations = this.user.pendingTrips
        .map(trip =>  this.user.findDestinationDetails(trip));
      this.createDestinationCatalog(this.agencyPage, destinations)
      //this.createUserYear2DateFinanceMetric(this.userFinanceMetricArticles[1], this.user.calculateAgencyYearlyIncome('2020'))
    }
  }

  createDestinationCatalog(element, destinations) {
    let catalog = document.createElement("div");
    catalog.className = "catalog";
    this.createAllDestinationSlides(catalog, destinations);
    element.appendChild(catalog);
  }

  createAllDestinationSlides(element, destinations) {
    let catalogList = document.createElement("ul")
    catalogList.className = "destination-list"
    destinations.forEach(destination => 
      this.createDestinationSlide(catalogList, destination))
    element.appendChild(catalogList)
  }

  createDestinationSlide(element, destination) {
    let slide = document.createElement("li")
    slide.className = "carousel__slide"
    slide.insertAdjacentHTML('afterbegin', 
      `<figure>
        <div>
          <img src=${destination.image} alt=${destination.alt}>
        </div>
        <figcaption>
          ${destination.alt}
          <span class="location">${destination.destination}</span>
        </figcaption>
      </figure>`
    )
    element.append(slide);
  }

  createUserYear2DateFinanceMetric(userNode, financeMetric) {
    let message = this.createFinanceMetricMessage(userNode, financeMetric)
    userNode.innerHTML = ''
    userNode.insertAdjacentHTML('afterbegin', 
      `<h1>${message}</h1>`);
  }

  createFinanceMetricMessage(userNode, financeMetric) {
    if (userNode.id === "traveler-Y2D-expenses") {
      return `You've spent $${financeMetric} on trips this year!`	
    } 

    if (userNode.id === "agency-Y2D-income") {
      return `We've generated $${financeMetric} from trips this year!`
    }
  }
  displayRequestForm() {
    this.tripRequestForm.classList.toggle('hidden');
    this.createDestinatonOptions();
  }

  createDestinatonOptions() {
    let options = document.getElementById("desired-destination")
    this.destinations.forEach(destination => {
      options.insertAdjacentHTML('beforeend',
        `<option value=${destination.id}>${destination.destination}</option>`
      )
    });
  }

  createTripRequest(form) {
    const createRequestId = () =>
      parseInt(new Date().getTime().toString().slice(6));
		
    const reformatDate = () => form.startDate.value.split('-').join('/')

    const tripRequest = {
      id: createRequestId(),
      userID: this.user.id,
      destinationID: parseInt(form.destination.value),
      travelers: parseInt(form.travelerAmount.value),
      date: reformatDate(),
      duration: parseInt(form.tripDuration.value), 
      status: 'pending',
      suggestedActivities: []
    }

    const apiRequest = new ApiFetch();
		
    apiRequest.makeTripRequest(tripRequest)
      .then(response => console.log(response))
      .catch(err => console.log(err));	
  }
}

export default DomUpdates;


