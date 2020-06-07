import User from './user';
const moment = require('moment');
moment().format();

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

  getTripDates(trip) {
    let dateSetUp = trip.date.split("/").map(strInteger => parseInt(strInteger));
    let month = dateSetUp[1] -1;
    let endDay = dateSetUp[2] + trip.duration;
    return {
      startDate: new Date(dateSetUp[0], month, dateSetUp[2]), 
      endDate: new Date(dateSetUp[0], month, endDay)
    }  
  }

  findOngoingTrips() {
    return this.trips.filter(trip => {
      let tripDates = this.getTripDates(trip)
      let now = new Date()
      return (tripDates.startDate.getTime() <= now.getTime() 
        && now.getTime() <= tripDates.endDate.getTime());
    })
  };
};

export default Agency; 
