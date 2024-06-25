export const splitDate = (selectedDate: string) => {
  if (!selectedDate) return null; // Return empty string if no date is selected

  try {
    const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    // Adjust date format if necessary
    const formattedDate = selectedDate.split('/').reverse().join('-'); // Convert "DD/MM/YYYY" to "YYYY-MM-DD"
    const resDate = new Date(formattedDate);

    const parts = selectedDate.split('/');

    // Create a new date using the year, month, and day from the split parts
    const date = new Date(`${parts[0]}-${parts[1]}-${parts[2]}`);
    const weekday = date.toLocaleString('en-us', {weekday: 'short'}).toString(); // Full name of the weekday
    const day = date.getDate().toString(); // Day of the month (1-31)
    const monthNumber = date.toLocaleString('en-us', {month: '2-digit'});

    const month = date.toLocaleString('en-us', {month: 'long'}).toString(); // Full name of the month
    const year = date.getFullYear().toString(); // Full year (e.g., 2024)
    return {
      weekday,
      day,
      month,
      year,
      monthNumber,
    };
  } catch (error) {
    console.error('Error parsing date:', error);
    return null; // Return empty string in case of parsing error
  }
};
