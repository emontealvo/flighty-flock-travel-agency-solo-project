import chai from 'chai';
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies)

import DomUpdates from '../src/main/domUpdates'

describe('DomUpdates class', function() {

  it('should be a function', () => {
    let domUpdates = new DomUpdates();
    expect(DomUpdates).to.be.a('function');  
  });

  it('should create an instance of the domUpdates class', () => {
    let domUpdates = new DomUpdates();
    expect(domUpdates).to.be.an.instanceof(DomUpdates);  
  });


});