import chai from 'chai';
const expect = chai.expect;
import User from '../src/main/user'

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
    expect('type').to.be.a.property.of(user);
  });

  it('should default to a guest user type', () => {
    expect(user.type).to.equal('Guest');
  });

  it('should be able to be other types of user', () => {
    user = new User('Traveler');
    expect(user.type).to.equal('Traveler');
  });

  it('should hold onto trips', () => {
    expect('trips').to.be.a.property.of(user);
  });

  it('should default to an empty array if no trips are given', () => {
    expect(user.trips).to.deep.equal([]);
  });
});