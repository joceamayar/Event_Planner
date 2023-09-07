let fetchOnPageLoad = async () =>{
    let response = await fetch('/',{
        method: 'GET'
    })

}
fetchOnPageLoad();