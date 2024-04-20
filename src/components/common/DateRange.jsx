import React from 'react';
import moment from 'moment'; // You need to install moment.js if not already

const DateRange = ({ startDate, endDate }) => {
    const formattedStartDate = moment(startDate).format('MMM D, YYYY');
    const formattedEndDate = moment(endDate).format('MMM D, YYYY');

    return (
        <div className="text-sm text-greyDark">
            {formattedStartDate} - {formattedEndDate}
        </div>
    );
};

export default DateRange;
