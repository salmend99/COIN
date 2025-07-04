// === PART 1: SIMULATE 1000 FLIPS ===
let flips = [];
let heads = 0;
let tails = 0;

for (let i = 0; i < 1000; i++) {
  const flip = Math.random() < 0.5 ? "H" : "T";
  flips.push(flip);
  flip === "H" ? heads++ : tails++;
}

// === COUNT STREAKS ===
let doubles = 0;
let triples = 0;
let quadruples = 0;

for (let i = 0; i < flips.length - 1; i++) {
  if (flips[i] === flips[i + 1]) {
    doubles++;
    if (flips[i] === flips[i + 2]) {
      triples++;
      if (flips[i] === flips[i + 3]) {
        quadruples++;
      }
    }
  }
}

console.log("Heads:", heads);
console.log("Tails:", tails);
console.log("Doubles:", doubles);
console.log("Triples:", triples);
console.log("Quadruples:", quadruples);

// === PART 2: BETTING PREDICTION BASED ON USER FLIPS ===

function predictNextFlip(userFlips) {
  const last = userFlips[userFlips.length - 1];
  let streak = 1;

  // Count how long the last streak is
  for (let i = userFlips.length - 2; i >= 0; i--) {
    if (userFlips[i] === last) {
      streak++;
    } else {
      break;
    }
  }

  console.log(`Your last streak: ${streak}x '${last}'`);

  // Probabilities based on historical streak behavior
  const maxStreak = Math.max(doubles, triples, quadruples);

  if (streak >= 4) {
    return `You've already had a 4x streak of '${last}'. Consider switching to '${last === "H" ? "T" : "H"}'`;
  } else if (streak === 3 && triples > quadruples) {
    return `You've hit a triple '${last}'. Odds of a 4x are lower. Consider switching.`;
  } else if (streak === 2 && triples > doubles) {
    return `You've hit a double '${last}'. Triple is likely. Consider betting on '${last}' again.`;
  } else {
    return `Trend is unclear. Bet at your own risk!`;
  }
}

// Example usage:
let userFlips = ["H", "H", "H"]; // Replace with your flips
console.log(predictNextFlip(userFlips));
