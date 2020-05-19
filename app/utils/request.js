/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
// function parseJSON(response) {
//   if (response.status === 204 || response.status === 205) {
//     return null;
//   }

//   return response.json();
// }

function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }

  const reader = response.body.getReader();
  let result = '';

  // read() returns a promise that resolves
  // when a value has been received
  return reader.read().then(function processText({ done, value }) {
    // Result objects contain two properties:
    // done  - true if the stream has already given you all its data.
    // value - some data. Always undefined when done is true.
    if (done) {
      console.log('Stream complete');
      const obj = JSON.parse(result);

      response.headers.forEach(header => {
        const [key, val] = header;
        if (key === 'refresh-jwt') obj.token = val;
        if (key === 'refresh-token') obj['refresh-token'] = val;
      });

      return obj;
    }

    // value for fetch streams is a Uint8Array
    const chunk = value;
    result += new TextDecoder('utf-8').decode(chunk);

    // Read some more, and call this function again
    return reader.read().then(processText);
  });
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}
