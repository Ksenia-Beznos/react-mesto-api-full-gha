class Api {
	constructor({ baseUrl, headers }) {
		this._baseUrl = baseUrl;
		this._headers = headers;
	}

	_checkStatusResponse(res, method) {
		return res.ok ? res.json() : Promise.reject(`Ошибка в ${method}: ${res.status}`);
	}

	getInitialCards() {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'GET',
			credentials: 'include',
			headers: this._headers,
		}).then((res) => {
			return this._checkStatusResponse(res, 'getInitialCards');
		});
	}

	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'GET',
			credentials: 'include',
			headers: this._headers,
		}).then((res) => {
			return this._checkStatusResponse(res, 'getUserInfo');
		});
	}

	setUserInfo(name, about) {
		return fetch(`${this._baseUrl}/users/me`, {
			headers: this._headers,
			method: 'PATCH',
			credentials: 'include',
			body: JSON.stringify({
				name: name,
				about: about,
			}),
		}).then((res) => {
			return this._checkStatusResponse(res, 'setUserInfo');
		});
	}

	setAvatar(avatarUrl) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			headers: this._headers,
			method: 'PATCH',
			credentials: 'include',
			body: JSON.stringify({
				avatar: avatarUrl,
			}),
		}).then((res) => {
			return this._checkStatusResponse(res, 'setAvatar');
		});
	}

	changeLikeCardStatus(id, status) {
		if (status) {
			return fetch(`${this._baseUrl}/cards/${id}/likes`, {
				method: 'DELETE',
				credentials: 'include',
				headers: this._headers,
			}).then((res) => {
				return this._checkStatusResponse(res, 'removeLike');
			});
		} else {
			return fetch(`${this._baseUrl}/cards/${id}/likes`, {
				method: 'PUT',
				credentials: 'include',
				headers: this._headers,
			}).then((res) => {
				return this._checkStatusResponse(res, 'addLike');
			});
		}
	}

	addLike(id) {
		return fetch(`${this._baseUrl}/cards/${id}/likes`, {
			method: 'PUT',
			credentials: 'include',
			headers: this._headers,
		}).then((res) => {
			return this._checkStatusResponse(res, 'addLike');
		});
	}

	removeLike(id) {
		return fetch(`${this._baseUrl}/cards/${id}/likes`, {
			method: 'DELETE',
			credentials: 'include',
			headers: this._headers,
		}).then((res) => {
			return this._checkStatusResponse(res, 'removeLike');
		});
	}

	addCard(card) {
		return fetch(`${this._baseUrl}/cards`, {
			headers: this._headers,
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(card),
		}).then((res) => {
			return this._checkStatusResponse(res, 'setUserInfo');
		});
	}

	removeCard(id) {
		return fetch(`${this._baseUrl}/cards/${id}`, {
			method: 'DELETE',
			credentials: 'include',
			headers: this._headers,
		}).then((res) => {
			return this._checkStatusResponse(res, 'removeLike');
		});
	}
}

export const api = new Api({
	baseUrl: 'https://api.mesto-yandex.nomoredomains.rocks',
	headers: {
		'Content-Type': 'application/json',
	},
});
