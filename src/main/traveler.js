import User from './user'

class Traveler extends User {
  constructor(trips, destinationKey, travelerInfo) {
    super('Traveler', trips, destinationKey);
    
    if(typeof travelerInfo === 'object') {
      this.id = travelerInfo.id || NaN;
      this.name = travelerInfo.name || '';
      this.travelerType = travelerInfo.travelerType || '';
    };  
    this.trips = this.trips.filter(trip => trip.userID === this.id);
  };

  calculateTripCost4Traveler(trip) {
    return Math.floor(this.calculateTripCost(trip) * 1.1);
  };

  calculateTravelExpenses4yr(year) {
    if(!year.match(/\d{4}/)) return 'Invalid Input';

    return this.trips
      .filter(trip => trip.date.includes(year.match(/\d{4}/)))
      .reduce((sumCost, trip) => 
        sumCost += this.calculateTripCost4Traveler(trip), 0);
  };
};

export default Traveler;