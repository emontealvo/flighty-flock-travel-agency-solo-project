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
  }

  logUserIn() {
    event.preventDefault()
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
    console.log(this.user);
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
      this.createDestinationCatalog(this.welcomePage, this.destinations);
    } else if (this.user.type === "Traveler") {
      let destinations = this.user.trips
        .map(trip => this.user.findDestinationDetails(trip));
      this.createDestinationCatalog(this.travelerPage, destinations);
    } else if (this.user.type === "agency") {
      console.log(this.user.pendingTrips);
      let destinations = this.user.pendingTrips
        .map(trip =>  this.user.findDestinationDetails(trip));
      this.createDestinationCatalog(this.agencyPage, destinations)
    }
  }

  createDestinationCatalog(element, destinations) {
    let catalog = document.createElement("div");
    catalog.className = "catalog";
    this.createAllDestinationSlides(catalog, destinations);
    //    this.createAllDestinationThumbnails(catalog, destinations);
    element.appendChild(catalog);
  }

  createAllDestinationSlides(element, destinations) {
    let catalogEntry = document.createElement("ul")
    catalogEntry.className = "destination-entry"
    destinations.forEach(destination => 
      this.createDestinationSlide(catalogEntry, destination))
    element.appendChild(catalogEntry)
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

  // createAllDestinationThumbnails(element, destinations) {
  // let carouselThumbnails = document.createElement("ul")
  //carouselThumbnails.className = "carousel__thumbnails"
  //destinations.forEach((destination, index) => this.createDestinationThumbnail(carouselThumbnails, destination, index))
//    element.append(carouselThumbnails)
//  }
//
//  createDestinationThumbnail(element, destination, index) {
//    let thumbnail = document.createElement("li");
//    let thumbnailLabel = document.createElement("label")
//    thumbnailLabel.setAttribute("for", `slide-${index + 1}`);
//    thumbnailLabel.innerHTML = `<img src=${destination.image} alt=${destination.alt}/>`;
//    element.append(thumbnail.appendChild(thumbnailLabel));
//  }
}

export default DomUpdates;
