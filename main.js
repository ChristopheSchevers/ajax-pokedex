document.getElementById("button").addEventListener("click", loadPokemon);

const page = document.getElementById("output");

function loadPokemon() {
    let pokemon = document.getElementById("search").value;
    
    const xhr = new XMLHttpRequest();
        
    xhr.open("GET", "https://pokeapi.co/api/v2/pokemon/" + pokemon, true);
    
    xhr.onload = function() {
        if (this.status == 200) {
            let pokeFile = JSON.parse(this.response);
            console.log(pokeFile);

            let url = pokeFile.species.url;
            console.log(url);
            
            let output = `<ul>
            <li><img src="${pokeFile.sprites.front_default}"></li>
            <li>Id: ${pokeFile.id}</li>
            <li>Moves:
            <ul>
            <li>${pokeFile.moves[0].move.name}</li>
            <li>${pokeFile.moves[1].move.name}</li>
            <li>${pokeFile.moves[2].move.name}</li>
            <li>${pokeFile.moves[3].move.name}</li>
            </ul>
            </li>`;
            
            page.innerHTML = output;
            loadPrevPokemon(url);
        }
    }
    
    xhr.send();
}

function loadPrevPokemon(x) {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", x, true);

    xhr.onload = function() {
        if (this.status == 200) {
            let pokEvol = JSON.parse(this.response);
            let urlPic = pokEvol.evolves_from_species.url;
            console.log(urlPic);

            page.innerHTML += pokEvol.evolves_from_species.name;
            loadPrevPokePicture(urlPic);
        }
    }

    xhr.send();
}

function loadPrevPokePicture(y) {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", y, true);

    xhr.onload = function() {
        if (this.status == 200) {
            let pokePic = JSON.parse(this.response);
            console.log(pokePic);
        }
    }

    xhr.send();
}