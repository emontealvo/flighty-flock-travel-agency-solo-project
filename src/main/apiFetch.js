class ApiFetch {
  constructor() {
    this.rootUrl = "https://fe-apps.herokuapp.com/api/v1/travel-tracker/data"
  }

  getTravelerData() {
    let url = `${this.rootUrl}/travelers/travelers`
    return fetch(url).then(response => response.json());
  }

  getTripData() {
    let url = `${this.rootUrl}/trips/trips`
    return fetch(url).then(response => response.json());
  }

  getDestinationData() {
    let url = `${this.rootUrl}/destinations/destionations`
    return fetch(url).then(response => response.json());
  }
}

export default ApiFetch;