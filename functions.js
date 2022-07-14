const API_KEY = localStorage.getItem("API_KEY");

if (!API_KEY) {
  window.location.href = "welcome_page.html";
}

window.addEventListener("DOMContentLoaded", function () {
  document.getElementById("logout").addEventListener("click", function () {
    localStorage.removeItem("API_KEY");
    window.location.href = "welcome_page.html";
  });
  const monday = document.getElementById("monday");
  const tuesday = document.getElementById("tuesday");
  const wednesday = document.getElementById("wednesday");
  const thursday = document.getElementById("thursday");
  const friday = document.getElementById("friday");

  const getOrgID = async function () {
    const OrgId = await fetch("https://api.calendly.com/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    const orgIdData = await OrgId.json();
    return orgIdData.resource.current_organization;
  };

  const dataFunction = async function (orgId) {
    /* https://stackoverflow.com/a/5210450 */
    const curr = new Date(); // get current date
    const first = curr.getDate() - curr.getDay() + 7; // First day is the day of the month - the day of the week
    const last = first + 6; // last day is the first day + 6
    const firstday = new Date(curr.setDate(first));
    const lastday = new Date(curr.setDate(last));

    const pullData = await fetch(
      `https://api.calendly.com/scheduled_events?organization=${orgId}&min_start_time=${firstday}&max_start_time=${lastday}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    meetingsData = await pullData.json();

    return meetingsData;
  };

  const getInvitees = async function (uri) {
    const invitees = await fetch(uri + `/invitees`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    const inviteesData = await invitees.json();
    return inviteesData;
  };

  getOrgID().then(async (orgId) => {
    const meetingsData = await dataFunction(orgId);
    for (let index = 0; index < meetingsData?.collection?.length; index++) {
      const uri = meetingsData.collection[index].uri;
      const invitees = await getInvitees(uri);
      const newEvent = document.createElement("div");
      const newEventDetail1 = document.createElement("h4");
      const newEventDetail2 = document.createElement("div");
      const newEventDetail3 = document.createElement("div");
      newEventDetail1.classList.add("newEventDetail");
      newEventDetail2.classList.add("newEventDetail");
      newEventDetail3.classList.add("newEventDetail");
      newEvent.append(newEventDetail1);
      newEvent.append(newEventDetail2);
      newEvent.append(newEventDetail3);
      newEvent.classList.add("newEventCircle");
      const datapoint1 = meetingsData.collection[index].start_time;
      const datapointET = meetingsData.collection[index].name;
      const datapoint2 = new Date(datapoint1);
      const datapoint3 = datapoint2.toLocaleString();
      newEventDetail1.innerText = datapointET;
      newEventDetail2.innerText = invitees.collection[0].name;
      newEventDetail3.innerText = datapoint3;
      const datapoint4 = datapoint2.getDay();
      if (datapoint4 == 1) {
        monday.append(newEvent);
      }
      if (datapoint4 == 2) {
        tuesday.append(newEvent);
      }
      if (datapoint4 == 3) {
        wednesday.append(newEvent);
      }
      if (datapoint4 == 4) {
        thursday.append(newEvent);
      }
      if (datapoint4 == 5) {
        friday.append(newEvent);
      } else {
      }
    }
  });
});
