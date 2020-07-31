///aqui

export const router = async (route) =>{
    let content = document.getElementById("root");
    content.innerHTML = "";
    console.log(route);

    switch(route) {
        case "#/":
          //la idea es poner aquí la función que nos pinte el html final
            return content.innerHTML = "si estamos acá xd signup";
        case "#/SignIn":
            return content.innerHTML = "si estamos acá xd signout";
        case '/':
            return content.innerHTML = "home";
        case '':
            return content.innerHTML = "vacia";
        default:
          // code block
    }
}

