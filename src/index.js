// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';


// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import './main/apiFetch'
import ApiFetch from './main/apiFetch';
import DomUpdates from './main/domUpdates'

const querySelectors = {
  loginBtn: document.querySelector('.login-popup-btn'),
  logoutBtn: document.querySelector('.logout-btn'),
  loginForm: document.querySelector('.login-form'),
  welcomePage: document.querySelector('.welcome-page'),
  travelerPage: document.querySelector('.traveler-page'),
  agencyPage: document.querySelector('.agency-page'),
  destinationsCatalog: document.querySelector('.destinations-catalog'),
  travelerTrips: document.querySelector('.traveler-trips'),
  tripRequestForm: document.forms.tripRequestForm,
  bookTripBtn: document.querySelector(".book-trip-btn"),
}

const getData = () => {
  let apiData = new ApiFetch(); 
  let travelerData = apiData.getTravelerData();
  let destinationData = apiData.getDestinationData();
  let tripData = apiData.getTripData();

  
  Promise.all([travelerData, destinationData, tripData])
    .then(response => response = {
      travelers: response[0],
      destinations: response[1],
      trips: response[2]
    })
    .then(response => {
      const domUpdates = new DomUpdates(response, querySelectors);
      domUpdates.declareEventListeners();
      domUpdates.checkLocalStorage4User();
      domUpdates.createMainDisplay();
      return domUpdates
    })
    .then(response => console.log(response))
    .catch(err => console.log(err));
}

getData();

