const { useState } = React;

const Note = ({ text, color, onDelete }) => {
  const style = {
    backgroundColor: color,
    padding: "10px",
    margin: "5px",
    borderRadius: "5px",
  };

  return (
    <div style={style}>
      <div dangerouslySetInnerHTML={{ __html: text }} />
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

const App = () => {
  console.log("React app is working!");
  const [noteText, setNoteText] = useState("");
  const [noteColor, setNoteColor] = useState("red");
  const [notes, setNotes] = useState([]);

  const handleNoteChange = (event) => {
    setNoteText(event.target.value);
  };

  const handleColorChange = (event) => {
    setNoteColor(event.target.value);
  };

  const handleCreateNote = async (event) => {
    event.preventDefault();

    if (noteText.trim() !== "") {
      // Wikipedia API endpoint
      const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${encodeURIComponent(
        noteText
      )}&origin=*`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Check if the 'pages' property exists in the response
        if (data.query && data.query.pages) {
          // Extracting the page ID of the first result
          const pageId = Object.keys(data.query.pages)[0];

          // Check if the page exists
          if (pageId !== "-1") {
            const extract = data.query.pages[pageId].extract;

            const newNote = {
              text: `${noteText}\n\n${extract}`,
              color: noteColor,
            };

            setNotes([...notes, newNote]);
            setNoteText("");
          } else {
            alert("No information found on Wikipedia for the given input.");
          }
        } else {
          console.error("Invalid response format from Wikipedia API:", data);
          alert(
            "Error fetching data from Wikipedia API. Please try again later."
          );
        }
      } catch (error) {
        console.error("Error fetching data from Wikipedia API:", error);
        alert(
          "Error fetching data from Wikipedia API. Please try again later."
        );
      }
    }
  };

  const handleDeleteNote = (index) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };

  return (
    <div className="input_container">
      <h1>Note-Taking Application</h1>
      <form>
        <label htmlFor="note_input"></label>
        <textarea
          id="note_input"
          className="note_input"
          rows="20"
          cols="50"
          value={noteText}
          onChange={handleNoteChange}
        ></textarea>
        <br />
        <label htmlFor="red_option">Red</label>
        <input
          type="radio"
          id="red_option"
          className="color_option"
          name="color_option"
          value="red"
          checked={noteColor === "red"}
          onChange={handleColorChange}
        />
        <label htmlFor="blue_option">Blue</label>
        <input
          type="radio"
          id="blue_option"
          className="color_option"
          name="color_option"
          value="blue"
          checked={noteColor === "blue"}
          onChange={handleColorChange}
        />
        <label htmlFor="yellow_option">Yellow</label>
        <input
          type="radio"
          id="yellow_option"
          className="color_option"
          name="color_option"
          value="yellow"
          checked={noteColor === "yellow"}
          onChange={handleColorChange}
        />
        <label htmlFor="green_option">Green</label>
        <input
          type="radio"
          id="green_option"
          className="color_option"
          name="color_option"
          value="green"
          checked={noteColor === "green"}
          onChange={handleColorChange}
        />
      </form>
      <br />
      <button className="btn" onClick={handleCreateNote}>
        Create note
      </button>

      <h2>Created Notes</h2>
      <div className="output_container">
        <div className="note_container">
          {notes.map((note, index) => (
            <Note
              key={index}
              text={note.text}
              color={note.color}
              onDelete={() => handleDeleteNote(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(React.createElement(App), document.getElementById("output"));
