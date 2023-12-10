import React, { FC } from "react";
import dayjs from "dayjs";

interface DateFormatterProps {
  dateString: string;
}

const formatDate = (dateString: string): string => {
  // dateString is in the format "DD-MM-YY"
  const [day, month, year] = dateString.split("-").map(Number);

  const formattedDate: string = dayjs()
    .year(year + 2000)
    .month(month - 1)
    .date(day)
    .format("MMMM DD, YYYY");

  return formattedDate;
};

const DateFormatter: FC<DateFormatterProps> = ({ dateString }) => {
  const formattedDate: string = formatDate(dateString);
  return <span>{formattedDate}</span>;
};

export default DateFormatter;