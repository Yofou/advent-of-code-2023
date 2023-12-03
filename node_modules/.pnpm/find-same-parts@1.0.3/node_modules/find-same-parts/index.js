/**
 * Created by chenjihu on 2018/7/11.
 */

module.exports = function findSameParts(str1, str2, options={}) {
    if (typeof str1 !== "string" || typeof str2 !== "string") {
        return [];
    }
    let trimStr1 = str1.trim();
    let trimStr2 = str2.trim();
    if (trimStr1.length === 0 || trimStr2.length === 0) {
        return [];
    }

    let {minStrLength, ignoreCase} = options;

    if(ignoreCase === undefined || (ignoreCase !== 0 && ignoreCase !== false)) {
        ignoreCase = true; //default
    }

    if (ignoreCase === true) {
        trimStr1 = trimStr1.toLowerCase();
        trimStr2 = trimStr2.toLowerCase();
    }

    const strArray = [trimStr1, trimStr2];
    const index = trimStr1.length <= trimStr2.length ? 0 : 1;
    const shortStr = strArray[index];
    const longStr = strArray[1 - index];

    if(!minStrLength || minStrLength < 1) {
        minStrLength = 3; //default value
    }

    if(minStrLength > shortStr.length) {
        minStrLength = shortStr.length;
    }

    let allFoundStr = [];
    for (let i = 0; i < shortStr.length - minStrLength + 1;) {
        let foundStr;
        for (let j = minStrLength; j <= shortStr.length - i; j++) {
            let tempStr = shortStr.substr(i, j);
            if (longStr.indexOf(tempStr) > -1) {
                foundStr = tempStr;
            } else {
                break;
            }
        }
        if (foundStr) {
            allFoundStr.push(foundStr.trim());
            i += foundStr.length;
        } else {
            i++;
        }
    }
    return allFoundStr;
};
