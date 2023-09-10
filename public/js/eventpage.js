let id = req.query.eventID

let eventFetch = async ()=> {
    //let response = await fetch(`/eventID=${id}`, {
    //let response = await fetch(`/event?eventID=${id}&categoryId=${categoryId}`, {
   
    //Try get/?eventID and if it doesn't fetch then try get?eventID
    let response = await fetch(`/event/${id}`, {
        method: 'GET'
    })
    return response;
}



let saveEvent = async () => {
    let eventData = await eventFetch()
    //Get what you need from event and then put it in the body for the post fetch//
    
    let response = await fetch('/api/events',{
        method: "POST",
        body: {
            ticketmaster_id: eventData.id,
            imageURL: eventData.images.find(image => image.ratio==="4_3").url,
            name: eventData.name,
            start_date_time: eventData.dates.start.localDate,
            zip_code: eventData._embedded.venues[0].postalCode.slice(0,5),
            address: eventData._embedded.venues[0].address.line1,
            city: eventData._embedded.venues[0].city.name,
            state: eventData._embedded.venues[0].state.name,
            classification_id: eventData.classifications[0].segment.id,
        },
        header: 'Content-Type: application/json'
    })

    if (response.ok) {
        showPopup()
      } else {
        alert('Failed to Save Event, try again');
      }
}



//--------POPUP-------------//

function showPopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "block";
}

// Function to hide the popup
function hidePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
}

// Attach an event listener to the save button
const saveButton = document.getElementById("save-btn");
saveButton.addEventListener("click", () => {
    saveEvent();
});

// Attach an event listener to the close button of the popup
const closeButton = document.getElementById("closeButton");
closeButton.addEventListener("click", () => {
    hidePopup();
});

// Automatically hide the popup after a few seconds (e.g., 3 seconds)
setTimeout(() => {
    hidePopup();
}, 3000); 