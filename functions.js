window.addEventListener("DOMContentLoaded", function () {
  const monday = document.getElementById("monday");
  const tuesday = document.getElementById("tuesday");
  const wednesday = document.getElementById("wednesday");
  const thursday = document.getElementById("thursday");
  const friday = document.getElementById("friday");

  const API_KEY = localStorage.getItem("API_KEY");
  const getOrgID = async function () {
    const OrgId = await fetch("https://api.calendly.com/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    const orgIdData = await OrgId.json();
    console.log(orgIdData);
    return orgIdData.resource.current_organization;
  };

  const dataFunction = async function (orgId) {
    // const orgID = "https://api.calendly.com/organizations/HCCBKH3NMLBSPXPZ"
    const pullData = await fetch(
      `https://api.calendly.com/scheduled_events?organization=${orgId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    meetingsData = await pullData.json();
    console.log(meetingsData);

    return meetingsData;
  };

  getOrgID().then(async (orgId) => {
    const newEvent = document.createElement("div");
    const newEventDetail1 = document.createElement("p");
    newEvent.append(newEventDetail1);
    newEvent.classList.add("newEventCircle");

    const meetingsData = await dataFunction(orgId);

    // for (let index = 0; index < array.length; index++) {
    // }

    const datapoint1 = meetingsData.collection[0].start_time;
    const datapoint2 = new Date(datapoint1);
    const datapoint3 = datapoint2.toLocaleString();
    newEvent.append(datapoint3);
    const datapoint4 = datapoint2.getDay();
    if (datapoint4 === 1) {
      monday.append(newEvent);
    }
    if (datapoint4 === 2) {
      tuesday.append(newEvent);
    }
    if (datapoint4 === 3) {
      wednesday.append(newEvent);
    }
    if (datapoint4 === 4) {
      thursday.append(newEvent);
    } else {
      friday.append(newEvent);
    }
  });
});
