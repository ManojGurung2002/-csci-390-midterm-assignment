import React, {} from "react";

function Reminder(props) {
    return (
           <span>

                {/* The following will display the reminder to be completed and outstanding */}
                { props.showCompletedReminders ? <s>{props.reminder.title}</s> :  <span>{props.reminder.title}</span>}
            
            </span>
    );
}

export default Reminder;
