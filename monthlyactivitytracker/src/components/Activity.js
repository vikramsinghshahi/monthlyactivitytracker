function Activity(props) {
  function getDays(m, y) {
    let daysInMonth = new Date(y, m, 0).getDate();
    let days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  }
  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let date = new Date();
  let month = date.getMonth();
  let year = date.getFullYear();
  let numberOfDays = getDays(month, year);
  let activities = props.activities;

  return (
    <>
      {activities.map((activity, i) => {
        return (
          <section className="box" key={i}>
            <div className="col-1">
              <div>
                <h4 className="activity">{activity.activityName}</h4>
                <h4 className="month">{months[month]}</h4>
              </div>
            </div>
            <div className="col-2">
              {numberOfDays.map((day) => {
                return (
                  <button
                    id={i}
                    key={day}
                    className={
                      !activity.activityDays.includes(String(day))
                        ? 'box_btn'
                        : 'active'
                    }
                    value={day}
                    onClick={(e) => props.handleClick(e)}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
            <div className="cross">
              <p id={i} onClick={(e) => props.handleRemove(e)}>
                x
              </p>
            </div>
          </section>
        );
      })}
    </>
  );
}

export default Activity;
