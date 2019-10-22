const safeParseResponse = async (response) => {
  const body = await response.text();

  try {
    return JSON.parse(body)
  } catch (error) {
    return body;
  }
}

const isJSON = (string) => {
  try {
    JSON.parse(string);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = {
  safeParseResponse,
  isJSON
};