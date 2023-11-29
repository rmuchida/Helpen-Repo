const cards = document.querySelectorAll("[data-category]")
const toggles = document.querySelectorAll("[data-category-toggle]")

function viewCategory(categoryName) {
    cards.forEach((card) => {
        const cardCategory = card.dataset.category
        if (cardCategory == categoryName) {
            card.style.display = "flex"
            card.parentElement.style.display = "flex"
        } else {
            card.style.display = "none"
            card.parentElement.style.display = "none"
            
        }
    })
}

/*
In index.js,
    const toggles = document.querySelectorAll("[data-category-toggle]")
Collects all html nodes that have attribute with data-category-toggle key
In index.js's
    const category = toggle.dataset.categoryToggle
Assigns the value inside of data-category-toggle key in Index.ejs's
    <p data-category-toggle="greeting">Hello</p>
to const category
*/
toggles.forEach((toggle) => {
    const category = toggle.dataset.categoryToggle
    toggle.addEventListener("click", () => {
        viewCategory(category)
        console.log(category)
        toggleCategoryToggles(category)
    })
})

function toggleCategoryToggles(categoryName) {
    toggles.forEach((toggle) => {
        const category = toggle.dataset.categoryToggle
        if (category == categoryName) {
            toggle.style.fontFamily = "Font5"
        } else {
            toggle.style.fontFamily = ""
        }
    })
}

//////////////////////////////// Form Submission (Tommy's work)

//looking for any element on index.ejs that has data-form property
const connectionForms = document.querySelectorAll("[data-form]")
connectionForms.forEach((connectionForm) => {
    connectionForm.addEventListener("submit", connectionFormSubmit)
})

$(".toast").toast({autohide: false});

async function connectionFormSubmit(event) {
    event.preventDefault()
    const form = event.target
    const orgID = form.dataset.form
    const additionalInfo = form.additionalInfo.value
    const name = form.name.value
    const email = form.email.value
    const company = form.company.value
    const response = await fetch("/connections", {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify({orgID, additionalInfo, name, email, company})
    })

    if (response.ok) {
        $(".toast").toast("show");
        $('.modal').modal('hide') //hiding all modals
    }
}

//////////////////////////Sorting Organizations (Matthew's work)

var dropdownItems = document.getElementsByClassName('dropdown-item');

// gather all data categories of the organization names from the cards
const cardNames = document.querySelectorAll("[data-name]")
var cardNamesArray = Array.from(cardNames);

const locationNames = document.querySelectorAll("[data-location]")
var locationsArray = Array.from(locationNames);

const recentlyUpdated = document.querySelectorAll("[data-updated]")
var recentlyUpdatedArray = Array.from(recentlyUpdated);

const description = document.querySelectorAll("[data-description]")
var descriptionsArray = Array.from(description);

// console.log(recentlyUpdatedArray);

// sort org names
function sorterForwardName(a,b) {
    return a.dataset.name.localeCompare(b.dataset.name); // sorts based on alphabetical order
}

function sorterBackwardName(a,b) {
    return b.dataset.name.localeCompare(a.dataset.name);
}

function sorterForwardLocation(a,b) {
    return a.dataset.location.localeCompare(b.dataset.location); // sorts based on alphabetical order
}

function sorterUpdated(a,b) {
    return b.dataset.updated.localeCompare(a.dataset.updated);
}

//Appending to Page
function appendCard(card) {
    // var btn = document.createElement('div');
    // btn.setAttribute("class", "col-6 mx-0 align-self-start align-content-start p-0");
    // btn.setAttribute("id", "column");
    // btn.appendChild(card);

    var parentDiv = document.getElementById('roww');
    // const currentDiv = document.getElementById("column");
    // parentDiv.insertBefore(btn, currentDiv);
    parentDiv.prepend(card.parentElement);


    // document.body.insertBefore(btn, currentDiv);
}

$('#modalContactForm').on('show.bs.modal', function(e) {
    // Get the data attributes of the clicked element
    var name = $(e.relatedTarget).data('button-name');
    var id = $(e.relatedTarget).data('button-id');
  
    // Update the modal content
    var modalTitle = $(this).find('.modal-title');
    var modalForm = $(this).find('form');
  
    modalTitle.text(name);
    modalForm.attr('data-form', id);
  });

Array.from(dropdownItems).forEach((element) => {
  element.addEventListener('click', (event) => {
  switch(event.target.innerText) {
    case "Recently Updated":
        recentlyUpdatedArray.sort(sorterUpdated).forEach(e => appendCard(e));
        break;
    case "Location":
        // locationsArray.sort(sorterForwardLocation).forEach(e => document.querySelector("#roww").appendChild(e));
        locationsArray.sort(sorterForwardLocation).forEach(e => appendCard(e));
        break;
    case "A - Z":
        // cardNamesArray.sort(sorterForwardName).forEach(e => document.querySelector("#roww").appendChild(e));
        cardNamesArray.sort(sorterBackwardName).forEach(e => appendCard(e));
        break;
    case "Z - A":
        // cardNamesArray.sort(sorterBackwardName).forEach(e => document.querySelector("#roww").appendChild(e));
        cardNamesArray.sort(sorterForwardName).forEach(e => appendCard(e));
        break;
    }
  });
});


// get references to the search input field and search button
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// add click event listener to search button
searchButton.addEventListener('click', function() {
  // get the search term from the input field
  const searchTerm = searchInput.value.toLowerCase();
  
  // filter the card names based on the search term
  const filteredCardNames = []
for (let i = 0; i < cardNamesArray.length; i++) {
    if (cardNamesArray[i].dataset.name.toLowerCase().includes(searchTerm)) {
        filteredCardNames.push(cardNamesArray[i].dataset.name);
    }
    }

    for (let j = 0; j < descriptionsArray.length; j++) {
        if (descriptionsArray[j].dataset.description.toLowerCase().includes(searchTerm)) {
            filteredCardNames.push(descriptionsArray[j].dataset.description);
            console.log(descriptionsArray[j].dataset.description);
        }
    }
  
  // display the filtered card names
  console.log(filteredCardNames);
//   for (let j = 0; j < filteredCardNames.length; j++) {
    viewName(filteredCardNames)
//   }
});


function viewName(names) {
    cardNames.forEach((card) => {
        const cardName = card.dataset.name
        const cardDesc = card.dataset.description
        if (names.includes(cardName)) {
            card.style.display = "flex"
            card.parentElement.style.display = "flex"
        } else if (names.includes(cardDesc)) {
            card.style.display = "flex"
            card.parentElement.style.display = "flex"
        } else {
            card.style.display = "none"
            card.parentElement.style.display = "none"
        }
    })
}

//Display the cards in groups of four

//keep count of the number of cards being shown
var count = 0

//keep count of the number of times the page has been reloaded
var loadCount = 1;

function displayCards() {
    //if the page has just been reloaded, the display styles of the cards will be reset
    if (loadCount == 1) {
        cardNames.forEach((card) => {
            card.style.display = "flex";
            card.parentElement.style.display = "flex";
        })
        loadCount += 1;
    }

    //displaying the card onto the page
    cardNames.forEach((card) => {
        if (card.style.display == "none" && card.parentElement.style.display == "flex" && count < 4) {
            console.log("display is none from the start")
            card.style.display = "flex"
            card.parentElement.style.display = "flex"
            count += 1
        }
        else if (card.style.display == "flex" && card.parentElement.style.display == "flex" && count < 4) {
            card.style.display = "flex"
            card.parentElement.style.display = "flex"
            count += 1
        }
        else if (card.style.display == "none" && card.parentElement.style.display == "none" && count < 4) {
            card.style.display = "none"
            card.parentElement.style.display = "none"
        }
        else {
            card.style.display = "none"
            card.parentElement.style.display = "flex"
        }
        
        // console.log('count: ' + count)
    })
}

//Discover More functionality

discover.addEventListener('click', function(){
    //tracking the number displayed cards after clicking discover more
    newCount = 0
    //get the number of displayed cards from the last time
    displayedCount = count

    // console.log('displayed count: ' + displayedCount)

    //display 4 more cards
    cardNames.forEach((card) => {
        if (card.style.display == "none" && card.parentElement.style.display == "flex" && newCount < (displayedCount + 4)) {
            card.style.display = "flex"
            card.parentElement.style.display = "flex"
            newCount += 1
            count += 1
        }
        else if (card.style.display == "flex" && card.parentElement.style.display == "flex" && newCount < (displayedCount + 4)) {
            card.style.display = "flex"
            card.parentElement.style.display = "flex"
            newCount += 1
            count += 1
        }
        else if (card.style.display == "none" && card.parentElement.style.display == "none" && newCount < (displayedCount + 4)) {
            card.style.display = "none"
            card.parentElement.style.display = "none"
        }
        else {
            card.style.display = "none"
            card.parentElement.style.display = "flex"
        }
        
    })
})