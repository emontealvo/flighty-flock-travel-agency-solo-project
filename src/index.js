// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';


// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import './main/apiFetch'
import ApiFetch from './main/apiFetch';
import DomUpdates from './main/domUpdates'

console.log('This is the JavaScript entry file - your code begins here.');



const querySelectors = {
  loginBtn: document.querySelector('.login-popup'),
  
}

const apiData = new ApiFetch() 
const domUpdates = new DomUpdates(querySelectors);


console.log(apiData.getTravelerData())
domUpdates.declareEventListeners();

// querySelectors.loginBtn.addEventListener('click', () => console.log('hello'));