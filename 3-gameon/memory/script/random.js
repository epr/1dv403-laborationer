var Generator = {
    randomPairs: function (pairsAmount) {
        "use strict";
        var pairsArray = [],
            i,
            imageOneOK,
            imageTwoOK,
            randomOne,
            randomTwo;
        for (i = 1; i <= pairsAmount; i += 1) {
            imageOneOK = false;
            imageTwoOK = false;
            do {
                if (imageOneOK === false) {
                    randomOne = Math.floor(Math.random() * pairsAmount * 2);
                    if (!pairsArray[randomOne]) {
                        pairsArray[randomOne] = i;
                        imageOneOK = true;
                    }
                }
                if (imageTwoOK === false) {
                    randomTwo = Math.floor(Math.random() * pairsAmount * 2);
                    if (!pairsArray[randomTwo]) {
                        pairsArray[randomTwo] = i;
                        imageTwoOK = true;
                    }
                }
            } while (imageOneOK === false || imageTwoOK === false);
        }
        return pairsArray;
    }
};