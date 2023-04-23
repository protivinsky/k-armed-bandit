let totalScore = 0;
let roundsPlayed = 0;
const maxRounds = 10; // You can change this to any number of rounds
let lastPulledBandit = null; // Add this line to keep track of the last pulled bandit

async function pullBandit(bandit) {
    if (roundsPlayed >= maxRounds) {
        alert('Maximum rounds reached');
        return;
    }

    const response = await fetch('/pull_bandit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bandit }),
    });
    const data = await response.json();
    const value = data.value;

    // Clear the displayed values of other bandits
    for (const otherBandit of ['A', 'B', 'C']) {
        if (otherBandit !== bandit) {
            document.querySelector(`#${otherBandit} .bandit-rectangle`).textContent = '';
        }
    }

    // Reset the border color of the last pulled bandit (if any) to black
    if (lastPulledBandit) {
        document.querySelector(`#${lastPulledBandit} .bandit-rectangle`).style.borderColor = 'black';
    }

    // Update the last pulled bandit
    lastPulledBandit = bandit;

    // Change the border color of the last pulled bandit's rectangle to red
    document.querySelector(`#${bandit} .bandit-rectangle`).style.borderColor = 'red';

    document.querySelector(`#${bandit} .bandit-rectangle`).textContent = value;
    totalScore += value;
    document.querySelector('#total-score').textContent = totalScore;
    roundsPlayed++;

    // Update the current round display
    document.querySelector('#current-round').textContent = roundsPlayed;
}

// Function to set the initial total rounds display
function initializeTotalRounds() {
    document.querySelector('#total-rounds').textContent = maxRounds;
}

// Call the initializeTotalRounds function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeTotalRounds);
