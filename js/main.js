const begin = () => {
  const $tbody = $('tbody');
  const $formSearch = $('#form_search');
  const $formCreate = $('#form_create');
  const $searchTheme = $('#search_theme');
  const $btnTheme = $('#create');

  // init modal
  $('.modal').modal();

  const Theme = ((window, document) => {
    const newTheme = () => {
      $('#modal1').modal('open');
    };

    const paintTheme = ({ theme, isNew = false }) => {
      const infoThemes = `
        <tr>
          <td id="titleTheme">${theme.content}</td>
          <td>${theme.author_name}</td>
          <td>${isNew ? 0 : theme.responses_count}</td>
          <td><a href="../views/verTopic.html?topic_id=${theme.id}"><i class="material-icons">search</i></a></td>
        </tr>`;
      return infoThemes;
    };

    const viewTopics = response => {
      $tbody.empty();
      response.reverse().forEach(data => $tbody.prepend(paintTheme({ theme: data })));
    };

    const loadThemes = () => {
      $.getJSON('https://examen-laboratoria-sprint-5.herokuapp.com/topics/', viewTopics);
    };

    const successCallback = response => {
      const options = {
        theme: response,
        isNew: true
      };
      $tbody.prepend(paintTheme(options));
    };

    const createTheme = event => {
      event.preventDefault();

      const theme = $('#input_theme').val();
      const author = $('#input_author').val();
      const options = {
        content: theme,
        author_name: author
      };

      $.post('https://examen-laboratoria-sprint-5.herokuapp.com/topics/', options)
        .done(successCallback);

      $('#modal1').modal('close');
    };

    $btnTheme.on('click', newTheme);
    $formCreate.on('submit', createTheme);

    return { loadThemes: loadThemes };
  })(window, document);

  // cargamos los temas
  Theme.loadThemes();
};

$(document).ready(begin);
