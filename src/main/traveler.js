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
    return (!year.match(/\d{4}/)) ? 'Invalid Input'
      : Math.floor(this.calculateTripCost4Yr(year) * 1.1)
  };
};

export default Traveler;
