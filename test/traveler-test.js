import chai from 'chai';
const expect = chai.expect;

import Traveler from '../src/main/traveler'
import User from '../src/main/user'
import destinations from '../test-data/destinations'
import trips from '../test-data/trips'

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
    let travelerInfo = {
      id: 25,
      name: "Leighton Doerrling",
      travelerType: "relaxer"
      }; 
    
    traveler = new Traveler(trips, destinations, travelerInfo)
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
    let userTrip =   {
      "id": 9,
      "userID": 25,
      "destinationID": 19,
      "travelers": 5,
      "date": "2019/12/19",
      "duration": 19,
      "status": "approved",
      "suggestedActivities": []
      }

    expect(traveler.trips).to.deep.equal([userTrip]);
  });

  it('should filter all of a user\'s trips from the trips data', () => {
    let travelerInfo = {
      id: 43,
      name: "Barron McDuffy",
      travelerType: "Hardcore Relaxer"
      }; 
    
    traveler = new Traveler(trips, destinations, travelerInfo)

    expect(traveler.trips).to.deep.equal([trips[2], trips[3]]);
  });

})