const API_KEY = localStorage.getItem("API_KEY");
const user_page_image = document.getElementById("user_page_image");

window.addEventListener("DOMContentLoaded", async () => {
  const getOrgID = async function () {
    const OrgId = await fetch("https://api.calendly.com/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    const orgIdData = await OrgId.json();
    return orgIdData.resource;
  };

  const userData = await getOrgID();
  user_page_image.src = userData.avatar_url;

  document.querySelector("#name").textContent = userData.name;
});
