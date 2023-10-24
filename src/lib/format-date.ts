const formatDate = (date: Date) => {
  // Define months array to get month names
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get individual date components
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours from 24-hour format to 12-hour format
  const hours12 = hours % 12 || 12;

  // Create the formatted date string
  const formattedDate = `${day} ${month}, ${year} ${hours12}:${minutes} ${ampm}`;
  return formattedDate;
};

export default formatDate;
