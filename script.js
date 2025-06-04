/* ==========fetch profile on github using it link=============== */
function fetchUsers(query) {
    const profileDiv = document.getElementById('profile');
    profileDiv.innerHTML = '';
  
    fetch(`https://api.github.com/search/users?q=${query}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        return response.json();
      })
      .then(data => {
        if (data && data.items) {
          data.items.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.innerHTML = `
              <img src="${user.avatar_url}" width="50" />
              <h3>${user.login}</h3>
              <a href="${user.html_url}" target="_blank">View GitHub Profile</a>
            `;
            profileDiv.appendChild(userDiv);
  
            userDiv.addEventListener('click', () => {
              fetchUserDetails(user.login);
            });
          });
        } else {
          profileDiv.innerHTML = '<p>No users found.</p>';
        }
      })
      .catch(error => {
        profileDiv.innerHTML = `<p style="color:red">${error.message}</p>`;
      });
  }
  
  // Fetch user details
  function fetchUserDetails(username) {
    const profileDiv = document.getElementById('profile');
    profileDiv.innerHTML = '';
  
    fetch(`https://api.github.com/users/${username}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('User not found');
        }
        return response.json();
      })
      .then(data => {
        profileDiv.innerHTML = `
          <img src="${data.avatar_url}" width="100" />
          <h2>${data.name || data.login}</h2>
          <p>Bio: ${data.bio}</p>
          <p>Location: ${data.location}</p>
          <a href="${data.html_url}" target="_blank">View GitHub Profile</a>
        `;
      })
      .catch(error => {
        profileDiv.innerHTML = `<p style="color:red">${error.message}</p>`;
      });
  }
  
  document.getElementById('searchBtn').addEventListener('click', () => {
    const query = document.getElementById('username').value;
    fetchUsers(query);
  });
  /* =====fetch user input===== */
  fetchUsers('git');
  