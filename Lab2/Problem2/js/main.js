function createTable(data, containerId) {
      const container = document.getElementById(containerId);
      const table = document.createElement("table");
      container.appendChild(table);

      // Create table headers
      const headers = Object.keys(data[0]);
      const headerRow = table.insertRow(0);
      headers.forEach(headerText => {
        const header = document.createElement("th");
        header.textContent = headerText;
        headerRow.appendChild(header);
      });

      // Populate the table with data
      data.forEach(item => {
        const row = table.insertRow();
        headers.forEach(header => {
          const cell = row.insertCell();
          cell.textContent = item[header];
        });
      });
    }

    // Fetch posts from JSONPlaceholder API
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(posts => {
        // Filter posts with more than six words in the title
        const longTitles = posts.filter(post => post.title.split(' ').length > 6);

        // Display post titles in an HTML table
        createTable(longTitles, 'post-titles');
      })
      .catch(error => console.error('Error fetching data:', error));

    // Fetch posts from JSONPlaceholder API
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(posts => {
        // Extract and concatenate all post bodies into a single string
        const allBodies = posts.map(post => post.body).join(' ');

        // Tokenize the text by splitting it into words and removing non-alphanumeric characters
        const words = allBodies.split(/\s+/).map(word => word.replace(/\W/g, '').toLowerCase());

        // Calculate word frequencies using reduce
        const wordFrequencyMap = words.reduce((map, word) => {
          map[word] = (map[word] || 0) + 1;
          return map;
        }, {});

        // Convert word frequency map to an array of objects
        const wordFrequencyArray = Object.entries(wordFrequencyMap).map(([word, count]) => ({ word, count }));

        // Display word frequency data in an HTML table
        createTable(wordFrequencyArray, 'word-frequency');
      })
      .catch(error => console.error('Error fetching data:', error));
