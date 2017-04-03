'use strict';

const fs = require('fs');
const DistanceConstants = require('./DistanceConstants');

const readFile = (fileName) => {
	return new Promise ((resolve, reject) => {
		fs.readFile(fileName, 'utf8', (err, data) => {
			if (err) {
				reject(err);
			}
			resolve(data.split("\n"));
		});
	});
}

const findSetCloseToArea = (dataList, areaCoord, radiusDistance) => {
	const resultList = [];
	dataList.forEach((value) => {
		let valObject = JSON.parse(value);

		if (getGreatCircleDistance(parseInt(valObject.latitude), parseInt(valObject.longitude), 
			areaCoord.latitude, areaCoord.longitude) <= radiusDistance) {
			resultList.push(valObject);
		}
	});
	return resultList;
}

const getGreatCircleDistance = (lat1, long1, lat2, long2) => {
  	if (lat1 == null || long1 == null || lat2 == null || long2 == null) {
  		return;
  	}
	const dLat = deg2rad(lat2-lat1);
  	const dLong = deg2rad(long2-long1);
  	const a = 
    	Math.sin(dLat/2) * Math.sin(dLat/2) +
    	Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    	Math.sin(dLong/2) * Math.sin(dLong/2);
  	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  	const d = DistanceConstants.EARTH_RADIUS * c;
  	return d;
}

function deg2rad(deg) {
	return deg * (Math.PI/180);
}

const sortSet = (list, key) => {
	list.sort((a, b) => {
		if (a[key] < b[key]) {
			return -1;
		} else if (a[key] > b[key]) {
			return 1;
		} else {
			return 0;
		}
	});
}

const main = () => {
	readFile('customers.txt')
	.then((dataList) => {
		return findSetCloseToArea(dataList, DistanceConstants.DUBLIN_COORD, DistanceConstants.MAX_DISTANCE);
	})
	.then((dataList) => {
		sortSet(dataList, 'user_id');
		console.log(dataList);
		return dataList;
	})
};

module.exports = {
	findSetCloseToArea,
	getGreatCircleDistance,
	deg2rad,
	main
}
