//array of images
let freshImages = [
    "https://i.pinimg.com/736x/ef/3c/f4/ef3cf448ef8b5794ce94c1326b4db4c0.jpg",
    "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2019%2F03%2Ffreshprince-2000.jpg&q=60",
    "https://i.ytimg.com/vi/AVbQo3IOC_A/hqdefault.jpg"
];

//reverse through array of images
//getting random image from the array we created before (we use math.floor and math.random to grab a random index in the array)
const imgs = document.getElementsByTagName("img");
for(let i = 0; i < imgs.length; i++) {
    const randomImg = Math.floor(Math.random() * freshImages.length)
    imgs[i].src = freshImages[randomImg]
}
//do the same for h1 elements
const headers1 = document.getElementsByTagName("h1");
for (let i = 0; i < headers1.length; i++){
    headers1[i].innerText = "The Fresh Prince";
}

const headers2 = document.getElementsByTagName("h2");
for (let i = 0; i < headers2.length; i++){
    headers2[i].innerText = "of Bel-Air";
}

const headers3 = document.getElementsByTagName("h3");
for (let i = 0; i < headers3.length; i++){
    headers3[i].innerText = "my mum got scared";
}

const headers4 = document.getElementsByTagName("h4");
for (let i = 0; i < headers4.length; i++){
    headers4[i].innerText = "you're off to go live with your auntie";
}

const li = document.getElementsByTagName("li");
for (let i = 0; i < li.length; i++){
    li[i].innerText = "of Bel-Air";
}

//do the same for p elements
const p = document.getElementsByTagName("p");
for (let i = 0; i < p.length; i++){
    p[i].innerText = "Now, this is a story all about how" +
        "My life got flipped-turned upside down" +
        "And I'd like to take a minute" +
        "Just sit right there" +
        "I'll tell you how I became the prince of a town called Bel-Air" +
        "In West Philadelphia born and raised" +
        "On the playground was where I spent most of my days" +
        "Chillin' out, maxin', relaxin', all cool" +
        "And all shootin' some b-ball outside of the school" +
        "When a couple of guys who were up to no good" +
        "Started making trouble in my neighborhood" +
        "I got in one little fight and my mom got scared" +
        "She said, \"You're movin' with your auntie and uncle in Bel-Air\"" +
        "I begged and pleaded with her day after day" +
        "But she packed my suitcase and sent me on my way" +
        "She gave me a kiss and then she gave me my ticket" +
        "I put my Walkman on and said, \"I might as well kick it\"" +
        "First class, yo this is bad" +
        "Drinking orange juice out of a champagne glass" +
        "Is this what the people of Bel-Air living like?" +
        "Hmm, this might be alright" +
        "But wait, I hear they're prissy, bourgeois, all that" +
        "Is this the type of place that they just send this cool cat?" +
        "I don't think so" +
        "I'll see when I get there" +
        "I hope they're prepared for the prince of Bel-Air" +
        "Well, the plane landed and when I came out" +
        "There was a dude who looked like a cop standing there with my name out" +
        "I ain't trying to get arrested yet, I just got here" +
        "I sprang with the quickness like lightning, disappeared" +
        "I whistled for a cab and when it came near" +
        "The license plate said, \"Fresh\" and it had dice in the mirror" +
        "If anything I could say that this cab was rare" +
        "But I thought \"Nah, forget it, yo, holmes to Bel Air\"" +
        "I pulled up to the house about seven or eight" +
        "And I yelled to the cabbie, \"Yo holmes, smell ya later\"" +
        "I looked at my kingdom" +
        "I was finally there" +
        "To sit on my throne as the prince of Bel-Air";
}


const b = document.getElementsByTagName("button");
const iframe = document.createElement("iframe");
iframe.src="https://www.youtube.com/embed/1nCqRmx3Dnw?si=jv6m_7gEooidbUqV";
for (let i = 0; i < b.length; i++){
    b[i].innerHTML = "Thats hawt"
    b[i].appendChild(iframe);
}

//do the same for a elements
const a = document.getElementsByTagName("a");
for (let i = 0; i < a.length; i++){
    a[i].src = "https://www.youtube.com/embed/1nCqRmx3Dnw?si=jv6m_7gEooidbUqV";
    a[i].innerHTML = "Shooting some b-ball";
}
