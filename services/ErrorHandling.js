const toErrorArray = error => {
  if (typeof error === "object") {
    return [error.message];
  }

  let errorsArray;
  const parsedError = JSON.parse(error.message);
  if (!parsedError) {
    errorsArray = [error.message];
  } else {
    errorsArray =
      parsedError.constructor === Array ? parsedError : [parsedError];
  }
  return errorsArray;
};

export default {
  toErrorArray
};
