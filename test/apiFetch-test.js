import chai from 'chai';
const expect = chai.expect;
import ApiFetch from '../src/main/apiFetch'

describe ('Api fetch class', function() {

  it('should be a function', function() {
    let apiFetch = new ApiFetch();

    expect(ApiFetch).to.be.a('function');
  });

  it('should create an instance of an ApiClass', function() {
    let apiFetch = new ApiFetch();

    expect(apiFetch).to.be.an.instanceof(ApiFetch)
  });

  it('should have our api\'s root url as default', function() {
    let url = "https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/"
    let apiFetch = new ApiFetch();

    expect(apiFetch.rootUrl).to.equal(url)
  })
})