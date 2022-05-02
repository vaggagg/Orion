function setLoading ( show ) {
    const  selector = document.getElementById('loading-container');
    if ( show == true ) {
      selector.classList.remove('hidden');
      selector.classList.add('show')
    }
    else {
      selector.classList.remove('show');
      selector.classList.add('hidden');
    }

  }
  export default setLoading;