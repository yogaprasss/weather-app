export const formatDate = (isoDate) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];

  const dateObj = new Date(isoDate);

  const YY = dateObj.getFullYear();
  const MM = dateObj.getMonth();
  const DD = dateObj.getDate();

  const hh = dateObj.getHours();
  const mm = dateObj.getMinutes();

  const dateString = `${months[MM]} ${DD}, ${YY}`;
  const timeString = `${hh < 10 ? '0' : ''}${hh}:${mm < 10 ? '0' : ''}${mm}`;

  return `${dateString} ${timeString}`;
};
