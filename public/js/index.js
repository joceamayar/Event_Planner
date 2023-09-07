let fetchOnPageLoad = async () =>{
    try {
        const response = await fetch('/',{
            method: 'GET'
        })

        if (response.ok) {
            // If successful, redirect the browser to the profile page
            return;
          } else {
            alert(response.statusText);
          }

    } catch (error) {
        console.log(error)
    }
}

fetchOnPageLoad();