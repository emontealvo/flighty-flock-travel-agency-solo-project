
import './css/base.scss';
import './images/turing-logo.png'
import './main/apiFetch'
import ApiFetch from './main/apiFetch';
import DomUpdates from './main/domUpdates'

const querySelectors4DomClass = {
  loginBtn: document.querySelector('.login-popup-btn'),
  logoutBtn: document.querySelector('.logout-btn'),
  loginForm: document.querySelector('.login-form'),
  welcomePage: document.querySelector('.welcome-page'),
  travelerPage: document.querySelector('.traveler-page'),
  travelerTripHistory: document.querySelector('.traveler-trip-history'),
  agencyPage: document.querySelector('.agency-page'),
  pendingUserTrips: document.querySelector('.pending-user-trips'),
  ongoingTripsCatalog: document.querySelector('.ongoing-trips-catalog'),
  destinationsCatalog: document.querySelector('.destinations-catalog'),
  travelerTrips: document.querySelector('.traveler-trips'),
  tripRequestForm: document.forms.tripRequestForm,
  bookTripBtn: document.querySelector(".book-trip-btn"),
  userFinanceMetricArticles: document.querySelectorAll(".finance-metric")
}

querySelectors4DomClass.tripRequestForm.addEventListener('submit', () => {
  event.preventDefault()
  createTripRequest(querySelectors4DomClass.tripRequestForm.children);
});

querySelectors4DomClass.pendingUserTrips.addEventListener('click', () => {
  event.preventDefault()
  postAgencyDecision(event)
})

let domUpdates;

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
      domUpdates = new DomUpdates(querySelectors4DomClass, response);
      domUpdates.declareEventListeners();
      domUpdates.checkLocalStorage4User();
      domUpdates.createMainDisplay();
    })
    .then(response => console.log(response))
    .catch(err => console.log(err));
}

const createTripRequest = (form) => {
  const createRequestId = () =>
    parseInt(new Date().getTime().toString().slice(6));
  
  const reformatDate = () => form.startDate.value.split('-').join('/')

  const tripRequest = {
    id: createRequestId(),
    userID: domUpdates.user.id,
    destinationID: parseInt(form.destination.value),
    travelers: parseInt(form.travelerAmount.value),
    date: reformatDate(),
    duration: parseInt(form.tripDuration.value), 
    status: 'pending',
    suggestedActivities: []
  }
  
  const message = `
    This trip will cost $${domUpdates.user.calculateTripCost4Traveler(tripRequest)}
    You will be charged after your trip is approved!
  `
  const apiRequest = new ApiFetch();
  
  apiRequest.makeTripRequest(tripRequest)
    .then(response => alert(message))
    .then(data =>getData())
    .catch(err => console.log(err));	

    querySelectors4DomClass.tripRequestForm.reset();
}


let postAgencyDecision = (event) => {
  let agentResponseApi = new ApiFetch();
  
  if (event.target.name === "approveTripBtn") {
    let agentResponse = {
      id: parseInt(event.target.value),
      status: "approved"
    }
    agentResponseApi.response2TripRequest(agentResponse)
      .then(response => alert("Booking Approved"))
      .then(data => getData())
      .catch(err => alert(err.message))
  }

  if (event.target.name === "cancelTripBtn") {
    let agentResponse = {
      id: parseInt(event.target.value),
    }
    agentResponseApi.cancelTripRequest(agentResponse)
      .then(response => alert("Booking Canceled"))
      .then(data => getData())
      .catch(err => alert(err.message))
  }
}

getData();

