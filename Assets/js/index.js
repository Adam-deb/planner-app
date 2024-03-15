//advancedFormat dayjs plugin
dayjs.extend(window.dayjs_plugin_advancedFormat);

$(document).ready(function() {
  const today = dayjs().hour(11);
  const formattedDate = today.format("dddd, MMMM Do");
  $("#currentDay").text(formattedDate);

  const workHours = {
    start: 9,
    end: 17
  };

  const timeBlockGrid = $("#timeBlock");

  //Populate textarea with saved events from localStorage
  function populateEvents() {
    $(".row").each(function() {
      const time = $(this).find(".hour").text();
      const savedEvent = localStorage.getItem(time);
      if (savedEvent) {
        $(this).find("textarea").val(savedEvent);
      }
    });
  }

  //Builds the time block
  for (let hour = workHours.start; hour <= workHours.end; hour++) {
    const timeLabel = dayjs().hour(hour).format("h A");

    const row = $(`<div class="row"></div>`);

    const timeCol = $(`<div class="col-1 hour">${timeLabel}</div>`);
    const eventCol = $(`<div class="col-10 description"><textarea class="form-control"></textarea></div>`);
    const saveCol = $(`<div class="col-1 save"><button class="btn btn-primary saveBtn h-100 w-100 pl-0">Save</button></div>`);

    row.append(timeCol, eventCol, saveCol);

    const past = hour < today.hour();
    const current = hour === today.hour();

    if (past) {
      eventCol.addClass("past");
    } else if (current) {
      eventCol.addClass("present");
    } else {
      eventCol.addClass("future");
    }

    timeBlockGrid.append(row);
  }

  //Populates events from local storage after the grid loads
  populateEvents();

  //Adds event and time data to local storage
  function addToLocalStorage() {
    const row = $(this).closest(".row");
    const time = row.find(".hour").text();
    const event = row.find("textarea").val();
    localStorage.setItem(time, event);
  }

  //Once the save button is pressed the data is pushed to local storage
  $(".saveBtn").on("click", addToLocalStorage);

});
