const { useState } = React;

const Note = ({ text, color, onDelete, onNoteChange }) => {
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
  const [noteText, setNoteText] = useState("");
  const [noteColor, setNoteColor] = useState("red");
  const [notes, setNotes] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleNoteChange = (index, updatedContent) => {
    if (index >= 0 && index < notes.length) {
      const updatedNotes = [...notes];
      if (updatedNotes[index]) {
        updatedNotes[index].text = updatedContent;
        setNotes(updatedNotes);
      } else {
        console.error(`Note at index ${index} is undefined.`);
      }
    } else {
      console.error(`Invalid index: ${index}`);
    }
  };

  const handleNoteSearch = () => {
    const isValidPalindrome = (word) => {
      const cleanedStr = word.toLowerCase().replace(/[^a-z]/g, "");
      return (
        cleanedStr.length >= 3 &&
        cleanedStr === cleanedStr.split("").reverse().join("")
      );
    };

    const foundPalindromes = notes.reduce((accumulator, note) => {
      const words = stripHTML(note.text)
        .split(/\s+/)
        .filter((word) => word.trim() !== "");

      const palindromesInNote = words.filter((word) => isValidPalindrome(word));

      if (palindromesInNote.length > 0) {
        accumulator = [...accumulator, ...palindromesInNote];
      }

      return accumulator;
    }, []);

    if (foundPalindromes.length > 0) {
      const uniquePalindromes = [...new Set(foundPalindromes)];
      alert(
        `Found ${
          uniquePalindromes.length
        } unique valid palindromes:\n${uniquePalindromes.join(", ")}`
      );
    } else {
      alert("No valid palindromes found in notes.");
    }
  };

  const stripHTML = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };

  const handleColorChange = (event) => {
    setNoteColor(event.target.value);
  };

  const handleCreateNote = async (event) => {
    event.preventDefault();

    if (noteText.trim() !== "") {
      const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${encodeURIComponent(
        noteText
      )}&origin=*`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.query && data.query.pages) {
          const pageId = Object.keys(data.query.pages)[0];

          if (pageId !== "-1") {
            const extract = data.query.pages[pageId].extract;

            const newNote = {
              text: `${noteText}\n\n${extract}`,
              color: noteColor,
            };

            if (editingIndex !== null) {
              const updatedNotes = [...notes];
              updatedNotes[editingIndex] = newNote;
              setNotes(updatedNotes);
              setEditingIndex(null);
            } else {
              setNotes([...notes, newNote]);
            }

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
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  return (
    <div className="input_container">
      <h1>Palindrome Finder</h1>
      <h4>
        This application searches wikipedia articles for all their palindromes.
      </h4>
      <br></br>
      <h4>Enter the name of an article below to begin.</h4>
      <form>
        <label htmlFor="note_input"></label>
        <textarea
          id="note_input"
          className="note_input"
          rows="20"
          cols="50"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
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
      <button className="btn" onClick={handleNoteSearch}>
        Search for Valid Palindromes
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
              onNoteChange={(updatedContent) =>
                handleNoteChange(index, updatedContent)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(React.createElement(App), document.getElementById("output"));
