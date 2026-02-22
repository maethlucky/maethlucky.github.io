// Event listeners
document.querySelector("#hit").addEventListener("click", hit);
document.querySelector("#stand").addEventListener("click", stand);
document.querySelector("#reset").addEventListener("click", initialize);

// Global variables
const deck = [
  // Spades
  { name: "ace_of_spades", value: 11 },
  { name: "2_of_spades", value: 2 },
  { name: "3_of_spades", value: 3 },
  { name: "4_of_spades", value: 4 },
  { name: "5_of_spades", value: 5 },
  { name: "6_of_spades", value: 6 },
  { name: "7_of_spades", value: 7 },
  { name: "8_of_spades", value: 8 },
  { name: "9_of_spades", value: 9 },
  { name: "10_of_spades", value: 10 },
  { name: "jack_of_spades", value: 10 },
  { name: "queen_of_spades", value: 10 },
  { name: "king_of_spades", value: 10 },

  // Hearts
  { name: "ace_of_hearts", value: 11 },
  { name: "2_of_hearts", value: 2 },
  { name: "3_of_hearts", value: 3 },
  { name: "4_of_hearts", value: 4 },
  { name: "5_of_hearts", value: 5 },
  { name: "6_of_hearts", value: 6 },
  { name: "7_of_hearts", value: 7 },
  { name: "8_of_hearts", value: 8 },
  { name: "9_of_hearts", value: 9 },
  { name: "10_of_hearts", value: 10 },
  { name: "jack_of_hearts", value: 10 },
  { name: "queen_of_hearts", value: 10 },
  { name: "king_of_hearts", value: 10 },

  // Diamonds
  { name: "ace_of_diamonds", value: 11 },
  { name: "2_of_diamonds", value: 2 },
  { name: "3_of_diamonds", value: 3 },
  { name: "4_of_diamonds", value: 4 },
  { name: "5_of_diamonds", value: 5 },
  { name: "6_of_diamonds", value: 6 },
  { name: "7_of_diamonds", value: 7 },
  { name: "8_of_diamonds", value: 8 },
  { name: "9_of_diamonds", value: 9 },
  { name: "10_of_diamonds", value: 10 },
  { name: "jack_of_diamonds", value: 10 },
  { name: "queen_of_diamonds", value: 10 },
  { name: "king_of_diamonds", value: 10 },

  // Clubs
  { name: "ace_of_clubs", value: 11 },
  { name: "2_of_clubs", value: 2 },
  { name: "3_of_clubs", value: 3 },
  { name: "4_of_clubs", value: 4 },
  { name: "5_of_clubs", value: 5 },
  { name: "6_of_clubs", value: 6 },
  { name: "7_of_clubs", value: 7 },
  { name: "8_of_clubs", value: 8 },
  { name: "9_of_clubs", value: 9 },
  { name: "10_of_clubs", value: 10 },
  { name: "jack_of_clubs", value: 10 },
  { name: "queen_of_clubs", value: 10 },
  { name: "king_of_clubs", value: 10 }
];

let dealerHand = [];
let playerHand = [];

let dealerDiv = document.querySelector("#dealerHand");
let playerDiv = document.querySelector("#playerHand");
let endMessage = document.querySelector("#endMessage");
let hitButton = document.querySelector("#hit");
let standButton = document.querySelector("#stand");
let resetButton = document.querySelector("#reset");
let dealerValueDisplay = document.querySelector("#dealerValue");
let playerValueDisplay = document.querySelector("#playerValue");

initialize();

// Draw starting cards for dealer and player
function initialize() {
    // Clear hands
    playerHand = [];
    dealerHand = [];

    dealerDiv.innerHTML = "";
    playerDiv.innerHTML = "";

    // Reset end message and buttons
    endMessage.textContent = "";
    resetButton.style.display = "none";
    hitButton.style.display = "inline";
    standButton.style.display = "inline";

    // Generate dealer cards
    let dealerCard = generateUniqueCard();
    dealerHand.push(dealerCard);
    dealerHand.push(generateUniqueCard());

    // Display first card face up
    let dealerImg = document.createElement("img");
    dealerImg.src = `img/cards/${dealerCard.name}.png`;
    dealerDiv.append(dealerImg);

    // Display second card face down
    dealerImg = document.createElement("img");
    dealerImg.src = `img/card_back.png`;
    dealerDiv.append(dealerImg);

    console.log(dealerHand);

    // Generate player cards
    playerHand.push(generateUniqueCard());
    playerHand.push(generateUniqueCard());

    // Display player's hand
    for (card of playerHand) {
        let playerImg = document.createElement("img");
        playerImg.src = `img/cards/${card.name}.png`;
        playerDiv.append(playerImg);
    } 

    // Display starting hand values
    dealerValueDisplay.textContent = "Hand Value: ???";
    playerValueDisplay.textContent = `Hand Value: ${calculateHandValue(playerHand)}`;
}

function hit() {
    // Generate new card and add to hand
    playerHand.push(generateUniqueCard());

    // Display new hand
    playerDiv.innerHTML = "";

    for (card of playerHand) {
        let playerImg = document.createElement("img");
        playerImg.src = `img/cards/${card.name}.png`;
        playerDiv.append(playerImg);
    }

    let playerValue = calculateHandValue(playerHand);

    playerValueDisplay.textContent = `Hand Value: ${playerValue}`;

    // End game if player busts
    if (playerValue > 21) {
        stand();
    }
}

function stand() {
    let playerValue = calculateHandValue(playerHand);

    // End game immediately if it's a bust
    if (playerValue > 21) {
        endMessage.textContent = "Bust! You lose!";
        endMessage.style.color = "red";
        hitButton.style.display = "none";
        standButton.style.display = "none";
        resetButton.style.display = "inline";
        return;
    }

    // Draw cards for the dealer
    let dealerValue = calculateHandValue(dealerHand);

    while (dealerValue < 17) {
        dealerHand.push(generateUniqueCard());
        dealerValue = calculateHandValue(dealerHand);
    }

    // Display dealer's hand
    dealerDiv.innerHTML = "";
    for (card of dealerHand) {
        let dealerImg = document.createElement("img");
        dealerImg.src = `img/cards/${card.name}.png`;
        dealerDiv.append(dealerImg);
    }

    dealerValueDisplay.textContent = `Hand Value: ${dealerValue}`;

    // Decide game outcome
    if (dealerValue > 21 || dealerValue < playerValue) {
        endMessage.textContent = "You win!";
        endMessage.style.color = "green";
    } else if (dealerValue > playerValue) {
        endMessage.textContent = "Dealer wins! You lose!";
        endMessage.style.color = "red";
    } else {
        endMessage.textContent = "Tie!";
        endMessage.style.color = "gray";
    }

    // Hide hit and stand buttons and show reset button
    hitButton.style.display = "none";
    standButton.style.display = "none";
    resetButton.style.display = "inline";
}

// Calculates the total value of a hand, taking aces into account
function calculateHandValue(hand) {
    let totalValue = 0;
    let aceCount = 0;
    for (card of hand) {
        // Check value of cards (special case for aces)
        totalValue += card.value;
        if (card.name.startsWith("ace")) {
            aceCount++;
        }
    }

    // Swap aces to 1 if necessary
    while (aceCount > 0 && totalValue > 21) {
        totalValue -= 10;
        aceCount--;
    }

    return totalValue;
}

// Generates a unique card not in the dealer or player's hand
function generateUniqueCard() {
    let card;

    do {
        card = deck[Math.floor(Math.random() * 52)]
    } while(dealerHand.includes(card) || playerHand.includes(card));

    return card;
}