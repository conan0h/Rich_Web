fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(posts => {
    const longTitles = posts.filter(post => post.title.split(' ').length > 6);
    console.log("Fetched Posts with More than Six Words in Title:", longTitles);
  })
  .catch(error => console.error('Error fetching data:', error));

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(posts => {
    const allBodies = posts.map(post => post.body).join(' ');
    const words = allBodies.split(/\s+/).map(word => word.replace(/\W/g, '').toLowerCase());
    const wordFrequencyMap = words.reduce((map, word) => {
      map[word] = (map[word] || 0) + 1;
      return map;
    }, {});

    const wordFrequencyArray = Object.entries(wordFrequencyMap).map(([word, count]) => ({ word, count }));
    console.log("Word Frequency Map for Post Bodies:", wordFrequencyMap);
  })
  .catch(error => console.error('Error fetching data:', error));
