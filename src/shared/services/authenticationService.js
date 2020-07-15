const authenticationService = {
    getCurrentUser, login, logout
}

function getCurrentUser() {
    return {
        username: "davidliao",
        firstName: "David",
        lastName: "Liao",
        email: "hi@davidliao.ca",
        address: "123 Walden Drive, Kanata, ON, CAN",
        picture: "https://avatars3.githubusercontent.com/u/34524631?s=460&v=4",
    }
}

function login() {
    // TODO
}

function logout() {
    // TODO
}


export default authenticationService;