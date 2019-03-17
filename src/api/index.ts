export default {
  getUsers() {
    return fetch('http://localhost:3000/user').then(res => res.json())
  },
  addUser(data: Object) {
    return fetch('http://localhost:3000/user', {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(res => res.json())
  },
  editUser(data: Object) {
    return fetch('http://localhost:3000/user', {
      method: 'PUT',
      body: JSON.stringify(data)
    }).then(res => res.json())
  },
  removeUser(id: number) {
    return fetch('http://localhost:3000/user', {
      method: 'DELETE',
      body: JSON.stringify({
        id: id
      })
    }).then(res => res.json())
  }
}