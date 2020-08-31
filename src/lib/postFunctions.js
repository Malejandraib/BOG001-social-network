

const editPost = () => {
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
        console.log(e.post);
        inputModal.value = e.post;
        const formEditModal = document.querySelector('.form-edit-modal');

        formEditModal.addEventListener('submit', (e) => {
          e.preventDefault();
          let inputModal = document.querySelector('.input-share-modal').value;
          editingPostDocument(idPost, inputModal);
          modalContainer.style.display = 'none';
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

const deletePost = () => {

}

const likePost = () => {

}