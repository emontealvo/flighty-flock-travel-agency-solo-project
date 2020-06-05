import chai from 'chai';
const expect = chai.expect;
import User from '../src/main/user'
import destinations from '../test-data/destinations'
import trips from '../test-data/trips'

describe('User Class', () => {

  let user;

  beforeEach(() => {
    user = new User();
  });

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should create an User instance', () => {
    expect(user).to.be.an.instanceof(User);
  });

  it('should have a type', () => {
    expect(user).to.have.property('type');
  });

  it('should default to a guest user type', () => {
    expect(user.type).to.equal('Guest');
  });

  it('should be able to be other types of user', () => {
    user = new User('Traveler');
    expect(user.type).to.equal('Traveler');
  });

  it('should hold onto trips', () => {
    expect(user).to.have.property('trips');;
  });

  it('should default to an empty array if no trips are given', () => {
    expect(user.trips).to.deep.equal([]);
  });

  it('should have a reference to all possible destinations', function() {
    expect(user).to.have.property('destinationKey');
  });

  it('should have an empty array if no destination key is given', () => {
    expect(user.destinationKey).to.deep.equal([]);
  });
});

describe('User Class behavior', () => {

  let user
  beforeEach(() => {
    user = new User('agency', trips, destinations);    
  });

  it('should hold trips in an array', () => {
    expect(user.trips).to.be.an('array');
  });

  it('should be an empty array if trips given is not an array', () => {
    let trips = {}
    user = new User('agency', trips, destinations)
    expect(user.trips).to.deep.equal([]);
  });

  it('should hold destinations in an array', () => {
    expect(user.trips).to.be.an('array');
  });

  it('should be an empty array if trips given is not an array', () => {
    let destinations = {}
    user = new User('agency', trips, destinations)
    expect(user.destinationKey).to.deep.equal([]);
  });

  it('should be able to calculate total trip cost', () => {
    expect(user.calculateCost4AllTrips).to.be.a('function')
  });

  it('should calculate total trip cost correctly', () => {
    expect(user.calculateCost4AllTrips()).to.equal(61780);
  });

  it('should calculate cost for single trip', () => {
    expect(user.calculateTripCost).to.be.a('function');
  });

  it('should calculate the cost of a single trip', () => {
    let trip = trips[0]
    expect(user.calculateTripCost(trip)).to.equal(5290);
  });

  it('should calculate the cost of any single trip', () => {
    let trip = trips[1]
    expect(user.calculateTripCost(trip)).to.equal(4150);
  });

  it('should calculate the cost for all trips in a given year', () => {
    expect(user.calculateTripCost4Yr('2019')).to.equal(8930);
  });

  it('should return a message if parameter is not given in "YYYY" format', () => {
    user = new User('Agency', trips, destinations)

    expect(user.calculateTripCost4Yr('twenty-twenty')).to.deep.equal("Invalid Input");
  });
});
