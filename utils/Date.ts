import moment from "moment-timezone";

export const getZoneForCountry = (countryISO2: string) => {
  if (countryISO2 === "UN") {
    return "UTC";
  }
  if (countryISO2 === "MX") {
    return "America/Mexico_City";
  }
  const countryTimezones = moment.tz.zonesForCountry(countryISO2);
  return countryTimezones && !!countryTimezones.length
    ? countryTimezones[0]
    : "";
};

export const getTimeByTimezone = (timezone: string) => {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const formatter = new Intl.DateTimeFormat([], options);
  return formatter.format(new Date());
};
