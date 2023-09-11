const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Unable to Logout');
  }
};

let logOutButton = document.querySelector('#logOutButton')

logOutButton.addEventListener('click', logout);

