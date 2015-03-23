/**
 * Gen 1 mechanics were fairly different, so we need to make a lot of changes to battle.js
 * using this.
 */
exports.BattleScripts = {
	inherit: 'gen6',
	gen: 6,
    
    randomTeam: function (side) {
        var pokemonPool = ["Clefairy", "Clefable", "Mew", "Togepi", "Togetic", "Munchlax"];
        var pokemon = [];
        
        var moves = [];
        moves.push("metronome");
        for(var i = 0; i < 6; i++) {
            var pokemonName = pokemonPool[i];
            
            pokemon.push({
		  	   name: pokemonName,
		  	   moves:moves,
		  	   ability: 'None',
		  	   evs: {hp: 255, atk: 255, def: 255, spa: 255, spd: 255, spe: 255},
		  	   ivs: {hp: 30, atk: 30, def: 30, spa: 30, spd: 30, spe: 30},
		  	   item: '',
		  	   level: 100,
		  	   shiny: false,
		  	   gender: false
		  });
        }
        
        return pokemon;
    }
};
