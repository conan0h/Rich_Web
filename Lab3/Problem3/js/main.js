class Note {
      constructor(id, content, parent = null) {
        this.id = id;
        this.content = content;
        this.parent = parent;
      }
    }

    const notes = [
      new Note(1, 'Parent'),
      new Note(2, 'Parent'),
      new Note(3, 'Child', 1),
      new Note(4, 'Child', 1),
      new Note(5, 'Child', 2),
    ];

    const noteSubject = new rxjs.Subject();

    function deleteNote(note) {
      noteSubject.next({ action: 'delete', note });

      if (note.parent === null) {
        const children = notes.filter(child => child.parent === note.id);
        children.forEach(child => deleteNote(child));
      }
    }

    const subscription = noteSubject.subscribe(({ action, note }) => {
      if (action === 'delete') {
        const index = notes.findIndex(n => n.id === note.id);
        if (index !== -1) {
          notes.splice(index, 1);
          console.log(`Note ${note.id} deleted`);
          displayNotes();
        }
      }
    });

    function displayNotes() {
      const appDiv = document.getElementById('app');
      appDiv.innerHTML = '';

      const parentChildMap = new Map();

      notes.forEach(note => {
        if (note.parent !== null) {
          const parent = notes.find(n => n.id === note.parent);
          if (parent) {
            if (!parentChildMap.has(parent)) {
              parentChildMap.set(parent, []);
            }
            parentChildMap.get(parent).push(note);
          }
        }
      });

      notes.forEach(note => {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');
        const noteName = document.createElement("h4");
        noteName.textContent = `Note ${note.id}: ${note.content}`;
        noteDiv.appendChild(noteName);

        if (parentChildMap.has(note)) {
          const childrenList = document.createElement('p');
          childrenList.textContent = `This note is the parent to:`;
          childrenList.classList.add('children');
          parentChildMap.get(note).forEach(child => {
            const childItem = document.createElement('p');
            childItem.textContent = `Note ${child.id}`;
            childrenList.appendChild(childItem);
          });
          noteDiv.appendChild(childrenList);
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteNoteClicked(note));

        noteDiv.appendChild(deleteButton);
        appDiv.appendChild(noteDiv);
      });
    }

    function deleteNoteClicked(note) {
      deleteNote(note);
    }

    displayNotes();
