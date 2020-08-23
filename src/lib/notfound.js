export default () =>{
    const template = document.querySelector("#notfound");
    var clon = template.content.cloneNode(true);
    root.appendChild(clon);

    const homePage = document.querySelector(".home-page");
    console.log(homePage);

    homePage.addEventListener('click', () => {
        window.location.hash = '';
    });


}