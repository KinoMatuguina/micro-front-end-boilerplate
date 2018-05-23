
import rp from 'request-promise';
import ServerConfig from '../app/config/ServerConfig';

const tips = ServerConfig.serverApiEndpoints.tips;
const systemStatus = ServerConfig.serverApiEndpoints.systemStatus;
const nationality = ServerConfig.serverApiEndpoints.nationality;
const country = ServerConfig.serverApiEndpoints.country;
const province = ServerConfig.serverApiEndpoints.province;
const city = ServerConfig.serverApiEndpoints.city;
const branch = ServerConfig.serverApiEndpoints.branch;
const connectorCd = ServerConfig.serverApiEndpoints.connectorCd;
const gross = ServerConfig.serverApiEndpoints.gross;
const acceptableId = ServerConfig.serverApiEndpoints.acceptableId;
const natureOfBusiness = ServerConfig.serverApiEndpoints.natureOfBusiness;
const natureOfEmployment = ServerConfig.serverApiEndpoints.natureOfEmployment;
const sourceOfFunds = ServerConfig.serverApiEndpoints.sourceOfFunds;



describe('Maintinance services', () => {

 it('should load tips and match on snapshots', () => {
 	var tree = {}
 	return rp({
		  method: "GET",
		  uri: tips,
		  body: {},
		  resolveWithFullResponse: true,
		  json: true})
	    .then(function (response) {
	    	expect.assertions(1);
	    	tree = response.body
	    	expect(tree).toMatchSnapshot();
	    })
	 })

 it('should load systemStatus and match on snapshots', () => {
 	var tree = {}
 	return rp({
		  method: "GET",
		  uri: systemStatus,
		  body: {},
		  resolveWithFullResponse: true,
		  json: true})
	    .then(function (response) {
	    	expect.assertions(1);
	    	tree = response.body
	    	expect(tree).toMatchSnapshot();
	    })
 })

 it('should load nationality and match on snapshots', () => {
 	var tree = {}
 	return rp({
		  method: "GET",
		  uri: nationality,
		  body: {},
		  resolveWithFullResponse: true,
		  json: true})
	    .then(function (response) {
	    	expect.assertions(1);
	    	tree = response.body
	    	expect(tree).toMatchSnapshot();
	    })
 })

 it('should load country and match on snapshots', () => {
 	var tree = {}
 	return rp({
		  method: "GET",
		  uri: country,
		  body: {},
		  resolveWithFullResponse: true,
		  json: true})
	    .then(function (response) {
	    	expect.assertions(1);
	    	tree = response.body
	    	expect(tree).toMatchSnapshot();
	    })
 })

 it('should load natureOfBusiness and match on snapshots', () => {
 	var tree = {}
 	return rp({
		  method: "GET",
		  uri: natureOfBusiness,
		  body: {},
		  resolveWithFullResponse: true,
		  json: true})
	    .then(function (response) {
	    	expect.assertions(1);
	    	tree = response.body
	    	expect(tree).toMatchSnapshot();
	    })
 })

 it('should load natureOfEmployment and match on snapshots', () => {
 	var tree = {}
 	return rp({
		  method: "GET",
		  uri: natureOfEmployment,
		  body: {},
		  resolveWithFullResponse: true,
		  json: true})
	    .then(function (response) {
	    	expect.assertions(1);
	    	tree = response.body
	    	expect(tree).toMatchSnapshot();
	    })
 })

 it('should load sourceOfFunds and match on snapshots', () => {
 	var tree = {}
 	return rp({
		  method: "GET",
		  uri: sourceOfFunds,
		  body: {},
		  resolveWithFullResponse: true,
		  json: true})
	    .then(function (response) {
	    	expect.assertions(1);
	    	tree = response.body
	    	expect(tree).toMatchSnapshot();
	    })
 })

 it('should load task and match on snapshots', () => {
 	var tree = {}
 	return rp({
	  method: "GET",
	  uri: "http://192.168.1.249:8088/task/findTaskByBranchCodeUserRole?page=0&count=10&order=ASC&sort=lastUpdatedDate&branchCode=0001&financialInstitution=BPI%20FAMILY%20SAVINGS&userRole=MAKER2&isViewAll=true",
	  body: {},
	  resolveWithFullResponse: true,
	  json: true})
    .then(function (response) {
    	expect.assertions(1);
    	tree = response.body
    	expect(tree).toMatchSnapshot();
    })
 })

 it('should load financial institution image and match on snapshots', () => {
 	var tree = {}
 	return rp({
		  method: "GET",
		  uri: "http://192.168.1.249:8053/logo/findLogoByFinancialInstitution?financialInstitution=BPI%20FAMILY%20SAVINGS",
		  body: {},
		  resolveWithFullResponse: true,
		  json: true})
	    .then(function (response) {
	    	expect.assertions(1);
	    	tree = response.body
	    	expect(tree).toMatchSnapshot();
	    })
 })

it('should load bundle and match on snapshots', () => {
 	var tree = {}
 	return rp({
		  method: "GET",
		  uri: "http://192.168.1.249:8088/bundle/findAllBundleByFinancialInstitution?financialInstitution=BPI%20FAMILY%20SAVINGS",
		  body: {},
		  resolveWithFullResponse: true,
		  json: true})
	    .then(function (response) {
	    	expect.assertions(1);
	    	tree = response.body
	    	expect(tree).toMatchSnapshot();
	    })
 })

it('should load product and match on snapshots', () => {
 	var tree = {}
 	return rp({
		  method: "GET",
		  uri: "http://192.168.1.249:8088/product/findAllProductByBundleIdFinancialInstitution?bundleId=001&financialInstitution=BPI%20FAMILY%20SAVINGS",
		  body: {},
		  resolveWithFullResponse: true,
		  json: true})
	    .then(function (response) {
	    	expect.assertions(1);
	    	tree = response.body
	    	expect(tree).toMatchSnapshot();
	    })
 })

})
