let fetchOnPageLoad = async () => {
    try {
        const response = await fetch('http://localhost:3001/api/classifications', {
            method: 'GET'
        })

        if (response.ok) {
            // If successful, redirect the browser to the profile page
            let data = await response.json()
            window.classifications = data;
            console.log(window.classifications)
            return;
        } else {
            alert(response.statusText);
        }

    } catch (error) {
        console.log(error)
    }
}

fetchOnPageLoad();

