


export default () =>{


    const container = document.createElement('div');
    container.textContent = 'Ya entra a la función';

    const boton = document.createElement('Button');
    boton.textContent = 'ir a Sign In';
    container.appendChild(boton);

    const cosito = document.createElement('div');
    cosito.innerHTML='<object type="text/html" data="/views/signup.html"></object>';
    container.appendChild(cosito);

    console.log(window.location.hash);

    boton.addEventListener('click', function(){
        window.location.hash = 'timeline';
    } );
    
    return container;

}