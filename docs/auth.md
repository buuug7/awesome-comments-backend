# Authentication


## authentication with JWT

```javascript
// a example with fetch
fetch('http://localhost:3000',
  {
    method: 'GET',
    // credentials: 'include',
    // mode: 'no-cors',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV...'
       }
  })
  .then(res => res.json())
  .then(json => console.log(json));
```