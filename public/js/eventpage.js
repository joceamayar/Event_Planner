let id = req.query.eventID

let eventFetch = async ()=> {
    let response = await fetch(`/eventID=${id}`, {
        method: 'GET'
    })
    return response;
}

eventFetch()

let saveEvent = async () => {
    let eventData = await eventFetch()
    //Get what you need from eventData and then put it in the body for the post fetch//
    
    let response = await fetch('/api/events',{
        method: "POST",
        body: {
            user_id: ,
            ticketmaster_id: ,
            imageURL: ,
            name: ,
            start_date_time: ,
            zip_code: ,
            address: ,
            city: ,
            state: ,
            classification_id: ,
        },
        header: 'Content-Type: application/json'
    })
    


  //------------Grab All of these -------------//

    // user_id: req.body.user_id,
    // ticketmaster_id: req.body.ticketmaster_id,
    // ticketmaster_url: req.body.ticketmaster_url,
    // imageUrl: req.body.imageUrl,
    // name: req.body.name,
    // description: req.body.description,
    // start_date_time: req.body.start_date_time,
    // end_date_time: req.body.end_date_time,
    // zip_code: req.body.zip_code,
    // address: req.body.address,
    // city: req.body.city,
    // state: req.body.state,
    // classification_id: req.body.classification_id

}


let saveButton = document.getElementById('save-btn')

saveButton.addEventListener('click', saveEvent)

