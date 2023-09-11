// Attach an event listener to the save button
const saveButton = document.querySelector("#save-btn");
saveButton.addEventListener("click", saveEvent);


async function saveEvent () {
    let data_id = document.querySelector('button').getAttribute('data-id')

    let info = await getEventInfo(data_id)
    //Get what you need from event and then put it in the body for the post fetch//
    console.log(info)
    let catID;

    let catArr = [{
        cat: "Miscellaneous",
        key: "1",
        id: "KZFzniwnSyZfZ7v7n1"
      },
      {
        cat: "Sports",
        key: "2",
        id: "KZFzniwnSyZfZ7v7nE"
      },
      {
        cat: "Music",
        key: "3",
        id: "KZFzniwnSyZfZ7v7nJ"
      },
      {
        cat: "Arts & Theatre",
        key: "4",
        id: "KZFzniwnSyZfZ7v7na"
      },
      {
        cat: "Undefined",
        key: "5",
        id: "KZFzniwnSyZfZ7v7nl"
      },
      {
        cat: "Film",
        key: "6",
        id: "KZFzniwnSyZfZ7v7nn"
      }]

       catID = await catArr.find(category=>category.id===info.classification_id).key
    
    let response = await fetch('/api/events/post', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ticketmaster_id: info.ticketmaster_id,
            imageURL: info.imageURL,
            name: info.name,
            start_date_time: info.start_date_time,
            zip_code: info.zip_code,
            address: info.address,
            city: info.city,
            state: info.state,
            classification_id: catID,
            createdEvent: false
        }),
        
    })

    if (response.ok) {
        showPopup()
        return;
      } else {
        alert('Failed to Save Event, try again');
      }
}

async function getEventInfo(id){
        let res = await fetch(`/api/events/${id}`, {
            method: "GET"
        })

        let eventData = await res.json()
        console.log(eventData)
        return eventData
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



// Attach an event listener to the close button of the popup
const closeButton = document.getElementById("closeButton");
closeButton.addEventListener("click", () => {
    hidePopup();
});

// Automatically hide the popup after a few seconds (e.g., 3 seconds)
setTimeout(() => {
    hidePopup();
}, 3000); 