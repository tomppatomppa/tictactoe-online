class LocalStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace
  }

  getKey(key) {
    return `${this.namespace}:${key}`
  }

  getAccessToken() {
    return localStorage.getItem(this.getKey('accessToken'))
  }

  setAccessToken(accessToken) {
    return localStorage.setItem(this.getKey('accessToken'), accessToken)
  }

  removeAccessToken() {
    return localStorage.removeItem(this.getKey('accessToken'))
  }
}

export default LocalStorage
