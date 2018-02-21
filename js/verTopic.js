const begin = () => {
  let topicId = getParameterByName('topic_id');

  // Solo por propositos de debug
  if (topicId) console.log(`El topic ID es: ${topicId}`);

  // init modal
  $('.modal').modal();

  const Theme = ((window, document) => {
    const $btnResponse = $('#btnResponse');
    const $containerMessages = $('#container-messages');
    const $formComment = $('#form_comment');
    const url = {
      publication: `https://examen-laboratoria-sprint-5.herokuapp.com/topics/${topicId}`,
      answers: `https://examen-laboratoria-sprint-5.herokuapp.com/topics/${topicId}/responses`
    };

    const paintTheme = data => {
      $('#message-theme').html(data.content);
      $('#author-theme').html(data.author_name);
      $('#publication-day').html(data.created_at);
    };

    const load = () => {
      $.getJSON(url.publication, paintTheme);
    };

    const paintResponse = response => {
      const infoMessage = `
      <li class="collection-item dismissable">
        <div>${response.content}
          <a href="#!" class="secondary-content">
            <span class="new badge">${response.author_name}</span>
          </a>
        </div>
      </li>`;

      $containerMessages.prepend(infoMessage);
    };

    const getAnswers = response => {
      // se vacia el contenedor
      $containerMessages.empty();
      if (!response.error) response.forEach(paintResponse);
    };

    // cargando las respuestas
    const answers = () => {
      $.getJSON(url.answers)
        .done(getAnswers);
    };

    const newComment = () => {
      $('#modal1').modal('open');
    };

    const createComment = event => {
      event.preventDefault();

      const authorComment = $('#input_comment').val();
      const comment = $('#input_author').val();
      const options = {
        content: comment,
        author_name: authorComment
      };

      $.post(url.answers, options)
        .done(paintResponse);

      $('#modal1').modal('close');
    };

    $btnResponse.on('click', newComment);
    $formComment.on('submit', createComment);

    return {
      load: load,
      answers: answers
    };
  })(window, document);

  Theme.load();
  Theme.answers();
};

$(document).ready(begin);
