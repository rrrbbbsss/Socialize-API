const { DateTime } = require("luxon");

formatDate = (x) => {
  return new DateTime(x).toLocaleString(DateTime.DATETIME_FULL);
};

module.exports = formatDate;
