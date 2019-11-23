const toErrorArray = (error: Error): string[] => {
  try {
    let errorsArray: string[];
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
