export default function generateErrorMessage({
  errorCode,
  message,
  isUnknown,
}) {
  const validation = {
    isInvalid: true,
    errorCode: isUnknown ? 500 : errorCode,
    errorMessage: isUnknown ? 'Unknown Error' : message,
  };

  return validation;
}
