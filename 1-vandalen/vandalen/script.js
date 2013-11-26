"use strict";
var makePerson = function (persArr) {
    if (persArr.length > 0) {
        var ages = [], namesArr = [];
        persArr.map(function (pers) {
            ages.push(pers.age);
            namesArr.push(pers.name);
        });
        return {
            minAge : ages.sort()[0],
            maxAge : ages.sort().reverse()[0],
            averageAge : Math.round(ages.reduce(function (a, b) {
                return a + b;
            }) / ages.length),
            names : namesArr.sort(function (a, b) {
                return a.localeCompare(b);
            }).join(", ")
        };
    } else {
        throw new Error;
    }
};

/*var makePerson = function (persArr) {
    var ages = [], namesArr = [];
    persArr.map(function (pers) {
        ages.push(pers.age);
        namesArr.push(pers.name);
    });
    return {
        minAge : ages.sort()[0],
        maxAge : ages.sort().reverse()[0],
        averageAge : Math.round(ages.reduce(function (a, b) {
            return a + b;
        }) / ages.length),
        names : namesArr.sort(function (a, b) {
            return a.localeCompare(b);
        }).join(", ")
    };
};*/

/*var makePerson = function (persArr) {
    var ages = [];
    var ageSum = 0;
    var namesArr = [];
    for (var i = 0; i < persArr.length; i++) {
        ages[i] = persArr[i].age;
        ageSum = ageSum + persArr[i].age;
        namesArr[i] = persArr[i].name;
    }
    return {
        minAge : ages.sort()[0],
        maxAge : ages.sort().reverse()[0],
        averageAge : Math.round(ageSum / ages.length),
        names : namesArr.sort(function (a, b) {
            return a.localeCompare(b);
        }).join(", ")
    };
};*/