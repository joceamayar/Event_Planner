
const logout = async () => {
  const response = await fetch('/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/login');
  } else {
    alert(response.statusText);
  }
};zzz

let logOutButton = document.querySelector('#logOutButton')
if (logOutButton) {
  logOutButton.addEventListener('click', logout);
} else {
  console.error('Logout button not found.');
}
