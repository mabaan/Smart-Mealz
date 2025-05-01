document.addEventListener("DOMContentLoaded", function () {
  // Initialize carousels
  const carousels = document.querySelectorAll(".meal-carousel");

  carousels.forEach((carousel) => {
    const section = carousel.id.split("-")[0];
    const prevBtn = document.querySelector(
      `.carousel-control.prev[data-section="${section}"]`
    );
    const nextBtn = document.querySelector(
      `.carousel-control.next[data-section="${section}"]`
    );

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener("click", () => {
        carousel.scrollBy({ left: -320, behavior: "smooth" });
      });

      nextBtn.addEventListener("click", () => {
        carousel.scrollBy({ left: 320, behavior: "smooth" });
      });
    }
  });

  // Meal selection handling
  let selectedMeals = new Set();
  const maxMeals = 5;

  document.querySelectorAll(".meal-checkbox input").forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const mealCard = this.closest(".meal-card");
      const mealName = mealCard.querySelector("h3").textContent;

      if (this.checked) {
        if (selectedMeals.size >= maxMeals) {
          this.checked = false;
          alert(`You can only select up to ${maxMeals} meals`);
          return;
        }
        selectedMeals.add(mealName);
      } else {
        selectedMeals.delete(mealName);
      }

      updateOrderSummary();
    });
  });

  // Quantity controls
  document.querySelectorAll(".quantity-control").forEach((control) => {
    const minusBtn = control.querySelector(".minus");
    const plusBtn = control.querySelector(".plus");
    const qtyValue = control.querySelector(".qty-value");

    let quantity = 1;

    minusBtn.addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        qtyValue.textContent = quantity;
        updateOrderSummary();
      }
    });

    plusBtn.addEventListener("click", () => {
      if (quantity < 5) {
        quantity++;
        qtyValue.textContent = quantity;
        updateOrderSummary();
      }
    });
  });

  // Category filtering
  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .querySelectorAll(".category-btn")
        .forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      const category = this.textContent.toLowerCase();
      filterMeals(category);
    });
  });

  function filterMeals(category) {
    const allMealCards = document.querySelectorAll(".meal-card");

    if (category === "all") {
      allMealCards.forEach((card) => (card.style.display = "block"));
      return;
    }

    allMealCards.forEach((card) => {
      const mealCategory = card.dataset.category;
      card.style.display = mealCategory === category ? "block" : "none";
    });
  }

  function updateOrderSummary() {
    const summaryContent = document.querySelector(".selected-meals");
    summaryContent.innerHTML = "";

    selectedMeals.forEach((mealName) => {
      const mealCard = document
        .querySelector(`.meal-card h3[text="${mealName}"]`)
        .closest(".meal-card");
      const quantity = mealCard.querySelector(".qty-value").textContent;

      const mealElement = document.createElement("div");
      mealElement.className = "selected-meal";
      mealElement.innerHTML = `
                <img src="${
                  mealCard.querySelector(".meal-image").src
                }" alt="${mealName}" class="summary-image">
                <div class="meal-details">
                    <h4>${mealName}</h4>
                    <span class="quantity">Qty: ${quantity}</span>
                </div>
                <button class="remove-meal" onclick="removeMeal('${mealName}')">×</button>
            `;

      summaryContent.appendChild(mealElement);
    });

    document.querySelector(
      ".summary-total"
    ).textContent = `Selected: ${selectedMeals.size} of ${maxMeals} meals`;
  }

  // Global function for removing meals
  window.removeMeal = function (mealName) {
    selectedMeals.delete(mealName);
    const checkbox = document
      .querySelector(`.meal-card h3[text="${mealName}"]`)
      .closest(".meal-card")
      .querySelector(".meal-checkbox input");
    checkbox.checked = false;
    updateOrderSummary();
  };
});
