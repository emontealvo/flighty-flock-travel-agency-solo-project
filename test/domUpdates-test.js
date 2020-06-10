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

  describe.skip('DomUpdates behavior', function() {
		
    let domUpdates;
			
    beforeEach(function () {
      global.document = {};
      chai.spy.on(document, "querySelector", () => {
        return global.document
      });
      chai.spy.on(document, "addEventListener", () => {});
		
      let querySelector = document.querySelector()
      let querySelectors = {
        0: {},
        1: {},
        2: {},
        3: {},
        4: {},
        5: {},
        6: {},
      }
			
      domUpdates = new DomUpdates(querySelectors);
    })
		
    it('should declare a number of event listeners', () => {
      console.log(domUpdates)
      domUpdates.declareEventListeners()
      expect(document.addEventListener).to.have.been.called(6);		
    })
  })

  describe.skip('Destination Catalog Creation', () => {
		
    beforeEach(function () {
      global.document = {};
      chai.spy.on(document, "createElement", () => {});
    })

    it("should create a div element to hold images", () => {
      let domUpdates = new DomUpdates();
      domUpdates.createDestinationCatalog()
      expect(document.createElement()).to.have.been.called(1);
			
    });
  })

  describe.skip('Local Storage an user', () => {
    beforeEach(function () {
      global.localStorage = {};
      chai.spy.on(localStorage, ["setItem"], () => {});
    })

    it("should save an user", () => {
      let domUpdates = new DomUpdates({}, {user: {type: "human"}});
      domUpdates.saveUser()
      expect(localStorage.setItem()).to.have.been.called(1);
			
    });
  })
		
});
