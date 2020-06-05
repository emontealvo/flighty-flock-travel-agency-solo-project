import User from './user'

class Agency extends User {
  constructor(trips, destinationKey) {
    super('Agency', trips, destinationKey);
  };

  calculateAgencyYearlyIncome(year) {
    return (!year.match(/\d{4}/)) ? 'Invalid Input'
      : Math.floor(this.calculateTripCost4Yr(year) * .1)
  };

  findPendingTrips() {
    return this.trips
      .filter(trip => trip.status === "pending");
  };
};

export default Agency; 
