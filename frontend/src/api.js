class Api {
  constructor(url, headers) {
    this._url = url;
    this._headers = headers;
  }

  checkResponse (response) {
    if (response.status == 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(new Error(response.statusText))
    }
  }

  getReestrCoordinates (reestr) {
    return fetch(
      this._url + `/api/v1/reestr/${reestr}`,
      {
        headers: this._headers
      }
    )
    .then(this.checkResponse)
    .then(response => {
      return response.json()
    })
  }
}

export default new Api(
  process.env.API_URL || 'http://localhost:8000',
  {
    'content_type': 'application/json',
  }
)
