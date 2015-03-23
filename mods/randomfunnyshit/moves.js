/**
 * A lot of Gen 1 moves have to be updated due to different mechanics.
 * Some moves have had major changes, such as Bite's typing.
 */

var transformEnemy = function (target, pokemon) {
    var tmp = pokemon;
    pokemon = target;
    target = tmp;
            
    if (!pokemon.transformInto(target, pokemon)) {
        return false;
    } 
}
exports.BattleMovedex = {
    stringshot: {
        inherit: true,
        target: "normal",
        boosts: {
			accuracy: -1
		},
        secondary: {
            chance: 30,
            volatileStatus: 'flinch'
        },
        
        self: {
            boosts: {
                spe: +1
            }
        }
    },
    harden: {
        inherit: true,
        target: "normal",
        onHit: transformEnemy,
        priority: 1
    },
	thunderbolt: {
        
         inherit: true,
        target: "normal",
        boosts: {
			accuracy: -1
		},
        secondary: {
            chance: 30,
            volatileStatus: 'flinch'
        },
        
        self: {
            boosts: {
                spe: +1
            }
        }
        /*
        inherit: true,
        isNotProtectable: true,
        priority: 1,
        target: 'normal',
        secondary: {
            chance: 50,
            volatileStatus: 'confusion',
            status: 'par'
        },
        self: {
            boosts: {
                atk: -1,
                spe: +1
            }
        }
        /*
        onHit: function (target, source, move) {
            var side = target.side;
			for (var i = 0; i < side.pokemon.length; i++) {
				side.pokemon[i].status = 'frz';
			}
            target.setBoost({atk:3});
            source.setBoost({spe:-3});
			this.add('-cureteam', source, '[from] move: Aromatherapy');
			this.add('-setboost', source, '[from] move: Aromatherapy');
			this.add('-setboost', target, '[from] move: Aromatherapy');
        },
        */
        //onHit: transformEnemy
        /*,
        self: {
            status: "frz"
        }
        */
    
        
    },
        
    	
    /*
	thunderwave: {
		inherit: true,
        boosts: {
            spd: 2
        },
        secondary: {
			chance: 100,
			self: {
				boosts: {
					atk: 6,
					def: 6,
					spa: 6,
					spd: 6,
					spe: 6
				}
			}, 
            status: 'frz'
		}
        
 
	}
           */
};
