import chai from 'chai';
const expect = chai.expect;

import Traveler from '../src/main/traveler'
import User from '../src/main/user'

describe('Traveler subclass', () => {
  let traveler;
  let travelerInfo = {
    "id": 25,
    "name": "Leighton Doerrling",
    "travelerType": "relaxer"
    }; 

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

  it('should return an error when no traveler information is given', () => {

  });
});