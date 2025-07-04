// ==== PREGENERATED 1000 FLIPS ====
const flips = Array.from({ length: 1000 }, () => Math.random() < 0.5 ? "H" : "T");

let heads = flips.filter(f => f === "H").length;
let tails = flips.length - heads;

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

document.getElementById("stats").innerHTML = `
  <strong>Simulated 1000 Flips:</strong><br>
  Heads: ${heads}<br>
  Tails: ${tails}<br>
  Doubles: ${doubles}<br>
  Triples: ${triples}<br>
  Quadruples: ${quadruples}
`;

// ==== USER INPUT + BETTING ADVICE ====
function analyzeUserFlips() {
  const input = document.getElementById("userFlips").value.trim();
  if (!input) return;

  const userFlips = input.split(",").map(x => x.trim().toUpperCase());
  const last = userFlips[userFlips.length - 1];
  let streak = 1;

  for (let i = userFlips.length - 2; i >= 0; i--) {
    if (userFlips[i] === last) {
      streak++;
    } else {
      break;
    }
  }

  let message = `Last ${streak} flip(s) were '${last}'. `;

  if (streak >= 4) {
    message += `Unlikely to go further. BET '${last === "H" ? "T" : "H"}'`;
  } else if (streak === 3) {
    message += triples > quadruples
      ? `Triple streaks are common. BET '${last === "H" ? "T" : "H"}' to break the streak.`
      : `Quadruples happen often here. BET '${last}' to ride it.`;
  } else if (streak === 2) {
    message += triples > doubles
      ? `Triples occur often. BET '${last}' to follow momentum.`
      : `Double may break. BET '${last === "H" ? "T" : "H"}'`;
  } else {
    message += `No strong trend. BET either.`;
  }

  document.getElementById("prediction").innerText = message;
}
