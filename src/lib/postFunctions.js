import {gettingData, editingPostDocument, deletingPostModal, updateLikes} from './firebasefunction.js';

const editAnyPost = () => {
  			//Aquí inicia editar
        const editingPost = document.querySelectorAll('.edit-post');

        editingPost.forEach((item) => {
          item.addEventListener('click', (e) => {
            const idPost = e.currentTarget.dataset.idpost;
  
            //const openModal = () => {
            const template = document.querySelector('#modal-edit');
            var clon = template.content.cloneNode(true);
            root.appendChild(clon);
  
            //que aparezca previsualizado el post anterior
            const modalContainer = document.getElementsByClassName('modal-container')[0];
            modalContainer.style.display = 'block';
  
            const closeModal = document.querySelector('.close-modal');
  
            gettingData('post', idPost).then((e) => {
              let inputModal = document.querySelector('.input-share-modal');
              inputModal.value = e.post;
              const formEditModal = document.querySelector('.form-edit-modal');
  
              formEditModal.addEventListener('submit', (e) => {
                e.preventDefault();
                let inputModal = document.querySelector('.input-share-modal').value;
                editingPostDocument(idPost, inputModal);
                modalContainer.style.display = 'none';
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

const deleteAnyPost = () => {
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
        deletingPostModal(idPost);
        modalContainer.style.display = 'none';
        root.removeChild(modalContainer);
      });
    });
  }); //Acá termina borrar
}

const likeAnyPost = (uid) =>{
    			//Acá empiezan los likes
			const likeButton = document.querySelectorAll('.likes-button');

			likeButton.forEach((item) => {
				item.addEventListener('click', (e) => {
					const idPost = e.currentTarget.dataset.idpost;

					gettingData('post', idPost).then((e) => {
						if (e.likes.includes(uid)) {
							const index = e.likes.indexOf(uid);
							

							const variable = e.likes.splice(index, 1);

							updateLikes(idPost, e.likes);
						} else {
							e.likes.push(uid);
							

							
							updateLikes(idPost, e.likes);
						}
					});
				});
			});
}

export{editAnyPost, deleteAnyPost, likeAnyPost}
