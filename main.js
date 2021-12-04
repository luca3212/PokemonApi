const namePokemon = document.getElementById('entrada');
let idActual = 1;

//datos pokemon
const peso = document.getElementById('peso');
const altura = document.getElementById('altura');
const hp = document.getElementById('hp');
const ataque = document.getElementById('ataque');
const defensa = document.getElementById('defensa');
const especialAtaque = document.getElementById('especialAtaque');
const especialDefensa = document.getElementById('especialDefensa');
const velocidad = document.getElementById('velocidad');

namePokemon.addEventListener('keypress', (e)=>{
    if(e.key == "Enter"){
        validation();
    }
});

//anterior-siguiente
const anterior = document.getElementById('prew');
const siguiente = document.getElementById('next');

anterior.addEventListener('click', ()=>{
    if(idActual==1){
        anterior.classList.toggle('disableArrow');
        console.log("no hay mas");
    }else{
        if(idActual==10001){
            idActual=898;
        }else{
            idActual--;
        }
        let nextPokemon = `https://pokeapi.co/api/v2/pokemon/${idActual}`;
        dataPokemon(nextPokemon);
    }
});

siguiente.addEventListener('click', ()=>{
    if(idActual==10220){
        siguiente.classList.toggle('disableArrow');
        console.log("no hay mas");
    }else{
        if(idActual==898){
            idActual=10001;
        }else{
            idActual++;
        }
        let nextPokemon = `https://pokeapi.co/api/v2/pokemon/${idActual}`;
        dataPokemon(nextPokemon);
    }
});

const carga= document.getElementById('loading');

async function dataPokemon(varURL){
    carga.classList.add('open');
    try {
        const dataAPI = await fetch(varURL);
        const jsonData = await dataAPI.json();
        console.log(jsonData);

        idActual= jsonData.id;
        
        if(idActual==1){
            anterior.classList.toggle('disableArrow');
        }else{
            anterior.classList.remove('disableArrow');
        }

        if(idActual==10220){
            siguiente.classList.toggle('disableArrow');
        }else{
            siguiente.classList.remove('disableArrow');
        }

        document.getElementById('titlePokemon').innerText= jsonData.name;
        if(jsonData.sprites.other.dream_world.front_default != null){
            document.getElementById('imgPokemon').src = jsonData.sprites.other.dream_world.front_default;
        }else{
            document.getElementById('imgPokemon').src = jsonData.sprites.other.home.front_default;
        }
                
        peso.innerText = Number(jsonData.weight) / 10 +" Kg.";
        altura.innerText = Number(jsonData.height) / 10 +" Mts.";
        hp.innerText = jsonData.stats[0].base_stat;
        ataque.innerText = jsonData.stats[1].base_stat;
        defensa.innerText = jsonData.stats[2].base_stat;
        especialAtaque.innerText = jsonData.stats[3].base_stat;
        especialDefensa.innerText = jsonData.stats[4].base_stat;
        velocidad.innerText = jsonData.stats[5].base_stat;
                
        namePokemon.value="";
        carga.classList.remove('open');        
    } catch (error) {
        document.getElementById('titlePokemon').innerText= "Pokemon no encontrado!";
        document.getElementById('imgPokemon').src = "";
        peso.innerText = "-";
        altura.innerText = "-";
        hp.innerText = "-";
        ataque.innerText = "-";
        defensa.innerText = "-";
        especialAtaque.innerText = "-";
        especialDefensa.innerText = "-";
        velocidad.innerText = "-";
        namePokemon.value="";
        namePokemon.focus();
        carga.classList.remove('open');
    }
      
} 
           

function validation(){
    if(namePokemon.value.trim() == ""){
        alert("Ingrese el nombre de un Pokemon");
        namePokemon.focus();
    }else{
        dataPokemon(`https://pokeapi.co/api/v2/pokemon/${namePokemon.value.toLowerCase()}`);
    }
}

window.onload = function() {
    let urlInicio = "https://pokeapi.co/api/v2/pokemon/1";
    dataPokemon(urlInicio);
};