document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.querySelector(".btn");
  const noteInput = document.querySelector(".note_input");
  const colorOptions = document.querySelectorAll('.color_option');
  const outputContainer = document.querySelector(".output_container");

  const createNote = (text, color) => {
    const note = document.createElement("p");
    const img = document.createElement("img");

    note.innerHTML = text;
    note.setAttribute("contenteditable", "true");
    note.classList.add(`${color}_note`);

    img.src = "img/delete.png";
    img.classList.add('image');

    note.appendChild(img);

    return note;
  };

  const addButtonClick$ = rxjs.fromEvent(addButton, 'click');

  const colorOptionClick$ = rxjs.merge(
    ...Array.from(colorOptions).map(option =>
      rxjs.fromEvent(option, 'click').pipe(
        rxjs.operators.map(() => option.value)
      )
    )
  );

  colorOptionClick$.subscribe(() => {
  });

  addButtonClick$.subscribe(() => {
    const selectedColor = document.querySelector('input[name="color_option"]:checked').value;
    const noteText = noteInput.value;

    if (noteText) {
      const newNote = createNote(noteText, selectedColor);
      outputContainer.appendChild(newNote);
      noteInput.value = '';
    }
  });

  rxjs.fromEvent(outputContainer, 'click')
    .pipe(
      rxjs.operators.filter(event => event.target.tagName === 'IMG'),
      rxjs.operators.map(event => event.target.parentElement)
    )
    .subscribe(note => {
      note.remove();
    });
});
