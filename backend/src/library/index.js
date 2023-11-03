export const getObjectKey = (obj, value) => Object.keys(obj).find(key => obj[key] === value);

export const convertTimeStringToDate = (date, timeString = '00:00') => {
  const dateStr = date.split('-');

  return new Date(
    +dateStr[0],
    +dateStr[1] - 1,
    +dateStr[2],
    +timeString.substring(0, 2),
    +timeString.substring(3, 5)
  );
};

export const stayAlive = () => {
  const interval = 10 * 1000; // interval in milliseconds - {1mins x 60s x 1000}ms
  const url = 'https://test-app-123-1213.herokuapp.com';
  try {
    console.log('Hello');
    const handler = setInterval(() => {
      fetch(url)
        .then(res => console.log(`response-ok: ${res.ok}, status: ${res.status}`))
        .catch(err => console.error(`Error occured: ${err}`));
    }, interval);
  } catch (err) {
    console.error('Error occured: retrying...');
    clearInterval(handler);
    return setTimeout(() => wake(), 10000);
  }
};
