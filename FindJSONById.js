// find a json object by id using nodejs/js
// There are a few approaches, both of these should roughly achieve what you're looking for:

let users = {
  'users': {
    'user1': {
      'id': '1',
      'name': 'Brandon',
      'DOB': '05/04/2000'
    },
    'user2': {
      'id': '2',
      'name': 'Jefferson',
      'DOB': '05/19/2004'
    }
  }
}

const findUserById = (id) => {
  const key = Object.keys(users.users).find(user => users.users[user].id === '1')
  return users.users[key]
}

console.log(findUserById('1'))




// OR _____________________

let users = {
    'users': {
      'user1': {
        'id': '1',
        'name': 'Brandon',
        'DOB': '05/04/2000'
      },
      'user2': {
        'id': '2',
        'name': 'Jefferson',
        'DOB': '05/19/2004'
      }
    }
  }
  
  const findUserById = (id) => {
    const [key, user] = Object.entries(users.users).find(([key, user]) => user.id === '1');
    return user;
  }
  
  console.log(findUserById('1'))