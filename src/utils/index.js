/* eslint-disable import/prefer-default-export */
/**
 * @method convertTime
 * @description converts time to en-GB locale
 * @param {string} time
 * @returns {string} locale time
 */
const convertTime = (time) => {
  const date = new Date(time);
  const options = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: 'numeric',
  };
  const localeDate = new Intl.DateTimeFormat('en-GB', options).format(date);

  return localeDate;
};
/**
 * @method displayChunkMessage
 * @description converts time to en-GB locale
 * @param {string} msg
 * @returns {string} locale time
 */
const displayChunkMessage = (msg) => {
  let element = '<div>';
  msg.forEach((cm) => {
    element += `<p>${cm}</p>`;
  });
  element += '</div>';
  return element;
};
export { convertTime, displayChunkMessage };
