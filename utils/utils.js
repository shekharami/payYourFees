const funcs = {};
funcs.createErrorObject = function ({ status, error, message }) {
  const err = new Error();
  err.status = status;
  err.error = error;
  err.message = message;
  return err;
};
funcs.areRequiredFieldsPresent = function (...args) {
  const params = args[0];
  const missingKeys = [];
  for (const key in params) {
    if (!(params[key] || params[key] === 0)) {
      missingKeys.push(key);
    }
  }
  if (missingKeys.length) {
    throw this.createErrorObject({
      status: 400,
      message: `Param '${missingKeys.join()}' ${missingKeys.length === 1 ? 'is' : 'are'} required`
    });
  }
  return true;
};
funcs.deepEqual = function (x, y) {
  if (x === y) {
    return true;
  } else if (typeof x == 'object' && x != null && typeof y == 'object' && y != null) {
    if (Object.keys(x).length != Object.keys(y).length) return false;
    for (let prop in x) {
      if (y.hasOwnProperty(prop)) {
        if (!funcs.deepEqual(x[prop], y[prop])) return false;
      } else return false;
    }

    return true;
  } else return false;
};

funcs.getUniqueElementsFromArray = ({ array }) => {
  const newArray = [];
  if (Array.isArray(array)) {
    if (array.length === 1) {
      return array;
    }
    if (array.length > 1) {
      for (let i = 0; i < array.length; i++) {
        if (!funcs.deepEqual(array[i], array[i + 1])) {
          newArray.push(array[i]);
        }
      }
    }
    return newArray;
  } else {
    return null;
  }
};

funcs.areArraysWithObjElemEqual = (arrA, arrB) => {
  let lengthA = arrA.length;
  const lengthB = arrB.length;
  let flag = false;
  if (lengthA !== lengthB) {
    return flag;
  }
  for (let i = 0; i < lengthA; i++) {
    for (let j = 0; j < lengthB; j++) {
      flag = funcs.deepEqual(arrA[i], arrB[j]);
      if (flag) {
        break;
      }
    }
    if (!flag) {
      break;
    }
  }
  return flag;
};

module.exports = funcs;
