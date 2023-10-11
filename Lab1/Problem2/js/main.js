document.querySelector(".btn").addEventListener("click", ()=>{
  let note = document.createElement("p");
  let img = document.createElement("img");
  let color = document.querySelector('input[name="color_option"]:checked').value;
  note.innerHTML = document.querySelector(".note_input").value;
  note.setAttribute("contenteditable", "true");

  if(color === "red"){
    note.classList.add('red_note')
  }
  else if(color === "blue"){
    note.classList.add('blue_note')
  }
  else if(color === "yellow"){
    note.classList.add('yellow_note')
  }
  else if(color === "green"){
    note.classList.add('green_note')
  }

  img.src = "img/delete.png";
  img.classList.add('image');
  document.querySelector(".output_container").appendChild(note).appendChild(img);
})

document.querySelector(".output_container").addEventListener("click", function(e){
  if(e.target.tagName === "IMG"){
    e.target.parentElement.remove();
  }
})
