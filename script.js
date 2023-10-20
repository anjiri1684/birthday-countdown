let birthdayDate;

document.getElementById("start-countdown").addEventListener("click", function () {
    const inputDate = document.getElementById("birthday-input").value;

    if (!isValidDate(inputDate)) {
        alert("Please enter a valid date (YYYY-MM-DD).");
        return;
    }

    birthdayDate = new Date(inputDate + "T14:03:00").getTime();
    document.querySelector(".input-container").style.display = "none"; // Hide input fields
    updateCountdown();
});

function updateCountdown() {
    const countdownElement = document.getElementById("countdown");
    const currentDate = new Date().getTime();
    const timeLeft = birthdayDate - currentDate;

    if (timeLeft <= 0) {
        // Birthday has passed
        countdownElement.innerHTML = "<h2>Happy Birthday!</h2>";

        // Trigger confetti effect
        confettiEffect();
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days.toString().padStart(2, '0');
    document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');

    // Update the countdown every second
    setTimeout(updateCountdown, 1000);
}

// Function to validate the date format
function isValidDate(dateString) {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regEx)) return false; // Invalid format
    const d = new Date(dateString + "T00:00:00");
    return !isNaN(d.getTime());
}

function confettiEffect() {
  const Confettiful = function (el) {
    this.el = el;
    this.containerEl = null;

    this.confettiFrequency = 3;
    this.confettiColors = ['#fce18a', '#ff726d', '#b48def', '#f4306d'];
    this.confettiAnimations = ['slow', 'medium', 'fast'];

    this._renderConfetti();
  };


  Confettiful.prototype._renderConfetti = function () {
    const confettiContanier = document.getElementById("confetti");
    this.confettiInterval = setInterval(() => {
      const confettiEl = document.createElement('div');
      const confettiSize = Math.floor(Math.random() * 3) + 7 + 'px';
      const confettiBackground = this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)];
      const confettiLeft = Math.floor(Math.random() * this.el.offsetWidth) + 'px';
      const confettiAnimation = this.confettiAnimations[Math.floor(Math.random() * this.confettiAnimations.length)];

      confettiEl.classList.add('confetti', 'confetti--animation-' + confettiAnimation);
      confettiEl.style.left = confettiLeft;
      confettiEl.style.width = confettiSize;
      confettiEl.style.height = confettiSize;
      confettiEl.style.backgroundColor = confettiBackground;

      confettiEl.removeTimeout = setTimeout(function () {
        confettiEl.parentNode.removeChild(confettiEl);
      }, 3000);

      confettiContanier.appendChild(confettiEl);
    }, 25);
  };

  window.confettiful = new Confettiful(document.querySelector('.container'));
}