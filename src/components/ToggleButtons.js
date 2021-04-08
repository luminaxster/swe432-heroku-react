import React from "react";
import ToggleButton from "@material-ui/core/ToggleButton";
import ToggleButtonGroup from "@material-ui/core/ToggleButtonGroup";


function ToggleWeekDay(props) {
  const {value, onChange} =props;
  const handleWeekDay = (event, newWeekDay)=>{
    onChange(newWeekDay);
  };

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleWeekDay}
      aria-label="Week day"
    >
      <ToggleButton value="Monday" aria-label="Monday">
        Monday
      </ToggleButton>
      <ToggleButton value="Tuesday" aria-label="Tuesday">
        Tuesday
      </ToggleButton>
      <ToggleButton value="Wednesday" aria-label="Wednesday">
        Wednesday
      </ToggleButton>
      <ToggleButton value="Thursday" aria-label="Thursday">
        Thursday
      </ToggleButton>
      <ToggleButton value="Friday" aria-label="Friday">
        Friday
      </ToggleButton>
      <ToggleButton value="Saturday" aria-label="Saturday">
        Saturday
      </ToggleButton>
      <ToggleButton value="Sunday" aria-label="Sunday">
        Sunday
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default function ToggleButtons(){
    const [weekDay, setWeekDay] = React.useState("Monday");
    return <ToggleWeekDay value={weekDay} onChange ={setWeekDay}/>;
}
