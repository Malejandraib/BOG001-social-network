export default () => {
    const template = document.querySelector('#template-timeline');
    const clon = template.content.cloneNode(true);
    root.appendChild(clon);

    const menuTimeline = document.querySelectorAll(".menu-timeline");

    const container = document.querySelector(".container-all-post");
    container.textContent = "Profile option Under construction :D, have a nice day!";

    menuTimeline.forEach(item => {
        item.addEventListener('click', () => {
        window.location.hash = 'timeline';
        });
    });
}