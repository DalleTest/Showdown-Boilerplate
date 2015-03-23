/**
 * Gen 1 mechanics were fairly different, so we need to make a lot of changes to battle.js
 * using this.
 */
exports.BattleScripts = {
	inherit: 'gen4',
    gen:4,
    
    randomTeam: function (side) {
		// Get what we need ready.
		var keys = [];
		var pokemonLeft = 0;
		var pokemon = [];
		var i = 1;

		// We need to check it's one of the first 151 because formats data are installed onto main format data, not replaced.
		for (var n in this.data.FormatsData) {
			if (this.data.FormatsData[n].randomBattleMoves && i < 494) {
				keys.push(n);
			}
			i++;
		}
		keys = keys.randomize();

		// Now let's store what we are getting.
		var typeCount = {};
		var weaknessCount = {'electric':0, 'psychic':0, 'water':0, 'ice':0};
		var uberCount = 0;
		var nuCount = 0;
		var hasShitmon = false;

		for (var i = 0; i < keys.length && pokemonLeft < 6; i++) {
			var template = this.getTemplate(keys[i]);
			if (!template || !template.name || !template.types) continue;

			// Bias the tiers so you get less shitmons and only one of the two Ubers.
			// If you have a shitmon, you're covered in OUs and Ubers if possible
			var tier = template.tier;
			if (tier === 'LC' && (nuCount > 1 || hasShitmon)) continue;
			if ((tier === 'NFE' || tier === 'UU') && (hasShitmon || (nuCount > 2 && this.random(1)))) continue;
			// Unless you have one of the worst mons, in that case we allow luck to give you both Mew and Mewtwo.
			if (tier === 'Uber' && uberCount >= 1 && !hasShitmon) continue;

			// We need a weakness count of spammable attacks to avoid being swept by those.
			// Spammable attacks are: Thunderbolt, Psychic, Surf, Blizzard.
			var skip = false;
			Object.keys(weaknessCount).forEach(function (type) {
				var notImmune = Tools.getImmunity(type, template);
				if (notImmune && Tools.getEffectiveness(type, template) > 0) {
					weaknessCount[type]++;
				}
				if (weaknessCount[type] > 2) skip = true;
			});
			if (skip) continue;

			// Limit 2 of any type as well. Diversity and minor weakness count.
			// The second of a same type has halved chance of being added.
			var types = template.types;
			for (var t = 0; t < types.length; t++) {
				if (typeCount[types[t]] > 1 || (typeCount[types[t]] === 1 && this.random(1))) {
					skip = true;
					break;
				}
			}
			if (skip) continue;

			// The set passes the limitations.
			var set = this.randomSet(template, i);
			pokemon.push(set);

			// Now let's increase the counters. First, the Pokémon left.
			pokemonLeft++;

			// Type counter.
			for (var t = 0; t < types.length; t++) {
				if (types[t] in typeCount) {
					typeCount[types[t]]++;
				} else {
					typeCount[types[t]] = 1;
				}
			}

			// Increment type bias counters.
			if (tier === 'Uber') {
				uberCount++;
			} else if (tier === 'UU' || tier === 'NFE' || tier === 'LC') {
				nuCount++;
			}

			// Is it Magikarp?
			if (keys[i] in {'magikarp':1, 'weedle':1, 'kakuna':1, 'caterpie':1, 'metapod':1, 'ditto':1}) hasShitmon = true;
		}

		return pokemon;
	}
    
    
};
