const APIHandler = new charactersAPIHandler;

window.addEventListener('load', () => {

  characterDiv = (name, occupation, cartoon, weapon) => `

    <div class="character-info">
      <div class="name">Character Name: <span> ${name} </span> </div>
      <div class="occupation">Character Occupation: <span> ${occupation} </span> </div>
      <div class="cartoon">Is a Cartoon?: <span> ${cartoon} </span> </div>
      <div class="weapon">Character Weapon: <span> ${weapon} </span> </div>
    </div>`

  updateValue = (id, newValue) => {
    document.querySelector(id).value = `${newValue}`
  }  

  characterForm = (id, name, occupation, cartoon, weapon) => `

    <div class="field">
      <label for="id">ID: </label>
      <input type="text" name="chr-id" id="edit-id" value="${id}">
    </div>

    <div class="field">
      <label for="name">Name: </label>
      <input type="text" name="name" value="${name}">
    </div>

    <div class="field">
      <label for="occupation">Occupation: </label>
      <input type="text" name="occupation" value="${occupation}">
    </div>

    <div class="field">
      <label for="weapon">Weapon: </label>
      <input type="text" name="weapon" value="${weapon}">
    </div>

    <div class="field">
      <label for="cartoon">Is a Cartoon:</label>
      <input name="cartoon" type="checkbox" id="editCheckBox">
    </div>

    <button id="send-data">Update</button>
  `

  document.getElementById('fetch-all').addEventListener('click', function (event) {

    APIHandler
      .getFullList()
      .then( (response) => {
        let text = ""

        response.data.forEach((elm) => text += characterDiv(elm.name, elm.occupation, elm.cartoon, elm.weapon))
        document.querySelector(".characters-container").innerHTML = text
      })
      .catch(err => console.log(err))

  });



  document.getElementById('fetch-one').addEventListener('click', function (event) {

    const id = document.querySelector("#getCharacterIdShow").value

    APIHandler
      .getOneRegister(id)
      .then( (response) => {

        let text = ""
        const character = response.data
        text += characterDiv(character.name, character.occupation, character.cartoon, character.weapon)
        document.querySelector(".characters-container").innerHTML = text
        document.querySelector("#getCharacterIdShow").value = ""
      })
      .catch(err => console.log(err))

  });

  document.getElementById('delete-one').addEventListener('click', function (event) {

    const id = document.querySelector("#getCharacterIdDel").value

    const delButton = document.querySelector("#delete-one")

    APIHandler 
      .deleteOneRegister(id)
      .then( (response) => {
        console.log(response)
        response.data !== null ? delButton.classList.add("active") : delButton.classList.add("inactive")
        document.querySelector("#getCharacterIdDel").value = ""
      })
      .catch(err => console.log(err))

  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {

      event.preventDefault()

      const inputs = document.querySelectorAll("#new-character-form input")
      const character = {
        name: inputs[0].value,
        occupation: inputs[1].value,
        weapon: inputs[2].value,
        cartoon: inputs[3].checked,
      }

      console.log(inputs)

      APIHandler
        .createOneRegister(character)
        .then((response)=> {

          response.data !== null ? delButton.classList.add("active") : delButton.classList.add("inactive")

          let text = ""
          const newCharacter = response.data

          text += characterDiv(newCharacter.name, newCharacter.occupation, newCharacter.cartoon, newCharacter.weapon)
          document.querySelector(".characters-container").innerHTML = text
          
          document.querySelector("#new-character-form").reset()
        })

    }
    
  );

  //document.getElementById('edit-character-form').addEventListener('submit', function (event) {

  //  event.preventDefault()

    document.querySelector("#edit-id").onkeyup = () => {
      const id = document.querySelector("#edit-id").value

      APIHandler
      .getOneRegister(id)
      .then( (response) => {

        let text = ""
        
        if (response.data !== null) {
          
          const {id, name, occupation, cartoon, weapon} = response.data
          const checkbox = document.querySelector("#editCheckBox")

          updateValue("#edit-name", name)
          updateValue("#edit-occupation", occupation)
          updateValue("#edit-weapon", weapon)
          
          response.data.cartoon ? checkbox.checked = true : checkbox.checked = false

        }

        //document.querySelector("#edit-character-form") = ""
      })
      //.catch(err => console.log(err))
    }

  //});



});
