import User from './user';

class Agency extends User {
  constructor(trips, destinationKey) {
    super('agency', trips, destinationKey);
    this.pendingTrips = this.findPendingTrips();
  }

  calculateAgencyYearlyIncome(year) {
    return (!year.match(/\d{4}/)) ? 'Invalid Input'
      : Math.floor(this.calculateTripCost4Yr(year) * .1)
  }
  
  findPendingTrips() {
    return this.trips
      .filter(trip => trip.status !== "approved")
      .sort((a, b) => 
        this.getTripDates(a).startDate < this.getTripDates(b).startDate ? -1 : 1)
  }

  getTripDates(trip) {
    let dateSetUp = trip.date.split("/").map(strInt => parseInt(strInt));
    let month = dateSetUp[1] - 1;
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
  }
}

export default Agency; 
