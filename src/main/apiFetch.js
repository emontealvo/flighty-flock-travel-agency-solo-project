class ApiFetch {
  constructor() {
    this.rootUrl = "https://fe-apps.herokuapp.com/api/v1/travel-tracker/data"
  }

  getTravelerData() {
    let url = `${this.rootUrl}/travelers/travelers`
    return fetch(url)
      .then(response => response.json())
      .then(response => response.travelers);
  }

  getTripData() {
    let url = `${this.rootUrl}/trips/trips`
    return fetch(url).then(response => response.json())
      .then(response => response.trips)
  }

  getDestinationData() {
    let url = `${this.rootUrl}/destinations/destinations`
    return fetch(url)
      .then(response => response.json())
      .then(response => response.destinations);
  }

  makeTripRequest(tripRequest) {
    let url = `${this.rootUrl}/trips/trips`;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tripRequest),
    })
      .then(respone => respone.json())
      .then(response => console.log(response))
      .catch(err => console.log(err));
  }

  response2TripRequest(agentResponse) {
    let url = `${this.rootUrl}/trips/updateTrip`;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(agentResponse)
    })
      .then(response => console.log(response))
      .catch(err => console.log(err))
  }

  cancelTripRequest(agentResponse) {
    let url = `${this.rootUrl}/trips/trips`;
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(agentResponse),
    })
      .then(respone => respone.json())
      .then(response => console.log(response))
      .catch(err => console.log(err));
  }

}

export default ApiFetch;
