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
    expect(user).to.have.property('destinationKey')
  })

  it('should have an empty array if no destination key is given', () => {
    expect(user.destinationKey).to.equal([])
  })
});