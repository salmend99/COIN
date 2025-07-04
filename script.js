// Simulate 1000 flips
const flips = Array.from({ length: 1000 }, () => Math.random() < 0.5 ? "H" : "T");

let heads = flips.filter(f => f === "H").length;
let tails = flips.length - heads;

let doubles = 0;
let triples = 0;
let quadruples = 0;

let switchCountsBeforeDouble = [];

let switchesSinceLastDouble = 0;
let lastFlip = flips[0];
let lastWasSwitch = false;

for (let i = 1; i < flips.length; i++) {
  const current = flips[i];

  // Track switch
  if (current !== lastFlip) {
    switchesSinceLastDouble++;
    lastWasSwitch = true;
  } else {
    // Found a double
    doubles++;
    if (i >= 2 && flips[i] === flips[i - 1] && flips[i] === flips[i - 2]) {
      triples++;
      if (i >= 3 && flips[i] === flips[i - 3]) {
        quadruples++;
      }
    }

    if (lastWasSwitch) {
      switchCountsBeforeDouble.push(switchesSinceLastDouble);
      switchesSinceLastDouble = 0;
      lastWasSwitch = false;
    }
  }

  lastFlip = current;
}

document.addEventListener("DOMContentLoaded", () => {
  const avgSwitches = (
    switchCountsBeforeDouble.reduce((a, b) => a + b, 0) /
    (switchCountsBeforeDouble.length || 1)
  ).toFixed(2);

  document.getElementById("stats").innerHTML = `
    <strong>Simulated 1000 Flips:</strong><br>
    Heads: ${heads}<br>
    Tails: ${tails}<br>
    Doubles: ${doubles}<br>
    Triples: ${triples}<br>
    Quadruples: ${quadruples}<br><br>
    Avg switches before a double: ${avgSwitches}<br>
    Recorded: [${switchCountsBeforeDouble.join(", ")}]
  `;
});

function analyzeUserFlips() {
  const input = document.getElementById("userFlips").value.trim();
  const display = document.getElementById("prediction");

  if (!input) {
    display.innerText = "⚠️ Please enter your flips (e.g. H,T,T,H)";
    return;
  }

  const userFlips = input.split(",").map(x => x.trim().toUpperCase()).filter(x => x === "H" || x === "T");

  if (userFlips.length === 0) {
    display.innerText = "⚠️ Invalid input. Use H or T separated by commas.";
    return;
  }

  const last = userFlips[userFlips.length - 1];
  let streak = 1;
  for (let i = userFlips.length - 2; i >= 0; i--) {
    if (userFlips[i] === last) {
      streak++;
    } else {
      break;
    }
  }

  let message = `🧠 You’ve flipped ${streak}x '${last}' in a row. `;

  if (streak >= 4) {
    message += `Streak is long. Odds favor switch. Bet '${last === "H" ? "T" : "H"}'.`;
  } else if (streak === 3) {
    message += triples > quadruples
      ? `Triples are more common. Bet '${last === "H" ? "T" : "H"}'.`
      : `Quadruples show up. Ride the streak with '${last}'.`;
  } else if (streak === 2) {
    message += triples > doubles
      ? `Triples usually follow. Bet '${last}'.`
      : `Break may come. Bet '${last === "H" ? "T" : "H"}'.`;
  } else {
    message += `No trend. Pick based on gut or switch sides.`;
  }

  display.innerText = message;
}
