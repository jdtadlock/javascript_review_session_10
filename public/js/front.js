$('#note-form').on('submit', (event) => {
  event.preventDefault();

  const title = $('#title').val().trim();
  const body = $('#body').val().trim();


  $.post('/api/notes', { title: title, body: body })
    .then(() => {
      $('#title, #body').val('');
    });
});

$('#btn').on('click', () => {
  $.ajax({
    method: 'GET', // Default
    url: '/api/notes'
  }).then((notes_array) => {
    for (let i = 0; i < notes_array.length; i++) {
      $('#notes').append(`
        <div class="note">
          <h3>${notes_array[i].title}</h3>
          <p>${notes_array[i].body}</p>
        </div>
      `);
    }
  });
});