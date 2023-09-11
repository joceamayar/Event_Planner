const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if(!email || !password){
    alert("You must input an email and password to Login")
  }

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (await response.ok) {
      // If successful, redirect the browser to the profile page
      window.location.replace('/profile');
    } else {
      alert("Incorrect Email or Password, Please Try Again");
      window.location.reload()
    }
  }
};

let loginButton = document.querySelector('button');
loginButton.addEventListener('click', loginFormHandler);