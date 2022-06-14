export const dateFormtat = () => {
  let options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  let today = new Date();

  return today.toLocaleDateString("es-Es", options);
};
