const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value;
    const password = document.querySelector('#password-login').value;
  
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password: password }),
        headers: { 'Content-Type': 'application/json' },
      });
      const results = await response.json();
      console.log(results);
      if (response.ok) {
        //document.location.replace('/dashboard');
      }
    }
  };
  
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);