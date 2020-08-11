export default () =>{
    const template = document.querySelector('#template-timeline');
    const clon = template.content.cloneNode(true);
    root.appendChild(clon);
}