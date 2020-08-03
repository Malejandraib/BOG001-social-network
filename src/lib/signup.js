
export default () =>{
    const containerForm = document.createElement('div');
    containerForm.textContent = 'Ya entra a la función';

    const templateSignup = document.getElementById('template-signup');
    console.log(templateSignup)
/*     const content = templateSignup.content
    console.log(content)  */

/*  const clon = templateSignup.content.cloneNode(true);
    containerForm.appendChild(clon);  */

    const boton = document.createElement('Button');
    boton.textContent = 'ir a Sign In';
    containerForm.appendChild(boton); 

/*     const cosito = document.createElement('div');
    cosito.innerHTML='<object type="text/html" data="/views/signup.html"></object>';
    containerForm .appendChild(cosito); */

    console.log(window.location.hash);

/*    let pasarSignin= document.querySelector('.signin-view');
    pasarSignin.addEventListener('click', function(){
        window.location.hash = 'signin';
    }) */

    boton.addEventListener('click', function(){
        window.location.hash = 'signin';
    } );
    
    return containerForm;

}