document.addEventListener("DOMContentLoaded", function () {
  // State management
  let state = {
    preference: "",
    people: 2,
    recipes: 5,
    costPerServing: 22,
  };

  // Initialize UI
  updateUI();

  // Preference card selection
  document.querySelectorAll(".preference-card").forEach((card) => {
    card.addEventListener("click", function () {
      document
        .querySelectorAll(".preference-card")
        .forEach((c) => c.classList.remove("selected"));
      this.classList.add("selected");
      state.preference = this.dataset.preference;
    });
  });

  // Number selection (people and recipes)
  document.querySelectorAll(".number-option").forEach((option) => {
    option.addEventListener("click", function () {
      // Find all options in the same group (people or recipes)
      const parent = this.closest(".number-selector");
      const value = parseInt(this.dataset.value);

      // Remove selected class from all options in this group
      parent.querySelectorAll(".number-option").forEach((opt) => {
        opt.classList.remove("selected");
      });

      // Add selected class to clicked option
      this.classList.add("selected");

      // Update state based on which group was clicked
      if (
        parent
          .closest(".plan-section")
          .querySelector("label")
          .textContent.includes("people")
      ) {
        state.people = value;
      } else {
        state.recipes = value;
      }

      updateUI();
    });
  });

  // Continue button
  document
    .getElementById("continue-btn")
    .addEventListener("click", function () {
      if (!state.preference) {
        alert("Please select your meal preference");
        return;
      }
      // Redirect to recipes page
      window.location.href = "/recipes.html";
    });

  // Update UI based on state
  function updateUI() {
    const totalServings = state.people * state.recipes;
    const weeklyTotal = totalServings * state.costPerServing;
    const vat = weeklyTotal * 0.05;
    const finalTotal = weeklyTotal + vat;

    document.getElementById("recipe-count").textContent = state.recipes;
    document.getElementById("people-count").textContent = state.people;
    document.getElementById("total-servings").textContent = totalServings;
    document.getElementById("weekly-total").textContent = `AED ${weeklyTotal}`;
    document.getElementById("vat").textContent = `AED ${vat.toFixed(2)}`;
    document.getElementById(
      "final-total"
    ).textContent = `AED ${finalTotal.toFixed(2)}`;

    // Set initial selections
    document.querySelectorAll(".number-selector").forEach((selector) => {
      const isForPeople = selector
        .closest(".plan-section")
        .querySelector("label")
        .textContent.includes("people");
      const value = isForPeople ? state.people : state.recipes;

      selector.querySelectorAll(".number-option").forEach((option) => {
        option.classList.remove("selected");
        if (parseInt(option.dataset.value) === value) {
          option.classList.add("selected");
        }
      });
    });
  }
});
