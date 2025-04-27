export function saveToken(token){
    sessionStorage.setItem("token", token);
}

export function getToken(){
    sessionStorage.getItem('token');
}

export function removeToken(){
    sessionStorage.removeItem('token');
}