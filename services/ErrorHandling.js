const toErrorArray = error => {
  try {
    let errorsArray;
    const parsedError = JSON.parse(error.message);
    if (!parsedError) {
      errorsArray = [error.message];
    } else {
      errorsArray =
        parsedError.constructor === Array ? parsedError : [parsedError];
    }
    return errorsArray;
  } catch (newError) {
    return [error.message];
  }
};

export default {
  toErrorArray
};
