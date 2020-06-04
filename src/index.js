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
}

const getData = () => {
  let apiData = new ApiFetch(); 
  let travelerData = apiData.getTravelerData();
  let destinationData = apiData.getDestinationData();
  
  Promise.all([travelerData, destinationData])
    .then(response => response = {
      travelers: response[0],
      destinations: response[1]
    })
    .then(response => {
      const domUpdates = new DomUpdates(querySelectors, response);
      console.log(domUpdates)
      domUpdates.declareEventListeners();
      domUpdates.checkLocalStorage4User();
    })  
}

getData();


// console.log(domUpdates)
// domUpdates.declareEventListeners();

// querySelectors.loginBtn.addEventListener('click', () => console.log('hello'));