export default () =>{
    const container = document.createElement('div');
    container.textContent = 'Ya estamos en signin';

    const boton = document.createElement('Button');
    boton.textContent = 'ir a Sign up';
    container.appendChild(boton);

    const cosito = document.createElement('div');
    cosito.innerHTML='<object type="text/html" data="/views/signin.html"></object>';
    container.appendChild(cosito);

    console.log(window.location.hash);

    boton.addEventListener('click', function(){
        window.location.hash = '';
    } );
    
    return container;

}