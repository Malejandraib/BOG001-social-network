import { gettingData, editingEventDocument, deletingEventModal, updateLikesEvents } from './firebasefunction.js';

const editAnyEvent = () => {
    //Aquí inicia editar
    const editingPost = document.querySelectorAll('.edit-post');

    editingPost.forEach((item) => {
        item.addEventListener('click', (e) => {
            const idPost = e.currentTarget.dataset.idpost;

            //const openModal = () => {
            const template = document.querySelector('#modal-edit-event');
            var clon = template.content.cloneNode(true);
            root.appendChild(clon);

            //que aparezca previsualizado el post anterior
            const modalContainer = document.getElementsByClassName('modal-container')[0];
            modalContainer.style.display = 'block';

            const closeModal = document.querySelector('.close-modal');

            gettingData('events', idPost).then((e) => {
                let inputEvent = document.querySelector('.input-event-modal');
                let inputDate = document.querySelector('.input-date-modal');
                let inputPlace = document.querySelector('.input-place-modal');
                let inputHour = document.querySelector('.input-hour-modal');
                let inputCity = document.querySelector('.input-city-modal');


                inputEvent.value = e.event;
                inputDate.value = e.date;
                inputPlace.value = e.place;
                inputHour.value = e.hour;
                inputCity.value = e.city;

                const formEditModal = document.querySelector('.form-events-modal');
                formEditModal.addEventListener('submit', (e) => {
                    e.preventDefault();
                    let inputEvent = document.querySelector('.input-event-modal').value;
                    let inputDate = document.querySelector('.input-date-modal').value;
                    let inputPlace = document.querySelector('.input-place-modal').value;
                    let inputHour = document.querySelector('.input-hour-modal').value;
                    let inputCity = document.querySelector('.input-city-modal').value;

                    editingEventDocument(idPost, inputEvent, inputCity, inputDate, inputPlace, inputHour);
                    root.removeChild(modalContainer);
                });
            });

            closeModal.addEventListener('click', () => {
                modalContainer.style.display = 'none';
                root.removeChild(modalContainer);
            });

            modalContainer.addEventListener('click', () => {
                if (event.target == modalContainer) {
                    modalContainer.style.display = 'none';
                    root.removeChild(modalContainer);
                }
            });
        });
    }); //Acá finaliza editar
}

const deleteAnyEvent = () => {
    const deletePost = document.querySelectorAll('.delete-post');

    deletePost.forEach((item) => {
        item.addEventListener('click', (e) => {
            const idPost = e.currentTarget.dataset.idpost;

            const template = document.querySelector('#modal-delete');
            var clon = template.content.cloneNode(true);
            root.appendChild(clon);

            const modalContainer = document.getElementsByClassName('modal-container-delete')[0];
            modalContainer.style.display = 'block';

            const closeModal = document.querySelector('.close-modal');

            closeModal.addEventListener('click', () => {
                root.removeChild(modalContainer);
                modalContainer.style.display = 'none';
            });

            modalContainer.addEventListener('click', () => {
                if (event.target == modalContainer) {
                    modalContainer.style.display = 'none';
                    root.removeChild(modalContainer);
                }
            });

            const btnDelete = document.querySelector('.btn-delete');
            btnDelete.addEventListener('click', () => {
                deletingEventModal(idPost);
                modalContainer.style.display = 'none';
                root.removeChild(modalContainer);
            });
        });
    }); //Acá termina borrar
}

const likeAnyEvent = (uid) => {
    //Acá empiezan los likes
    const likeButton = document.querySelectorAll('.likes-button');

    likeButton.forEach((item) => {
        item.addEventListener('click', (e) => {
            const idPost = e.currentTarget.dataset.idpost;

            gettingData('events', idPost).then((e) => {
                if (e.likes.includes(uid)) {
                    const index = e.likes.indexOf(uid);

                    const variable = e.likes.splice(index, 1);
                    updateLikesEvents(idPost, e.likes);
                } else {
                    e.likes.push(uid);
                    updateLikesEvents(idPost, e.likes);
                }
            });
        });
    });
}

export { editAnyEvent, deleteAnyEvent, likeAnyEvent }
