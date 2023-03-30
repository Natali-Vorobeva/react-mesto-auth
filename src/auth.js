export const BASE_URL = 'https://auth.nomoreparties.co';

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

export const register = (email, password) => {
	return fetch(`${BASE_URL}/signup`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email, password
		})
	})
		.then(res => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Ошибка: ${res.status}`);
		})
};

export const authorize = (email, password) => {
	return fetch(`${BASE_URL}/signin`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email, password
		})
	})	
	
	.then(checkResponse)

	// .then((res => {
	// 	return res.json()
	// }))
	// .then((res) => {
	// 	console.log(res);
	// 	if (res.token) {
	// 		localStorage.setItem('token', res.token);
	// 		console.log(res.token);
	// 		return res;
	// 	} else {
	// 		return;
	// 	}
	// })
	// .catch(err => console.log(err))
};

export const checkToken = (token) => {
	return fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		}
	})
	// .then(res => {
  //   if (res.ok) {
  //     return res.json();
  //   }
  //   return Promise.reject(`Ошибка: ${res.status}`);
  // })
	.then(checkResponse)
}


