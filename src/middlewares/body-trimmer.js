
const { transform, isString, isObject, set, trim } = require('lodash')


function trimmer(body) {
    return transform(body, (result, value, key) => {
        if (isObject(value)) {
            set(result, key, trimmer(value));
        } else {
            if (isString(value)) {
                set(result, key, trim(value));
            } else {
                set(result, key, value);
            }
        }
    })
}

function customBodyTrimmer () {
    return function (req, _res, next) {
        if (req.body) {
            req.body = trimmer(req.body);
        }
        next();
    }
}

module.exports=customBodyTrimmer;