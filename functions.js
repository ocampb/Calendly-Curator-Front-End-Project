const API_KEY = localStorage.getItem('api_key')

const numberOfMeetings = document.getElementById("numberOfMeetings")

const getOrgID = async function () {
    const OrgId = await fetch("https://api.calendly.com/users/me", {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        }
    })
    const orgIdData = await OrgId.json()
    console.log(orgIdData)
    return orgIdData.resource.current_organization
}

const dataFunction = async function (orgId) {
    // const orgID = "https://api.calendly.com/organizations/HCCBKH3NMLBSPXPZ"
    const pullData = await fetch(`https://api.calendly.com/scheduled_events?organization=${orgId}`, {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        }
    })
    meetingsData = await pullData.json()
    console.log(meetingsData)

    return meetingsData;
}

getOrgID().then(async (orgId) => {
    const meetingsData = await dataFunction(orgId)
    const datapoint1 = meetingsData.collection[0].start_time
    const datapoint2 = new Date(datapoint1)
    const datapoint3 = datapoint2.toLocaleString()
    numberOfMeetings.append(datapoint3)

})

// 👇️ Example date and time in UTC
const utcDate = '2022-01-15T11:02:17Z';

const date = new Date(utcDate);

// 👇️ "Sat Jan 15 2022 13:02:17 GMT+0200 (Eastern European Standard Time)"
console.log(date);

// ✅ Convert to Local time
console.log(date.toLocaleString()); // 👉️ "1/15/2022, 1:02:17 PM"

