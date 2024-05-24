const currentTime = new Date();
const offsetGMT7 = 7 * 60; // GMT+7 offset in minutes
console.log(currentTime);

// Get the current time in UTC and then add the offset for GMT+7
const localTimeGMT7 = new Date(currentTime.getTime() + offsetGMT7 * 60 * 1000);

const padZero = (number) => number.toString().padStart(2, '0');

const month = padZero(localTimeGMT7.getUTCMonth() + 1); // Months are zero-based
const day = padZero(localTimeGMT7.getUTCDate());
const year = localTimeGMT7.getUTCFullYear();
const hours = padZero(localTimeGMT7.getUTCHours());
const minutes = padZero(localTimeGMT7.getUTCMinutes());
const seconds = padZero(localTimeGMT7.getUTCSeconds());

const formattedTime = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;

console.log(formattedTime);