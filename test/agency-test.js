import chai from 'chai';
const expect = chai.expect;

import Agency from '../src/main/agency';
import User from '../src/main/user';
import destinations from '../test-data/destinations';
import trips from '../test-data/trips';

describe('Agency as subclass of User', () => {
  let agency;
  
  beforeEach(() => {
    agency = new Agency();
  });

  it('should be a function', () => {
    expect(Agency).to.be.a('function');
  });

  it('should be an instance of the Agency class', () => {
    expect(agency).to.be.an.instanceof(Agency);
  });

  it('should have a default type of "Agency"', () => {
    expect(agency.type).to.equal('Agency');
  });

  it('should be an extension of the user class', () => {
    expect(agency).to.be.an.instanceof(User);
    expect(agency.trips).to.deep.equal([]);
    expect(agency.destinationKey).to.deep.equal([]);
  });
});

describe("Agency behavior", () => {
  let agency;

  beforeEach(() => {
    agency = new Agency(trips, destinations);
  });

  it('should calculate the agency\'s yearly income', () => {
    expect(agency.calculateAgencyYearlyIncome('2019')).to.equal(893);  
  });

  it('should be able to find all pending trips', () => {
    expect(agency.findPendingTrips()).to.deep.equal([trips[1], trips[22], trips[7]]);
  });

  it('should be able to find all ongoing trips for a date', () => {
    expect(agency.findOngoingTrips('2020/06/5')).to.deep.equal([trips[2], trips[6]]);
  });
});
