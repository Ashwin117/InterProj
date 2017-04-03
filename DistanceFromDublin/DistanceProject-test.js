'use strict';

var DistanceProject = require('./DistanceProject');
var DistanceConstants = require('./DistanceConstants');
var assert = require('chai').assert;

describe('DistanceProject', function () {
	describe('findSetCloseToDublin', function () {
		var dataList = [
'{"latitude": "53", "user_id": 1, "name": "Conor McGregor", "longitude": "-6"}',
  '{"latitude": "90", "user_id": 2, "name": "Nate Diaz", "longitude": "-10"}'
		];
		it('Should return a set of objects within Dublin radius', function() {
			var resultList = DistanceProject.findSetCloseToArea(dataList, DistanceConstants.DUBLIN_COORD, DistanceConstants.MAX_DISTANCE);
			assert.equal(resultList.length, 1);
			assert.equal(resultList[0].name, 'Conor McGregor');
		});
		it('Should return empty set', function() {
			var resultList = DistanceProject.findSetCloseToArea([], DistanceConstants.DUBLIN_COORD, DistanceConstants.MAX_DISTANCE);
			assert.equal(resultList.length, 0);
		});
	});

	describe('getGreatCircleDistance', function () {
		var LONDON_COORD = {
			'latitude': 51.5074,
			'longitude': 0.1278
		}

		var GOOGLED_DISTANCE_FROM_LONDON_TO_DUBLIN = 465;
		it('Should return distance from one area to anoter area', function () {
			var dist = DistanceProject.getGreatCircleDistance(LONDON_COORD.latitude, LONDON_COORD.longitude,
				DistanceConstants.DUBLIN_COORD.latitude, DistanceConstants.DUBLIN_COORD.longitude);
			
			assert.isAtMost(Math.abs(Math.floor(dist)-GOOGLED_DISTANCE_FROM_LONDON_TO_DUBLIN), 15);
		});
		it('Should return 0 if inputs are not properly supplied', function () {
			var dist = DistanceProject.getGreatCircleDistance(null, LONDON_COORD.longitude,
				DistanceConstants.DUBLIN_COORD.latitude, DistanceConstants.DUBLIN_COORD.longitude);
			
			assert.equal(dist, null);
		});
	});

});