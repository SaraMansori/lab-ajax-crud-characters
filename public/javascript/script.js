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

  resetBtn = (response, button) => {
 
    response.data !== null ? button.classList.add("active") : button.classList.add("inactive")

    setTimeout(() => {
      button.classList.remove("active", "inactive")
    }, 300)
  }

  const printCharacters = (response) => {

    let text = ""
    const character = response.data

    character.forEach((elm) => text += characterDiv(elm.name, elm.occupation, elm.cartoon, elm.weapon))
    document.querySelector(".characters-container").innerHTML = text
  }

  const printCharacter = (response) => {

    console.log(response)

    let text = ""
    const character = response.data

    text += characterDiv(character.name, character.occupation, character.cartoon, character.weapon)
    document.querySelector(".characters-container").innerHTML = text

  }
  
  document.getElementById('fetch-all').addEventListener('click', function (event) {

    APIHandler
      .getFullList()
      .then( response => printCharacters(response) )
      .catch(err => console.log(err))

  });


  //FETCH ONE CHARACTER
  document.getElementById('fetch-one').addEventListener('click', function (event) {

    const id = document.querySelector("#getCharacterIdShow").value

    APIHandler
      .getOneRegister(id)
      .then( (response) => {
        printCharacter(response)
        document.querySelector("#getCharacterIdShow").value = ""
      })
      .catch(err => console.log(err))

  });

  //DELETE ONE CHARACTER
  document.getElementById('delete-one').addEventListener('click', function (event) {

    const id = document.querySelector("#getCharacterIdDel").value
    
    APIHandler 
    .deleteOneRegister(id)
    .then( (response) => {
      
        const delButton = document.querySelector("#delete-one")
        resetBtn(response, delButton)
        document.querySelector("#getCharacterIdDel").value = ""

      })
      .catch(err => console.log(err))

  });

  //CREATE NEW CHARACTER
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
      console.log(character)

      APIHandler
        .createOneRegister(character)
        .then((response)=> {

          const sendButton = document.querySelector("#send-data")
          resetBtn(response, sendButton)
          printCharacter(response)
          document.querySelector("#new-character-form").reset()
        })
       .catch(err => console.log(err))

    }
    
  );

  //EDIT CHARACTER 

  document.querySelector("#edit-id").onkeyup = () => {
    const id = document.querySelector("#edit-id").value

    APIHandler
    .getOneRegister(id)
    .then( (response) => {

      if (response.data !== null) {
        
        const {name, occupation, weapon} = response.data
        const checkbox = document.querySelector("#editCheckBox")

        updateValue("#edit-name", name)
        updateValue("#edit-occupation", occupation)
        updateValue("#edit-weapon", weapon)
        
        response.data.cartoon ? checkbox.checked = true : checkbox.checked = false

      }
    })
    .catch(err => console.log(err))
  }

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {

    event.preventDefault()

    const inputs = document.querySelectorAll('#edit-character-form input')
    const id = inputs[0].value
    const character = {
      name: inputs[1].value,
      occupation: inputs[2].value,
      weapon: inputs[3].value,
      cartoon: inputs[4].checked,
    }
        
    APIHandler
    .updateOneRegister(id, character)
    .then( (response) => {

      const updateButton = document.querySelector("#update-data")
      resetBtn(response, updateButton)

      printCharacter(response)
      document.querySelector('#edit-character-form').reset()

    })
    .catch(err => console.log(err))

  });



});
