export async function fetchGet(
  url: string,
  callback?: Function,
  errorFunc?: Function,
) {
  try {
    const response = await fetch(url)
    const responseData = await response.json();
    if (response.status === 200) {
      return callback ? callback(responseData) : responseData;
    }
    errorFunc && errorFunc(response);
  } catch (err) {
    console.error(err);
  }
}