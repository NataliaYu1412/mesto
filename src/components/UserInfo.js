export default class UserInfo {
    constructor({name, status}) {
        this._name = name;
        this._status = status;
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            status: this._status.textContent
        }
    }

    setUserInfo(formData) {
        this._name.textContent = formData.name
        this._status.textContent = formData.status
    }

}