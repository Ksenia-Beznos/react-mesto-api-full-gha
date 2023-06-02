export const BASE_URL = 'https://api.mesto-yandex.nomoredomains.rocks';

export function register(email, password) {
	return fetch(`${BASE_URL}/signup`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	}).then(getResponse);
}

export function login(email, password) {
	return fetch(`${BASE_URL}/signin`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	}).then(getResponse);
}

export const loginWithToken = () => {
	return fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	}).then(getResponse);
};

export const logout = () => {
	return fetch(`${BASE_URL}/signout`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	}).then(getResponse);
};

const getResponse = (res) => {
	if (!res.ok) {
		return Promise.reject(`Ошибка : ${res.status}`);
	}
	return res.json();
};
