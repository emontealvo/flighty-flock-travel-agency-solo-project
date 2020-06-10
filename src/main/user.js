class User {
  constructor(type, trips, destinationKey) {
    this.type = type || 'Guest';
    this.trips = (Array.isArray(trips)) ? trips : [];
    this.destinationKey = (Array.isArray(destinationKey)) ? destinationKey : [];
  }

  calculateCost4AllTrips() {
    return this.trips.reduce((acc, trip) => acc += this.calculateTripCost(trip), 0)
  }

  calculateTripCost(trip) {
    let destination = this.findDestinationDetails(trip)
    let lodgingCost = destination.estimatedLodgingCostPerDay * trip.duration;
    let flightCost = destination.estimatedFlightCostPerPerson * trip.travelers;

    return lodgingCost + flightCost;
  }

  findDestinationDetails(trip) {
    let destination = this.destinationKey
      .find(destination => trip.destinationID === destination.id);
    destination.tripID = trip.id;
    destination.userID = trip.userID
    return destination;
  }
	
  calculateTripCost4Yr(year) {
    if (!year.match(/\d{4}/)) {
      return 'Invalid Input';
    }

    let approvedTrips = this.trips.filter(trip => trip.status === "approved")

    return approvedTrips
      .filter(trip => trip.date.includes(year.match(/\d{4}/)))
      .reduce((sumCost, trip) => 
        sumCost += this.calculateTripCost(trip), 0);
  }
}
export default User;
