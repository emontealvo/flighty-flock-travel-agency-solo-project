import chai from 'chai';
const expect = chai.expect;
import User from '../src/main/user'

describe('User Class', () => {

  let user;
  beforeEach(() => {
    user = new User()
  })

  it('should be a function', () => {
    expect(User).to.be.a('function')
  });

  it('should create an User instance', () => {
    expect(user).to.be.an.instanceof(User)
  });

  it('should have a type', () => {
    expect('type').to.be.a.property.of(user)
  });

  it('should default to a guest user type', () => {
    expect(user.type).to.equal('Guest')
  })
})