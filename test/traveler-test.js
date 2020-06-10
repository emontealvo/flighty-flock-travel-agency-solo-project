import chai from 'chai';
const expect = chai.expect;

import Traveler from '../src/main/traveler';
import User from '../src/main/user';
import destinations from '../test-data/destinations';
import trips from '../test-data/trips';
import travelerInfo from '../test-data/travelers';

describe('Traveler as subclass of User', () => {
  let traveler;
  
  beforeEach(() => {
    traveler = new Traveler();
  });

  it('should be a function', () => {
    expect(Traveler).to.be.a('function');
  });

  it('should be an instance of the traveler class', () => {
    expect(traveler).to.be.an.instanceof(Traveler);
  });

  it('should be an extension of the user class', () => {
    expect(traveler).to.be.an.instanceof(User);
  });

  it('should have a default type of "Traveler"', () => {
    expect(traveler.type).to.equal('Traveler');
  });

  it('should default to an empty array if no trips are given', () => {
    expect(traveler.trips).to.deep.equal([]);
  });

  it('should default to an empty array if no destination key is given', () => {
    expect(traveler.destinationKey).to.deep.equal([]);
  });
  
  it('should only assign traveler specific properties if traveler info is given', () => {
    expect(traveler).to.not.have.property('id');
    expect(traveler).to.not.have.property('name');
    expect(traveler).to.not.have.property('travelerType');
  });

  it('should only assign traveler specific properties if traveler info is given as an object', () => {

    let travelerInfo = "id is 0, name equals Steve Major, hobbies include fly fishing"
    traveler = new Traveler(trips, destinations, travelerInfo)

    expect(traveler).to.not.have.property('id');
    expect(traveler).to.not.have.property('name');
    expect(traveler).to.not.have.property('travelerType');
  });
});

describe('Traveler additional properties and behavior', () => {
  let traveler;

  beforeEach(() => {
    traveler = new Traveler(trips, destinations, travelerInfo[0])
  });

  it('should have a traveler id', () => {
    expect(traveler.id).to.equal(25);
  });

  it('should have a name', () => {
    expect(traveler.name).to.equal("Leighton Doerrling");
  });

  it('should have a type', () => {
    expect(traveler.travelerType).to.equal("relaxer");
  });

  it('should have default values if values do not exist', () => {
    let travelerInfo = {}
    traveler = new Traveler(trips, destinations, travelerInfo)

    expect(traveler.id).to.deep.equal(NaN)
    expect(traveler.name).to.equal('')
    expect(traveler.travelerType).to.equal('')
  });

  it('should filter a user\'s trips from the trips data', () => {
    expect(traveler.trips).to.deep.equal([trips[8]]);
  });

  it('should filter all of a user\'s trips from the trips data', () => {
    traveler = new Traveler(trips, destinations, travelerInfo[1])

    expect(traveler.trips).to.deep.equal([trips[2], trips[3]]);
  });

  it('should be able to calculate total amount of money spent on a trip', function() {
    expect(traveler.calculateTripCost4Traveler(trips[8])).to.equal(4004);
  });

  it('should be able to calculate total amount of money spent on a trips for a year', () => {
    traveler = new Traveler(trips, destinations, travelerInfo[1])

    expect(traveler.calculateTravelExpenses4yr('2020')).to.deep.equal(2596);
  });

  it('should be able to calculate total yearly trip cost for multiple years', () => {
    traveler = new Traveler(trips, destinations, travelerInfo[2])

    expect(traveler.calculateTravelExpenses4yr('2020')).to.deep.equal(0);
    expect(traveler.calculateTravelExpenses4yr('2019')).to.deep.equal(5819);
  });

  it('should return a message if parameter is not given in "YYYY" format', () => {
    traveler = new Traveler(trips, destinations, travelerInfo[1])

    expect(traveler.calculateTravelExpenses4yr('twenty-twenty')).to.deep.equal("Invalid Input");
  });
});
