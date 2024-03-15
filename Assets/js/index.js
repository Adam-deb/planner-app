dayjs.extend(window.dayjs_plugin_advancedFormat);

$(document).ready(function() {
  const today = dayjs();
  const formattedDate = today.format("dddd, MMMM Do");
  $("#currentDay").text(formattedDate);

  const workHours = {
    start: 9,
    end: 17
  };

  const timeBlockGrid = $("#timeBlock");

  for (let hour = workHours.start; hour <= workHours.end; hour++) {
    const timeLabel = dayjs().hour(hour).format("h A");

    // Create the row
    const row = $(`<div class="row"></div>`);

    // Create the columns
    const timeCol = $(`<div class="col-1">'${timeLabel}'</div>`);
    const eventCol = $(`<div class="col-10"><input type="text" class="form-control"></div>`);
    const saveCol = $(`<div class="col-1"><button class="btn btn-primary">Save</button></div>`);

    // Append columns to the row
    row.append(timeCol, eventCol, saveCol);

    // Add classes based on current/past hour
    const past = hour < today.hour();
    const current = hour === today.hour();

    if (past) {
      row.addClass("past");
    } else if (current) {
      row.addClass("present");
    } else {
      row.addClass("future");
    }

    // Append the row to the schedule grid
    timeBlockGrid.append(row);
  }
});

