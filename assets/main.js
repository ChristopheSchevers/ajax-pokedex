document.getElementById("button").addEventListener("click", loadPokemon);

const info = document.getElementById("pokeInfo");
const pokeImg = document.getElementById("pokeImg");
const prevPokemon = document.getElementById("prevPokemon");

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
            
            pokeImg.removeAttribute("hidden");
            pokeImg.setAttribute("src", pokeFile.sprites.front_default);
            
            
            let output = `<ul>
            <li>Id: ${pokeFile.id}</li>
            <li>Moves:
            <ul>
            ${moveGen()}
            </ul>
            </li>`;
            
            function moveGen() {
                if (pokeFile.moves.length <= 4) {
                    for (i = 0; i < pokeFile.moves.length; i++) {
                        return `<li>${pokeFile.moves[i].move.name}</li>`;
                    }
                } else {
                    return `<li>${pokeFile.moves[0].move.name}</li>
                    <li>${pokeFile.moves[1].move.name}</li>
                    <li>${pokeFile.moves[2].move.name}</li>
                    <li>${pokeFile.moves[3].move.name}</li>`;
                }
            }

            info.innerHTML = output;
            
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
            
            if (pokEvol.evolves_from_species == null) {
                prevPokemon.innerHTML = `No previous form`;
            } else {
                let pokName = pokEvol.evolves_from_species.name;
                prevPokemon.innerHTML = `Previous form:<br>${pokName}`;
                loadPrevPokePicture(pokName);
            }
        }
    }

    xhr.send();
}

function loadPrevPokePicture(y) {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "https://pokeapi.co/api/v2/pokemon/" + y, true);

    xhr.onload = function() {
        if (this.status == 200) {
            let pokePic = JSON.parse(this.response);
            console.log(pokePic.sprites.front_default);

            let img = document.createElement("img");
            img.setAttribute("src", pokePic.sprites.front_default);
            prevPokemon.appendChild(img);
        }
    }

    xhr.send();
}