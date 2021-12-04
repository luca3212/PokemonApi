const namePokemon = document.getElementById('entrada');

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
                dataPokemon();
            }
        });
       
        async function dataPokemon(){
            if(validation()!=false){
                try {
                    const dataAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${namePokemon.value.toLowerCase()}`);
                    const jsonData = await dataAPI.json();
                    console.log(jsonData);
                    document.getElementById('titlePokemon').innerText= jsonData.name;
                    document.getElementById('imgPokemon').src = jsonData.sprites.other.dream_world.front_default;

                    peso.innerText = Number(jsonData.weight) / 10 +" Kg.";
                    altura.innerText = Number(jsonData.height) / 10 +" Mts.";


                    hp.innerText = jsonData.stats[0].base_stat;
                    ataque.innerText = jsonData.stats[1].base_stat;
                    defensa.innerText = jsonData.stats[2].base_stat;
                    especialAtaque.innerText = jsonData.stats[3].base_stat;
                    especialDefensa.innerText = jsonData.stats[4].base_stat;
                    velocidad.innerText = jsonData.stats[5].base_stat;
                    
                     

                    namePokemon.value="";
                    
                } catch (error) {
                   alert("Error, intente nuevamente..");

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
                }
               

            }else{
                alert("Ingrese el nombre de un Pokemon");
                namePokemon.focus();
            }   
        } 
           

        function validation(){
            if(namePokemon.value.trim() == ""){
                return false;
            }else{
                return true;
            }
        }
       