import Agency from './agency'
import Traveler from './traveler'


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
        : (passWordCheck) ? alert('Invalid Username') : alert('Invalid Password');
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
    window.location.reload()
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
    }

    if (this.user.type === "Traveler") {
      let destinations = this.user.trips
        .map(trip => this.user.findDestinationDetails(trip));
      this.createUserYear2DateFinanceMetric(this.userFinanceMetricArticles[0],
        this.user.calculateTravelExpenses4yr('2020'));
      this.createDestinationCatalog(this.travelerTripHistory, destinations);
    }

    if (this.user.type === "agency") {
      let destinations = this.user.pendingTrips.map(trip => this.user.findDestinationDetails(trip));
      this.createUserYear2DateFinanceMetric(this.userFinanceMetricArticles[1],
        this.user.calculateAgencyYearlyIncome('2020'));
      this.createDestinationCatalog(this.pendingUserTrips, destinations)
      this.createOngoingTripsCatalog(this.ongoingTripsCatalog);
    }
  }


  createUserYear2DateFinanceMetric(userNode, financeMetric) {
    let message = this.createFinanceMetricMessage(userNode, financeMetric)
    userNode.innerHTML = ''
    userNode.insertAdjacentHTML('afterbegin', 
      `<h1>${message}</h1>`);
  }

  createFinanceMetricMessage(userNode, financeMetric) {
    if (userNode.id === "traveler-Y2D-expenses") {
      return `Welcome ${this.user.name}! You've spent $${financeMetric} on trips this year!`	
    } 

    if (userNode.id === "agency-Y2D-income") {
      return `We've generated $${financeMetric} from trips this year!`
    }
  }
	
  createDestinationCatalog(tripDisplayContainer, destinations) {
    tripDisplayContainer.innerHTML = '';
    let tripCatalog = document.createElement("div");
    tripCatalog.className = "trip-catalog";
    this.createAllDestinationSlides(tripCatalog, destinations, tripDisplayContainer);
    tripDisplayContainer.appendChild(tripCatalog);
  }

  createAllDestinationSlides(tripCatalog, destinations, tripDisplayContainer) {
    let tripCatalogList = document.createElement("ul")
    tripCatalogList.className = "destination-list"

    if (tripDisplayContainer.className === "pending-user-trips") {
        this.user.pendingTrips.forEach(trip => {
        let destination = this.user.findDestinationDetails(trip)
        this.createDestinationSlide(tripCatalogList, destination, tripDisplayContainer)
      })
    }

    destinations.forEach(destination => 
      this.createDestinationSlide(tripCatalogList, destination, tripDisplayContainer));
    tripCatalog.appendChild(tripCatalogList)
  }

  createDestinationSlide(tripCatalogList, destination, tripDisplayContainer) {
    let tripDetails
    let destinationSlide = document.createElement("li")

    if (tripDisplayContainer.className === "pending-user-trips") {
      tripDetails = this.user.pendingTrips.find(trip => (trip.id === destination.tripID));
      destinationSlide.setAttribute("id", `${tripDetails.id}`)       
    }
    
    if (tripDisplayContainer.className !== "destinations-catalog"
      && tripDisplayContainer.className !== 'pending-user-trips') {
		  tripDetails = this.user.trips.find(trip => trip.id === destination.tripID);
      destinationSlide.setAttribute("id", `${tripDetails.id}`)
    }
    destinationSlide.className = "destination-slide"
    destinationSlide.insertAdjacentHTML('afterbegin', 
      `<figure>
        <div>
          <img src=${destination.image} alt=${destination.alt}>
        </div>
        <figcaption>
        </figcaption>
      </figure>`
    )
    this.createDestinationCaption(tripDisplayContainer, destination, destinationSlide, tripDetails)
    tripCatalogList.append(destinationSlide);
  }

  createDestinationCaption(tripDisplayContainer, destination, destinationSlide, tripDetails) {
    let caption = destinationSlide.getElementsByTagName('figcaption')[0];
    if (tripDisplayContainer.className === "destinations-catalog") {
      return caption.innerHTML = `${destination.destination}`
    } 
    caption.innerHTML = `
        <h3 class="location">${destination.destination}</h3>
				<h6>Date:</h6>
				<p>${tripDetails.date}</p>
				<h6>Duration: </h6>
				<p>${tripDetails.duration} days</p>
				<h6>Status: </h6>
				<p>${tripDetails.status}</p>
				<h6>Travelers: </h6>
				<p>${tripDetails.travelers}</p>
			` 
    if (tripDisplayContainer.className === "pending-user-trips") {
      this.addCostumerName(caption, tripDetails)
      this.addAgencyResponseButtons(caption, tripDetails)
    }

    if (tripDisplayContainer.className === "ongoing-trips-catalog") {
      this.addCostumerName(caption, tripDetails)
    }
  }

  addCostumerName(caption, tripDetails) {
    let costumer = this.travelers.find(traveler => traveler.id === tripDetails.userID);
    caption.insertAdjacentHTML('beforeend', `
			<h6>Costumer Name:</h6>
			<p>${costumer.name}<p>
		`)
  }

  addAgencyResponseButtons(caption, tripDetails) {
    let agencyResponseButtons = `
		<form class="trip-request-response-btns">
			<button class="approve-pending-trip-btn" name="approveTripBtn" value="${tripDetails.id}"> Approve!</button>
			<button class="delete-pending-trip-btn" name ="cancelTripBtn" value="${tripDetails.id}">Cancel!</button>
		</form>
		`
    return caption.insertAdjacentHTML('beforeend', agencyResponseButtons);
  }

  createOngoingTripsCatalog(tripsDisplayContainer) {
    let destinations = this.user.findOngoingTrips()
      .map(trip => this.user.findDestinationDetails(trip));
    this.createDestinationCatalog(tripsDisplayContainer, destinations)
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
}

export default DomUpdates;

