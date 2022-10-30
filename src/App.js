import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
	faFish, faSwimmer, faSpider, faTree, faCompressArrowsAlt, faDotCircle, faRunning,
	faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix,
	faAdjust, faPlus, faCircle, faCookieBite, faCrown
} from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';

import battleIcon from './icons/battleIcon.svg';
import fullStomachIcon from './icons/fullStomachIcon.svg';
import eggIcon from './icons/eggIcon.png';

const diceProgression = [faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix];
function getDiceList(val) {
	let statIndicator = [];

	for (let i = 0; i < val; i++) {
		statIndicator.push(
			<FontAwesomeIcon key={i} icon={diceProgression[i]} className="baseIcon indicatorIcon" />
		);
	}
	return statIndicator;
}


function getTokenList(val, type) {
	let statIndicator = [<div key="spacer" className="spacer" />];
	for (let i = 0; i < val; i++) {
		let color = 'rgb(267, 184, 133)';
		let marginTop = "3.5mm";
		if (i % 2 === 0) {
			marginTop = "1.5mm";
			if (type === "both") {
				color = 'rgb(230, 230, 250)';
			}
		}

		statIndicator.push(
			<FontAwesomeIcon key={i} icon={faCircle} className="token"
				style={{color: color, marginTop: marginTop}}
			/>
		);	
	}
	return statIndicator;
}

class Dino {
	constructor(name, eatsMeat, abilities, stats) {
		this.name = name;
		this.pic = null;
		this.eatsMeat = eatsMeat;
		this.abilities = abilities;
		this.stats= stats;
	}
}

//
const statsOrder = ["size", "speed", "fight", "eatSpeed", "layHatch", "stomachSize"];
const probList = [2, 3.5, 5.5, 7, 9]
class Stats {
	constructor(size, stomachSize, speed, fight, eatSpeed) {

		let adjustedSpeed = speed / (2 ** size);
		let finalSpeed;
		if (adjustedSpeed < (17/12)) {

			finalSpeed = Math.round((1 - adjustedSpeed) * 6) + 1
			if (finalSpeed > 6) { finalSpeed = 6; }
			if (finalSpeed < 2) { finalSpeed = 2; }
			finalSpeed = `${finalSpeed}m`;

		} else {

			let correctProbIndex = 0;
		    let closestProb = probList[correctProbIndex];
		    for (let i = 0; i < probList.length; i++) {
		    	let probVal = probList[i];
		        if (Math.abs(adjustedSpeed - probVal) <= Math.abs(adjustedSpeed - closestProb)) {
		            closestProb = probVal;
		            correctProbIndex = i;
		        }
		    }

		   	finalSpeed = (correctProbIndex + 1) / 2;
		    if (finalSpeed % 1 == 0) {
		    	finalSpeed = `${finalSpeed}t`
		    } else {
		    	finalSpeed = `${finalSpeed - 0.5}h`
		    }
		}

		this.size = size;
		this.speed = finalSpeed;
		this.fight = fight;
		this.stomachSize = stomachSize;
		this.layHatch = Math.ceil(this.stomachSize / 2);
		this.eatSpeed = eatSpeed;
	}
}


// f = fishing, t = tree grazing, s = swimming, i = insect eating, p = pack hunting, h = herd protection, k = king
const shorthandToIcon = {s: faSwimmer, f: faFish, t: faTree,  i: faSpider, p: faCompressArrowsAlt, h: faDotCircle, k: faCrown};

var dinoData = [

  new Dino("Brn. Albertosaurus", true, ['f', 'p', 's'], new Stats(0, 6, 7, 2, 2)),
  new Dino("Pink Albertosaurus", true, ['p', 'i'], new Stats(0, 6, 7, 2, 2)),
  new Dino("Therizinosaurus", false, ['i'], new Stats( 2, 10, 6, 3, 2)),
  new Dino("Big Parasaurolophus", false, ['i', 't', 's', 'h'], new Stats(1, 7, 6, 1, 1)),
  new Dino("Tiny Parasaurolophus", false, ['i', 's', 'h'], new Stats(1, 4, 5, 1, 1)),

  new Dino("Tiny Dimetrodon", true, ['s', 'f'], new Stats(1, 7, 7, 3, 2)),
  new Dino("Big Dimetrodon", true, ['s'], new Stats(2, 8, 8, 3, 3)),
  new Dino("Tiny Utahraptor", true, ['p', 'f', 'i', 's'], new Stats(0, 5, 6, 2, 1)),
  new Dino("Tiny Diplodocus", false, ['h'], new Stats(0, 4, 4, 1, 1)),
  new Dino("Scelidosaurus", false, ['t', 'h'], new Stats(1, 5, 3, 1, 1)),

  new Dino("Corythosaurus", false, ['t', 's'], new Stats(0, 6, 5, 1, 1)),
  new Dino("Green Stegosaurus", false, ['t'], new Stats(1, 5, 2, 1, 1)),
  new Dino("Stripy Stegosaurus", false, ['t'], new Stats(1, 5, 2, 1, 1)),
  new Dino("Tyrannosaurus Rex", true, ['k'], new Stats(2, 10, 9, 4, 3)),
  new Dino("Dilophosaurus", true, ['f'], new Stats(2, 9, 8, 4, 3)),

  new Dino("Big Utahraptor", true, ['p', 'f'], new Stats(2, 9, 9, 4, 3)),
  new Dino("Tiny Ankylosaurus", false, [], new Stats(1, 4, 3, 1, 1)),
  new Dino("Tiny Triceratops", false, ['h', 's'], new Stats(0, 4, 4, 1, 1)),
  new Dino("Gorgonopsid", true, ['s'], new Stats(1, 8, 8, 3, 3)),
  new Dino("Huge Triceratops", false, ['h'], new Stats(2, 8, 3, 3, 2)),

  new Dino("Postosuchus", true, ['i'], new Stats(1, 7, 6, 3, 2)),
  new Dino("Big Ankylosaurus", false, [], new Stats(1, 8, 2, 3, 2)),
  new Dino("Big Diplodocus", false, ['h', 't'], new Stats(2, 9, 4, 2, 2)),
  new Dino("Big Triceratops", false, ['h', 's'], new Stats(0, 8, 5, 1, 1)),
  new Dino("Velociraptor", true, ['p', 'f', 's'], new Stats(1, 9, 9, 4, 3)),

  new Dino("Baryonyx", true, ['s', 'f'], new Stats(2, 8, 8, 4, 3)),
  new Dino("Spinosaurus", true, ['s', 'f', 'k'], new Stats(2, 10, 9, 4, 3)),
  new Dino("Huge Ankylosaurus", false, ['h', 't'], new Stats(2, 9, 3, 3, 2)),
];

var dinoPics = require.context("./dinoPics", false, /.*\.jpeg$/);
for (let i = 0; i < dinoData.length; i++) {
	dinoData[i].pic = dinoPics(`./pic ${i}.jpeg`);
}

function StatCard(props) {
	let stat = props.stat;

	let statIcon;
	let statIndicator;
	switch(props.statName) {
		case 'size':
			statIcon = <FontAwesomeIcon icon={faSquare} className="baseIcon" />;
		break;
	  case 'speed':
	    statIcon = <FontAwesomeIcon icon={faRunning} className="baseIcon" />;

	    let val = parseInt(stat.charAt(0)); let type = stat.charAt(1);
			if (type === 't') {
				statIndicator = getDiceList(val);
			} else if (type === 'm') {
				statIndicator = [
					<FontAwesomeIcon key="val" icon={diceProgression[val - 1]} className="baseIcon indicatorIcon" />,
					<FontAwesomeIcon key="sign" icon={faPlus} className="baseIcon indicatorIcon" />,
				];
			} else {

				statIndicator = getDiceList(val);
				statIndicator.push(
					<FontAwesomeIcon key="sign" icon={faAdjust} className="baseIcon indicatorIcon" />,
				);
			}
	    break;
	  case 'fight':
	    statIcon = <img src={battleIcon} className="baseIcon" alt="statIcon" />;
	    statIndicator = getDiceList(stat);
	    break;
	  case 'layHatch':
	  	statIcon = <img src={eggIcon} className="baseIcon" alt="statIcon" />;
	  	statIndicator = getTokenList(stat, 'food');
	    break;
	  case 'eatSpeed':
	  	statIcon = <FontAwesomeIcon icon={faCookieBite} className="baseIcon" />;
	  	statIndicator = [];
	  	for (let i = 0; i < stat; i++) {
	  		statIndicator.push(
	  			<FontAwesomeIcon key={i} icon={faCircle} className="baseIcon indicatorIcon" style={{color: "rgb(267, 184, 133)"}} />
	  		);
	  	}
	  	break;
	  default:
	    statIcon = <img src={fullStomachIcon} className="baseIcon" alt="statIcon" />;
	    statIndicator = getTokenList(stat, 'both');
	}


	let backgroundStyle;
	if (props.statName === "size") {
		backgroundStyle = {
			backgroundColor: stat === 0 ? 'black': stat === 1 ? 'rgb(97, 68, 38)' : 'green',
		};
	} else {
		backgroundStyle = {
			backgroundImage: 'url(/pics/dirt.jpeg)',
			backgroundPosition: `left 0px top ${props.index * 28.34}px`,
		}
	}

	return(
		<div className="stat" style={backgroundStyle}>
			<div className="statIconBox" style={{backgroundColor: props.eatsMeat ? "rgb(235, 61, 52)" : "green"}}>
				{statIcon}
			</div>
			<div className="indicatorBox">
				{statIndicator}
			</div>
		</div>

	);
}

function Card(props) {
	let dino = props.dino;
	let classes = 'card ';
	classes += dino.eatsMeat ? 'bones' : 'ferns';
	let nameClasses = 'name ';
	nameClasses += dino.name.includes("Parasaurolophus") ? 'paraText' : '';

	let abilityIcons = [];
	for(let shorthand in shorthandToIcon) {
		if (dino.abilities.includes(shorthand)) {
			abilityIcons.push(
				<FontAwesomeIcon key={shorthand} icon={shorthandToIcon[shorthand]} className="baseIcon abilityIcon"/>
			);
		}
	}

	let statCards = [];
	for (let i = 0; i < statsOrder.length; i++) {
		let statName = statsOrder[i];
		statCards.push(
			<StatCard name={dino.name} key={statName} statName={statName} stat={dino.stats[statName]} eatsMeat={dino.eatsMeat} index={i} />
		);
	}

	return(
		<div className={classes} >
			<div className="photoPane">
				<img src={dino.pic} className="pic" alt={"bla"}/>
				<div className="topper">
					<div className={nameClasses}> {dino.name} </div>
				</div>
				<div className="drawer">
					{abilityIcons}
				</div>
			</div>
			<div className="statsPane">
				{statCards}
			</div>
		</div>
	);
}

function App() {
	let cards = [];
	for (let dino of dinoData) {
		cards.push(
			<Card key={dino.name} dino={dino} />
		);
	}

  return (
  	<div className="flex">
		{cards}
    </div>
  );
}

export default App;
