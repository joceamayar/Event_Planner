let initialFetch = async() =>{
  let response = await fetch('/profile',{
    method: "GET"
  })
}
initialFetch();