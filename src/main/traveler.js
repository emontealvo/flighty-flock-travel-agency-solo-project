import User from './user'

class Traveler extends User {
  constructor(trips, destinationKey, travelerInfo) {
    super('Traveler', trips, destinationKey);
    
    if(typeof travelerInfo === 'object') {
      this.id = travelerInfo.id || NaN;
      this.name = travelerInfo.name || '';
      this.travelerType = travelerInfo.travelerType || '';
    };
    
    this.trips = this.trips.filter(trip => trip.userID === this.id)
  }

  
}

export default Traveler;