/* =======================Meals & Recipes============================ */
const mealsRecipes = document.getElementById("mealsRecipes");
const mainSection = document.getElementById("main-section");
const mainDetails = document.getElementById("meal-details");
const mealsRecipesContent = document.getElementById("mealsRecipesContent");
const categoriesGrid = document.getElementById("categories-grid");
const recipesGrid = document.getElementById("recipes-grid");
const categoriesArea = document.getElementById("categories-area");
const listViewBtn = document.getElementById("list-view-btn");
const gridViewBtn = document.getElementById("grid-view-btn");
const recipesCount = document.getElementById("recipes-count");
const searchInput = document.getElementById("search-input");
const ingredientsList = document.getElementById("ingredientsList");
const instructionsList = document.getElementById("instructionsList");
const logMealModalBg = document.getElementById("log-meal-modal-Bg");
const loadingSpiner = `<div class="flex items-center justify-center py-12"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div></div>`;
/* =======================Product Scanner============================ */
const productScanner = document.getElementById("productScanner");
const productSection = document.getElementById("products-section");
const productsGrid = document.getElementById("products-grid");
const searchProductBtn = document.getElementById("search-product-btn");
const productSearchInput = document.getElementById("product-search-input");
const productCategories = document.getElementById("product-categories");
const lookupBarcodeBtn = document.getElementById("lookup-barcode-btn");
const barcodeInput = document.getElementById("barcode-input");
const productDetailModal = document.getElementById("product-detail-modal");
const productDetailModalContent = document.getElementById("all-detail-product-content");
/* =======================Food Log============================ */
const foodLog = document.getElementById("foodLog");
const foodSection = document.getElementById("foodlog-section");
const loggedItemsList = document.getElementById("logged-items-list");
/* =======================SideBar & Navigation============================ */
listViewBtn.addEventListener("click", function () {
  listViewBtn.classList.add("bg-white", "rounded-md", "shadow-sm");
  gridViewBtn.classList.remove("bg-white", "rounded-md", "shadow-sm");
  recipesGrid.classList.remove("grid-cols-4", "gap-5");
  recipesGrid.classList.add("grid-cols-2", "gap-4");
});

gridViewBtn.addEventListener("click", function () {
  gridViewBtn.classList.add("bg-white", "rounded-md", "shadow-sm");
  listViewBtn.classList.remove("bg-white", "rounded-md", "shadow-sm");
  recipesGrid.classList.add("grid-cols-4", "gap-5");
  recipesGrid.classList.remove("grid-cols-2", "gap-4");
});

mealsRecipes.addEventListener("click", function () {
  mainSection.classList.remove("hidden");
  mealsRecipes.classList.remove("hover:bg-gray-50", "text-gray-600");
  mealsRecipes.classList.add("bg-emerald-50", "text-emerald-700");

  productSection.classList.add("hidden");
  productScanner.classList.add("hover:bg-gray-50", "text-gray-600");
  productScanner.classList.remove("bg-emerald-50", "text-emerald-700");

  foodSection.classList.add("hidden");
  foodLog.classList.add("hover:bg-gray-50", "text-gray-600");
  foodLog.classList.remove("bg-emerald-50", "text-emerald-700");

  window.history.pushState({}, '', '/home');
});


productScanner.addEventListener("click", function () {
  productSection.classList.remove("hidden");
  productScanner.classList.remove("hover:bg-gray-50", "text-gray-600");
  productScanner.classList.add("bg-emerald-50", "text-emerald-700");

  mainSection.classList.add("hidden");
  mealsRecipes.classList.add("hover:bg-gray-50", "text-gray-600");
  mealsRecipes.classList.remove("bg-emerald-50", "text-emerald-700");

  foodSection.classList.add("hidden");
  foodLog.classList.add("hover:bg-gray-50", "text-gray-600");
  foodLog.classList.remove("bg-emerald-50", "text-emerald-700");
  window.history.pushState({}, '', '/products');
});

foodLog.addEventListener("click", function () {
  foodSection.classList.remove("hidden");
  foodLog.classList.remove("hover:bg-gray-50", "text-gray-600");
  foodLog.classList.add("bg-emerald-50", "text-emerald-700");

  mainSection.classList.add("hidden");
  mealsRecipes.classList.add("hover:bg-gray-50", "text-gray-600");
  mealsRecipes.classList.remove("bg-emerald-50", "text-emerald-700");

  productSection.classList.add("hidden");
  productScanner.classList.add("hover:bg-gray-50", "text-gray-600");
  productScanner.classList.remove("bg-emerald-50", "text-emerald-700");

  window.history.pushState({}, '', '/foodlog');
});
/* =================================================== */

/* ===================================Categories Meal Api======================================== */

/* ====================Search Input Meals & Recipes=============================== */
searchInput.addEventListener('input', function (e) {
  const searchValue = e.target.value;
  allRecipes("", "", searchValue);
});
/* =================================================== */

/* ======================Categories Api Area============================= */
async function categoriesByArea() {
  try {
    categoriesArea.innerHTML = loadingSpiner;
    let response = await fetch('https://nutriplan-api.vercel.app/api/meals/areas');
    if (response.ok) {
      let dataCategoriesByArea = await response.json();
      let box = `
                <button data-category="" id="allRecipesBtn" class="areaBtn px-4 py-2 bg-emerald-600 text-white rounded-full font-medium text-sm whitespace-nowrap hover:bg-emerald-700 transition-all">
                All Recipes
                </button>
            `;
      for (let categoryArea of dataCategoriesByArea.results) {
        box += `
                    <button data-category="${categoryArea.name}" class="areaBtn px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all">
                    ${categoryArea.name}
                    </button>
                `;
      }
      categoriesArea.innerHTML = box;
    }

    const areaBtn = document.querySelectorAll(".areaBtn");
    areaBtn.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const indexDataCategoryArea = this.getAttribute("data-category");
        allRecipes("", indexDataCategoryArea);

        areaBtn.forEach(function (btn) {
          btn.classList.remove("bg-emerald-600", "text-white", "hover:bg-emerald-700");
          btn.classList.add("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
        });
        this.classList.remove("bg-gray-100", "text-gray-700", "hover:bg-gray-200");
        this.classList.add("bg-emerald-600", "text-white", "hover:bg-emerald-700");
      });
    });
  } catch (error) {
    categoriesArea.innerHTML = `
            <div class="flex flex-col items-center justify-center py-12 text-center">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
                </div>
                <p class="text-gray-500 text-lg">No recipes found</p>
                <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
            </div>
        `;
  }
}
/* =================================================== */

/* ========================Categories Api Meal=========================== */
async function categoriesByMeal() {
  try {
    categoriesArea.innerHTML = loadingSpiner;
    let response = await fetch('https://nutriplan-api.vercel.app/api/meals/categories');
    if (response.ok) {
      let datacCategoriesByMeal = await response.json();
      let box = "";
      let mealsColors = "";
      let iconMelas = "";
      let iconColor = "";

      for (let categoryMeal of datacCategoriesByMeal.results) {
        switch (categoryMeal.name) {
          case "Beef":
            mealsColors = "from-red-50 to-rose-50 border-red-200 hover:border-red-400";
            iconMelas = "fa-drumstick-bite";
            iconColor = "from-red-400 to-rose-500";
            break;
          case "Chicken":
            mealsColors = "from-amber-50 to-orange-50  border-amber-200 hover:border-amber-400";
            iconMelas = "fa-drumstick-bite";
            iconColor = "from-amber-400 to-orange-500";
            break;
          case "Dessert":
            mealsColors = "bg-gradient-to-br from-pink-50 to-rose-50  border-pink-200 hover:border-pink-400";
            iconMelas = "fa-cake-candles";
            iconColor = "from-pink-400 to-rose-500";
            break;
          case "Lamb":
            mealsColors = "from-amber-50 to-orange-50  border-amber-200 hover:border-amber-400";
            iconMelas = "fa-drumstick-bite";
            iconColor = "from-amber-400 to-orange-500";
            break;
          case "Miscellaneous":
            mealsColors = "bg-gradient-to-br from-slate-50 to-gray-50  border-slate-200 hover:border-slate-400 ";
            iconMelas = "fa-bowl-rice";
            iconColor = "from-slate-400 to-gray-500";
            break;
          case "Pasta":
            mealsColors = "from-amber-50 to-orange-50  border-amber-200 hover:border-amber-400";
            iconMelas = "fa-bowl-food";
            iconColor = "from-amber-400 to-orange-500";
            break;
          case "Pork":
            mealsColors = "from-red-50 to-rose-50  border-red-200 hover:border-red-400";
            iconMelas = "fa-bacon";
            iconColor = "from-red-400 to-rose-500";
            break;
          case "Seafood":
            mealsColors = "bg-gradient-to-br from-cyan-50 to-blue-50  border-cyan-200 hover:border-cyan-400 ";
            iconMelas = "fa-fish";
            iconColor = "from-cyan-400 to-blue-500";
            break;
          case "Side":
            mealsColors = "from-emerald-50 to-teal-50  border-emerald-200 hover:border-emerald-400";
            iconMelas = "fa-plate-wheat";
            iconColor = "from-green-400 to-emerald-500";
            break;
          case "Starter":
            mealsColors = "bg-gradient-to-br from-cyan-50 to-blue-50  border-cyan-200 hover:border-cyan-400";
            iconMelas = "fa-utensils";
            iconColor = "from-cyan-400 to-blue-500";
            break;
          case "Vegan":
            mealsColors = "from-emerald-50 to-teal-50  border-emerald-200 hover:border-emerald-400";
            iconMelas = "fa-leaf";
            iconColor = "from-green-400 to-emerald-500";
            break;
          case "Vegetarian":
            mealsColors = "bg-gradient-to-br from-lime-50 to-green-50  border-lime-200 hover:border-lime-400 ";
            iconMelas = "fa-seedling";
            iconColor = "from-lime-400 to-green-500";
            break;
          case "Breakfast":
            mealsColors = "from-amber-50 to-orange-50  border-amber-200 hover:border-amber-400";
            iconMelas = "fa-utensils";
            iconColor = "from-amber-400 to-orange-500";
            break;
          case "Goat":
            mealsColors = "from-red-50 to-rose-50  border-red-200 hover:border-red-400";
            iconMelas = "fa-drumstick-bite";
            iconColor = "from-red-400 to-rose-500";
            break;
          default:
            mealsColors = "bg-gradient-to-br from-emerald-50 to-teal-50  border-emerald-200 hover:border-emerald-400";
            iconMelas = "fa-drumstick-bite";
            iconColor = "from-emerald-400 to-green-500";
            break;
        }
        box += `
           <div class="category-card ${mealsColors} bg-gradient-to-br  rounded-xl p-3 border hover:shadow-md cursor-pointer transition-all group" data-category="${categoryMeal.name}">
                <div class="flex items-center gap-2.5">
                   <div class="text-white w-9 h-9 bg-gradient-to-br ${iconColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                         <i class="fa-solid ${iconMelas}"></i>
                            </div>
                            <div>
                                <h3 class="text-sm font-bold text-gray-900">${categoryMeal.name}</h3>
                            </div>
                        </div>
                    </div>
                `;
      }
      categoriesGrid.innerHTML = box;
    }
    const mealBtn = document.querySelectorAll(".category-card");
    mealBtn.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const indexDataCategoryMeal = this.getAttribute("data-category");
        allRecipes(indexDataCategoryMeal, "");
      });
    });
  } catch (error) {
    categoriesGrid.innerHTML = `
            <div class="flex flex-col items-center justify-center py-12 text-center">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
                </div>
                <p class="text-gray-500 text-lg">No recipes found</p>
                <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
            </div>
        `;
  }
}
/* =================================================== */

/* ==========================All Recipes and Nutrition Facts========================= */
async function allRecipes(indexDataCategoryMeal, indexDataCategoryArea, searchValue) {
  try {
    categoriesArea.innerHTML = loadingSpiner;
    let apiUrl;

    if (indexDataCategoryArea && indexDataCategoryArea !== "") {
      apiUrl = `https://nutriplan-api.vercel.app/api/meals/filter?area=${indexDataCategoryArea}`;
    } else if (indexDataCategoryMeal && indexDataCategoryMeal !== "") {
      apiUrl = `https://nutriplan-api.vercel.app/api/meals/filter?category=${indexDataCategoryMeal}`;
    } else if (searchValue && searchValue !== "") {
      apiUrl = `https://nutriplan-api.vercel.app/api/meals/search?q=${searchValue}`;
    } else {
      apiUrl = `https://nutriplan-api.vercel.app/api/meals/search?q=chicken&page=1&limit=25`;
    }

    let response = await fetch(apiUrl);
    if (response.ok) {
      let datacRecipes = await response.json();
      let box = "";

      for (let i = 0; i < datacRecipes.results.length; i++) {
        let categoryRecipes = datacRecipes.results[i];
        recipesCount.innerText = `Showing ${i + 1} recipes`;
        box += `
          <div class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group" data-meal-id="${categoryRecipes.id}" data-index="${i}">
              <div class="relative h-48 overflow-hidden">
            <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="${categoryRecipes.thumbnail}" alt="${categoryRecipes.name}" loading="lazy" />
                <div class="absolute bottom-3 left-3 flex gap-2">
                   <span class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700">${categoryRecipes.category}</span>
                  <span class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white">${categoryRecipes.area}</span>
                      </div>
                        </div>
                        <div class="p-4">
                            <h3 class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">${categoryRecipes.name}</h3>
                            <p class="text-xs text-gray-600 mb-3 line-clamp-2">${categoryRecipes.instructions}</p>
                            <div class="flex items-center justify-between text-xs">
                                <span class="font-semibold text-gray-900"><i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>${categoryRecipes.category}</span>
                                <span class="font-semibold text-gray-500"><i class="fa-solid fa-globe text-blue-500 mr-1"></i>${categoryRecipes.area}</span>
                            </div>
                        </div>
                    </div>
                `;
      }

      recipesGrid.innerHTML = box;

      const recipeCards = document.querySelectorAll(".recipe-card");
      recipeCards.forEach(function (card) {
        card.addEventListener("click", function () {
          const index = this.getAttribute("data-index");
          let currentNutrition = null;
          mainDetails.classList.remove("hidden");
          mealsRecipesContent.classList.add("hidden");
          let nutritionDataId = datacRecipes.results[index].id;
          getNutritionData(nutritionDataId);
          let videoUrl = datacRecipes.results[index].youtube.replace("watch?v=", "embed/");

          mainDetails.innerHTML = `
                        <div class="max-w-7xl mx-auto">
                            <button id="back-to-meals-btn" class="flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium mb-6 transition-colors">
                                <i class="fa-solid fa-arrow-left"></i>
                                <span>Back to Recipes</span>
                            </button>
                            <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                                <div class="relative h-80 md:h-96">
                                    <img src="${datacRecipes.results[index].thumbnail}" alt="${datacRecipes.results[index].name}" class="w-full h-full object-cover" />
                                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                    <div class="absolute bottom-0 left-0 right-0 p-8">
                                        <div class="flex items-center gap-3 mb-3">
                                            <span class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full">${datacRecipes.results[index].category}</span>
                                            <span class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">${datacRecipes.results[index].area}</span>
                                            <span class="px-3 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full ${datacRecipes.results[index].tags?.length ? '' : 'hidden'}">${datacRecipes.results[index].tags}</span>
                                        </div>
                                        <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">${datacRecipes.results[index].name}</h1>
                                        <div class="flex items-center gap-6 text-white/90">
                                            <span class="flex items-center gap-2"><i class="fa-solid fa-clock"></i><span>30 min</span></span>
                                            <span class="flex items-center gap-2"><i class="fa-solid fa-utensils"></i><span id="hero-servings">4 servings</span></span>
                                            <span class="flex items-center gap-2"><i class="fa-solid fa-fire"></i><span id="hero-calories"> cal/serving</span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-wrap gap-3 mb-8">
                                <button id="log-meal-btn" class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all" data-meal-id="${datacRecipes.results[index].id}">
                                    <i class="fa-solid fa-clipboard-list"></i>
                                    <span>Log This Meal</span>
                                </button>
                            </div>
                            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div class="lg:col-span-2 space-y-8">
                                    <div class="bg-white rounded-2xl shadow-lg p-6">
                                        <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <i class="fa-solid fa-list-check text-emerald-600"></i>
                                            Ingredients
                                            <span class="text-sm font-normal text-gray-500 ml-auto">${datacRecipes.results[index].ingredients.length} items</span>
                                        </h2>
                                        <div id="ingredientsList" class="grid grid-cols-1 md:grid-cols-2 gap-3"></div>
                                    </div>
                                    <div class="bg-white rounded-2xl shadow-lg p-6">
                                        <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><i class="fa-solid fa-shoe-prints text-emerald-600"></i>Instructions</h2>
                                        <div id="instructionsList" class="space-y-4"></div>
                                    </div>
                                    <div class="bg-white rounded-2xl shadow-lg p-6">
                                        <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><i class="fa-solid fa-video text-red-500"></i>Video Tutorial</h2>
                                        <div class="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                                            <iframe src="${videoUrl}" class="absolute inset-0 w-full h-full" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                        </div>
                                    </div>
                                </div>
                                <div class="space-y-6">
                                    <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                                        <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><i class="fa-solid fa-chart-pie text-emerald-600"></i>Nutrition Facts</h2>
                                        <div id="nutrition-facts-container"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;

          const logMealBtn = document.getElementById("log-meal-btn");
          logMealBtn.addEventListener("click", async function () {
            logMealModalBg.classList.remove("hidden");
            currentNutrition = await getNutritionData(nutritionDataId);
            if (currentNutrition) {
              document.getElementById("modal-calories").innerText = currentNutrition.calories;
              document.getElementById("modal-protein").innerText = currentNutrition.protein + "g";
              document.getElementById("modal-carbs").innerText = currentNutrition.carbs + "g";
              document.getElementById("modal-fat").innerText = currentNutrition.fat + "g";
            }
          });

          const logMealModal = document.getElementById("logMealModel");
          logMealModal.innerHTML = `
                        <div class="flex items-center gap-4 mb-6">
                            <img src="${datacRecipes.results[index].thumbnail}" alt="${datacRecipes.results[index].name}" class="w-16 h-16 rounded-xl object-cover">
                            <div>
                                <h3 class="text-xl font-bold text-gray-900">Log This Meal</h3>
                                <p class="text-gray-500 text-sm">${datacRecipes.results[index].name}</p>
                            </div>
                        </div>
                        <div class="mb-6">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Number of Servings</label>
                            <div class="flex items-center gap-3">
                                <button id="decrease-servings" class="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"><i class="fa-solid fa-minus text-gray-600"></i></button>
                                <input type="number" id="meal-servings" value="1" min="0.5" max="10" step="0.5" class="w-20 text-center text-xl font-bold border-2 border-gray-200 rounded-lg py-2">
                                <button id="increase-servings" class="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"><i class="fa-solid fa-plus text-gray-600"></i></button>
                            </div>
                        </div>
                        <div class="bg-emerald-50 rounded-xl p-4 mb-6">
                            <p class="text-sm text-gray-600 mb-2">Estimated nutrition per serving:</p>
                            <div class="grid grid-cols-4 gap-2 text-center">
                                <div><p class="text-lg font-bold text-emerald-600" id="modal-calories"></p><p class="text-xs text-gray-500">Calories</p></div>
                                <div><p class="text-lg font-bold text-blue-600" id="modal-protein">g</p><p class="text-xs text-gray-500">Protein</p></div>
                                <div><p class="text-lg font-bold text-amber-600" id="modal-carbs">g</p><p class="text-xs text-gray-500">Carbs</p></div>
                                <div><p class="text-lg font-bold text-purple-600" id="modal-fat">g</p><p class="text-xs text-gray-500">Fat</p></div>
                            </div>
                        </div>
                        <div class="flex gap-3">
                            <button id="cancel-log-meal" class="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">Cancel</button>
                            <button id="confirm-log-meal" class="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all">
                                <span class="mr-2"><i class="fa-solid fa-clipboard-list"></i></span>Log Meal
                            </button>
                        </div>
                    `;

          const cancelLogMealBtn = document.getElementById("cancel-log-meal");
          cancelLogMealBtn.addEventListener("click", function () {
            logMealModalBg.classList.add("hidden");
          });

          const mealServings = document.getElementById('meal-servings');
          const decreaseBtn = document.getElementById('decrease-servings');
          const increaseBtn = document.getElementById('increase-servings');

          increaseBtn.addEventListener('click', function () {
            let currentValue = +mealServings.value;
            mealServings.value = currentValue + 0.5;
          });

          decreaseBtn.addEventListener('click', function () {
            let currentValue = +mealServings.value;
            if (currentValue > 1) {
              mealServings.value = currentValue - 0.5;
            }
          });

          const confirmLogMealBtn = document.getElementById('confirm-log-meal');
          confirmLogMealBtn.addEventListener('click', function () {
            if (!currentNutrition) return;
            const servings = +mealServings.value || 1;
            const currentTime = new Date().toLocaleTimeString();

            loggedItemsList.innerHTML += `
                            <div class="flex items-center justify-between bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all">
                                <div class="flex items-center gap-4">
                                    <img src="${datacRecipes.results[index].thumbnail}" alt="${datacRecipes.results[index].name}" class="w-14 h-14 rounded-xl object-cover">
                                    <div>
                                        <p class="font-semibold text-gray-900">${datacRecipes.results[index].name}</p>
                                        <p class="text-sm text-gray-500">${servings} serving${servings > 1 ? 's' : ''}<span class="mx-1">•</span><span class="text-emerald-600">Recipe</span></p>
                                        <p class="text-xs text-gray-400 mt-1">${currentTime}</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-4">
                                    <div class="text-right">
                                        <p class="text-lg font-bold text-emerald-600">${currentNutrition.calories * servings}</p>
                                        <p class="text-xs text-gray-500">kcal</p>
                                    </div>
                                    <div class="hidden md:flex gap-2 text-xs text-gray-500">
                                        <span class="px-2 py-1 bg-blue-50 rounded">${currentNutrition.protein * servings}g P</span>
                                        <span class="px-2 py-1 bg-amber-50 rounded">${currentNutrition.carbs * servings}g C</span>
                                        <span class="px-2 py-1 bg-purple-50 rounded">${currentNutrition.fat * servings}g F</span>
                                    </div>
                                    <button class="remove-foodlog-item text-gray-400 hover:text-red-500 transition-all p-2"><i class="fa-solid fa-trash-can"></i></button>
                                </div>
                            </div>
                        `;
            logMealModalBg.classList.add("hidden");
          });

          let IngredientsBox = "";
          for (let categoryIngredients of datacRecipes.results[index].ingredients) {
            IngredientsBox += `
                            <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
                                <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300" />
                                <span class="text-gray-700"><span class="font-medium text-gray-900">${categoryIngredients.measure}</span> ${categoryIngredients.ingredient}</span>
                            </div> 
                        `;
          }
          document.getElementById("ingredientsList").innerHTML = IngredientsBox;

          let instructionsBox = "";
          for (let j = 0; j < datacRecipes.results[index].instructions.length; j++) {
            instructionsBox += `
                            <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                                <div class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">${j + 1}</div>
                                <p class="text-gray-700 leading-relaxed pt-2">${datacRecipes.results[index].instructions[j]}</p>
                            </div>
                        `;
          }
          document.getElementById("instructionsList").innerHTML = instructionsBox;

          const backMealsBtn = document.getElementById("back-to-meals-btn");
          backMealsBtn.addEventListener("click", function () {
            mainDetails.classList.add("hidden");
            mealsRecipesContent.classList.remove("hidden");
          });
        });
      });
    }
  } catch (error) {
    recipesGrid.innerHTML = `
            <div class="flex flex-col items-center justify-center py-12 text-center">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
                </div>
                <p class="text-gray-500 text-lg">No recipes found</p>
                <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
            </div>
        `;
  }
}
/* =================================================== */

/* =======================Nutrition Data Api============================ */
async function getNutritionData(nutritionDataId) {
  try {
    let dataIngredients = await fetch(`https://nutriplan-api.vercel.app/api/meals/${nutritionDataId}`);
    let apiIngredients = await dataIngredients.json();
    let ingredientsList2 = apiIngredients.result.ingredients;

    let formatIngredients = [];
    for (let i = 0; i < ingredientsList2.length; i++) {
      let itemsNutritionData = ingredientsList2[i].measure + ' ' + ingredientsList2[i].ingredient;
      formatIngredients.push(itemsNutritionData);
    }

    let response = await fetch(`https://nutriplan-api.vercel.app/api/nutrition/analyze`, {
      method: 'POST',
      headers: {
        'x-api-key': '1QGqFSI0lKzPHlixYEWesti1F1dw0lUuvmrPlNic',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        recipeName: apiIngredients.result.name,
        ingredients: formatIngredients
      })
    });

    if (response.ok) {
      let resultData = await response.json();
      let allDataNutrition = resultData.data.perServing;

      const nutritionFactsContainer = document.getElementById("nutrition-facts-container");
      nutritionFactsContainer.innerHTML = `
                <p class="text-sm text-gray-500 mb-4">Per serving</p>
                <div class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl">
                    <p class="text-sm text-gray-600">Calories per serving</p>
                    <p class="text-4xl font-bold text-emerald-600">${allDataNutrition.calories}</p>
                    <p class="text-xs text-gray-500 mt-1">Total: ${allDataNutrition.calories * 4} cal</p>
                </div>
                <div class="space-y-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-emerald-500"></div><span class="text-gray-700">Protein</span></div>
                        <span class="font-bold text-gray-900">${allDataNutrition.protein}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2"><div class="bg-emerald-500 h-2 rounded-full" style="width: ${Math.min(allDataNutrition.protein, 100)}%"></div></div>
                    
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-blue-500"></div><span class="text-gray-700">Carbs</span></div>
                        <span class="font-bold text-gray-900">${allDataNutrition.carbs}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2"><div class="bg-blue-500 h-2 rounded-full" style="width: ${Math.min(allDataNutrition.carbs, 100)}%"></div></div>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-purple-500"></div><span class="text-gray-700">Fat</span></div>
                        <span class="font-bold text-gray-900">${allDataNutrition.fat}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2"><div class="bg-purple-500 h-2 rounded-full" style="width: ${Math.min(allDataNutrition.fat, 100)}%"></div></div>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-orange-500"></div><span class="text-gray-700">Fiber</span></div>
                        <span class="font-bold text-gray-900">${allDataNutrition.fiber}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2"><div class="bg-orange-500 h-2 rounded-full" style="width: ${Math.min(allDataNutrition.fiber, 100)}%"></div></div>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-pink-500"></div><span class="text-gray-700">Sugar</span></div>
                        <span class="font-bold text-gray-900">${allDataNutrition.sugar}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2"><div class="bg-pink-500 h-2 rounded-full" style="width: ${Math.min(allDataNutrition.sugar, 100)}%"></div></div>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-red-500"></div><span class="text-gray-700">Saturated Fat</span></div>
                        <span class="font-bold text-gray-900">${allDataNutrition.saturatedFat}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2"><div class="bg-red-500 h-2 rounded-full" style="width: ${Math.min(allDataNutrition.saturatedFat, 100)}%"></div></div>
                </div>
                <div class="mt-6 pt-6 border-t border-gray-100">
                    <h3 class="text-sm font-semibold text-gray-900 mb-3">Other</h3>
                    <div class="grid grid-cols-2 gap-3 text-sm">
                        <div class="flex justify-between"><span class="text-gray-600">Cholesterol</span><span class="font-medium">${allDataNutrition.cholesterol}mg</span></div>
                        <div class="flex justify-between"><span class="text-gray-600">Sodium</span><span class="font-medium">${allDataNutrition.sodium}mg</span></div>
                    </div>
                </div>
            `;
      return allDataNutrition;
    }
  } catch (error) {
    const nutritionFactsContainer = document.getElementById("nutrition-facts-container");
    nutritionFactsContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center py-12 text-center">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
                </div>
                <p class="text-gray-500 text-lg">No recipes found</p>
                <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
            </div>
        `;
  }
}
/* =================================================== */

/* ===================================Categories Product Api======================================== */
searchProductBtn.addEventListener("click", function () {
  let productScannerValue = productSearchInput.value.trim();
  categoriesProductResults(productScannerValue);
});

lookupBarcodeBtn.addEventListener("click", function () {
  let productBarcodeValue = barcodeInput.value.trim();
  barcodeProductResults(productBarcodeValue);
});
/* =================================================== */

/* =====================Barcode Product Api============================== */
async function barcodeProductResults(productBarcodeValue) {
  try {
    categoriesArea.innerHTML = loadingSpiner;
    let response = await fetch(`https://nutriplan-api.vercel.app/api/products/barcode/${productBarcodeValue}`);
    if (response.ok) {
      let dataBarcodeProductScanner = await response.json();
      let nutriScore = dataBarcodeProductScanner.result.nutritionGrade ? dataBarcodeProductScanner.result.nutritionGrade.toUpperCase() : "UNKNOWN";
      let novaGroupNumber = dataBarcodeProductScanner.result.novaGroup;
      let colorNutriScore = "";
      let colorNovaGroup = "";

      switch (nutriScore) {
        case "A": colorNutriScore = "bg-green-500"; break;
        case "B": colorNutriScore = "bg-lime-500"; break;
        case "C": colorNutriScore = "bg-yellow-500"; break;
        case "D": colorNutriScore = "bg-orange-500"; break;
        case "E": colorNutriScore = "bg-red-500"; break;
        default: colorNutriScore = "bg-gray-400"; break;
      }

      switch (novaGroupNumber) {
        case "1": colorNovaGroup = "bg-green-500"; break;
        case "2": colorNovaGroup = "bg-lime-500"; break;
        case "3": colorNovaGroup = "bg-orange-500"; break;
        case "4": colorNovaGroup = "bg-red-500"; break;
        default: colorNovaGroup = "bg-gray-400"; break;
      }

      productsGrid.innerHTML = `
                <div class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group" data-barcode="${dataBarcodeProductScanner.result.barcode}">
                    <div class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                        <img class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" src="${dataBarcodeProductScanner.result.image}" alt="${dataBarcodeProductScanner.result.name}" loading="lazy" />
                        <div class="absolute top-2 left-2 ${colorNutriScore} text-white text-xs font-bold px-2 py-1 rounded uppercase">NUTRI-SCORE ${nutriScore}</div>
                        <div class="absolute top-2 right-2 ${colorNovaGroup} text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center" title="NOVA ${novaGroupNumber}">${novaGroupNumber}</div>
                    </div>
                    <div class="p-4">
                        <p class="text-xs text-emerald-600 font-semibold mb-1 truncate">${dataBarcodeProductScanner.result.brand}</p>
                        <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">${dataBarcodeProductScanner.result.name}</h3>
                        <div class="flex items-center gap-3 text-xs text-gray-500 mb-3">
                            <span><i class="fa-solid fa-weight-scale mr-1"></i>250g</span>
                            <span><i class="fa-solid fa-fire mr-1"></i>${dataBarcodeProductScanner.result.nutrients.calories}kcal/100g</span>
                        </div>
                        <div class="grid grid-cols-4 gap-1 text-center">
                            <div class="bg-emerald-50 rounded p-1.5"><p class="text-xs font-bold text-emerald-700">${dataBarcodeProductScanner.result.nutrients.protein}g</p><p class="text-[10px] text-gray-500">Protein</p></div>
                            <div class="bg-blue-50 rounded p-1.5"><p class="text-xs font-bold text-blue-700">${dataBarcodeProductScanner.result.nutrients.carbs}g</p><p class="text-[10px] text-gray-500">Carbs</p></div>
                            <div class="bg-purple-50 rounded p-1.5"><p class="text-xs font-bold text-purple-700">${dataBarcodeProductScanner.result.nutrients.fat}g</p><p class="text-[10px] text-gray-500">Fat</p></div>
                            <div class="bg-orange-50 rounded p-1.5"><p class="text-xs font-bold text-orange-700">${dataBarcodeProductScanner.result.nutrients.sugar}g</p><p class="text-[10px] text-gray-500">Sugar</p></div>
                        </div>
                    </div>
                </div>
            `;

      const productCards = document.querySelectorAll(".product-card");
      productCards.forEach(function (cards) {
        cards.addEventListener("click", async function () {
          const indexBarcode = this.getAttribute("data-barcode");
          productDetailModal.classList.remove("hidden");
          try {
            productDetailModalContent.innerHTML = loadingSpiner;
            let response = await fetch(`https://nutriplan-api.vercel.app/api/products/barcode/${indexBarcode}`);
            if (response.ok) {
              let dataProductProductResults = await response.json();
              let salt = dataProductProductResults.result.nutrients.sodium * 2.5;
              let nutriScore = dataProductProductResults.result.nutritionGrade.toUpperCase();
              let novaGroupNumber = dataProductProductResults.result.novaGroup;
              let colorProductnutriScore = "";
              let colorNovaGroup = "";
              let colorProductScannerBg = "";
              let colorNovaGroupBg = "";

              switch (nutriScore.toUpperCase()) {
                case "A": colorProductnutriScore = "#038141"; colorProductScannerBg = "#03814120"; break;
                case "B": colorProductnutriScore = "#85bb2f"; colorProductScannerBg = "#85bb2f20"; break;
                case "C": colorProductnutriScore = "#f8c700"; colorProductScannerBg = "#f8c70020"; break;
                case "D": colorProductnutriScore = "#ee8100"; colorProductScannerBg = "#ee810020"; break;
                case "E": colorProductnutriScore = "#e63e11"; colorProductScannerBg = "#e63e1120"; break;
                default: colorProductnutriScore = "#989898"; colorProductScannerBg = "#98989820"; break;
              }

              switch (novaGroupNumber) {
                case "1": colorNovaGroup = "#038141"; colorNovaGroupBg = "#03814120"; break;
                case "2": colorNovaGroup = "#85bb2f"; colorNovaGroupBg = "#85bb2f20"; break;
                case "3": colorNovaGroup = "#ee8100"; colorNovaGroupBg = "#ee810020"; break;
                case "4": colorNovaGroup = "#e63e11"; colorNovaGroupBg = "#e63e1120"; break;
                default: colorNovaGroup = "#989898"; colorNovaGroupBg = "#98989820"; break;
              }

              productDetailModalContent.innerHTML = `
                   <div class="flex items-start gap-6 mb-6">
                       <div class="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                          <img src="${dataProductProductResults.result.image}" alt="${dataProductProductResults.result.name}" class="w-full h-full object-contain">
                              </div>
                                <div class="flex-1">
                                   <p class="text-sm text-emerald-600 font-semibold mb-1">${dataProductProductResults.result.brand}</p>
                                        <h2 class="text-2xl font-bold text-gray-900 mb-2">${dataProductProductResults.result.name}</h2>
                                        <p class="text-sm text-gray-500 mb-3">33 cl</p>
                                        <div class="flex items-center gap-3">
                                            <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background-color: ${colorProductScannerBg}">
                                                <span class="w-8 h-8 rounded flex items-center justify-center text-white font-bold" style="background-color: ${colorProductnutriScore}">${nutriScore}</span>
                                                <div><p class="text-xs font-bold" style="color: ${colorProductnutriScore}">Nutri-Score</p><p class="text-[10px] text-gray-600">Excellent</p></div>
                                            </div>
                                            <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background-color: ${colorNovaGroupBg}">
                                                <span class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style="background-color: ${colorNovaGroup}">${novaGroupNumber}</span>
                                                <div><p class="text-xs font-bold" style="color: ${colorNovaGroup}">NOVA</p><p class="text-[10px] text-gray-600">Ultra-processed</p></div>
                                            </div>
                                        </div>
                                    </div>
                                    <button id="close-product-modal" class="close-product-modal text-gray-400 hover:text-gray-600"><i class="text-2xl fa-solid fa-xmark"></i></button>
                                </div>
                                <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 mb-6 border border-emerald-200">
                                    <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2"><i class="text-emerald-600 fa-solid fa-chart-pie"></i>Nutrition Facts <span class="text-sm font-normal text-gray-500">(per 100g)</span></h3>
                                    <div class="text-center mb-4 pb-4 border-b border-emerald-200">
                                        <p class="text-4xl font-bold text-gray-900">${dataProductProductResults.result.nutrients.calories}</p>
                                        <p class="text-sm text-gray-500">Calories</p>
                                    </div>
                                    <div class="grid grid-cols-4 gap-4">
                                        <div class="text-center">
                                            <div class="w-full bg-gray-200 rounded-full h-2 mb-2"><div class="bg-emerald-500 h-2 rounded-full" style="width: ${dataProductProductResults.result.nutrients.protein}%"></div></div>
                                            <p class="text-lg font-bold text-emerald-600">${dataProductProductResults.result.nutrients.protein} g</p><p class="text-xs text-gray-500">Protein</p>
                                        </div>
                                        <div class="text-center">
                                            <div class="w-full bg-gray-200 rounded-full h-2 mb-2"><div class="bg-blue-500 h-2 rounded-full" style="width: ${dataProductProductResults.result.nutrients.carbs}%"></div></div>
                                            <p class="text-lg font-bold text-blue-600">${dataProductProductResults.result.nutrients.carbs}g</p><p class="text-xs text-gray-500">Carbs</p>
                                        </div>
                                        <div class="text-center">
                                            <div class="w-full bg-gray-200 rounded-full h-2 mb-2"><div class="bg-purple-500 h-2 rounded-full" style="width: ${dataProductProductResults.result.nutrients.fat}%"></div></div>
                                            <p class="text-lg font-bold text-purple-600">${dataProductProductResults.result.nutrients.fat}g</p><p class="text-xs text-gray-500">Fat</p>
                                        </div>
                                        <div class="text-center">
                                            <div class="w-full bg-gray-200 rounded-full h-2 mb-2"><div class="bg-orange-500 h-2 rounded-full" style="width: ${dataProductProductResults.result.nutrients.sugar}%"></div></div>
                                            <p class="text-lg font-bold text-orange-600">${dataProductProductResults.result.nutrients.sugar}g</p><p class="text-xs text-gray-500">Sugar</p>
                                        </div>
                                    </div>
                                    <div class="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-emerald-200">
                                        <div class="text-center"><p class="text-sm font-semibold text-gray-900">0.0g</p><p class="text-xs text-gray-500">Saturated Fat</p></div>
                                        <div class="text-center"><p class="text-sm font-semibold text-gray-900">${dataProductProductResults.result.nutrients.fiber}g</p><p class="text-xs text-gray-500">Fiber</p></div>
                                        <div class="text-center"><p class="text-sm font-semibold text-gray-900">${salt}g</p><p class="text-xs text-gray-500">Salt</p></div>
                                    </div>
                                </div>
                                <div class="bg-gray-50 rounded-xl p-5 mb-6"><h3 class="font-bold text-gray-900 mb-3 flex items-center gap-2"><i class="text-gray-600 fa-solid fa-list"></i>Ingredients</h3><p class="text-sm text-gray-600 leading-relaxed"></p></div>
                                <div class="flex gap-3">
                                    <button class="add-product-to-log flex-1 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all" data-name="${dataProductProductResults.result.name}" data-img="${dataProductProductResults.result.image}" data-calories="${dataProductProductResults.result.nutrients.calories}" data-protein="${dataProductProductResults.result.nutrients.protein}" data-carbs="${dataProductProductResults.result.nutrients.carbs}" data-fat="${dataProductProductResults.result.nutrients.fat}">
                                        <i class="fa-solid fa-plus mr-2"></i>Log This Food
                                    </button>
                                    <button class="close-product-modal flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">Close</button>
                                </div>
                            `;

              const closeBtn = document.getElementById("close-product-modal");
              closeBtn.addEventListener("click", function () {
                productDetailModal.classList.add("hidden");
              });
            }
          } catch (error) {
            productDetailModalContent.innerHTML = `
                            <div class="flex flex-col items-center justify-center py-12 text-center">
                                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
                                </div>
                                <p class="text-gray-500 text-lg">No recipes found</p>
                                <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
                            </div>
                        `;
          }
        });
      });
    }
  } catch (error) {
    productsGrid.innerHTML = `
            <div class="flex flex-col items-center justify-center py-12 text-center">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
                </div>
                <p class="text-gray-500 text-lg">No recipes found</p>
                <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
            </div>
        `;
  }
}
/* =================================================== */

/* ========================Filter by Nutri Score=========================== */
const nutritionGradeBtn = document.querySelectorAll(".nutri-score-filter");
function resetActiveStyles() {
  nutritionGradeBtn.forEach(function (btn) {
    btn.classList.remove("ring-2", "ring-gray-900");
  });
}

nutritionGradeBtn.forEach(function (btn) {
  btn.addEventListener("click", function () {
    resetActiveStyles();
    this.classList.add("ring-2", "ring-gray-900");
    const indexNutritionGrade = this.getAttribute("data-grade");
    categoriesProductResults('', indexNutritionGrade);
    categoriesProductScanner('', indexNutritionGrade);
  });
});
/* =================================================== */

/* ==========================Filter by Nutri Score Api========================= */
async function categoriesProductScanner(indexDataCategoryProudct, indexNutritionGrade = '') {
  try {
    categoriesArea.innerHTML = loadingSpiner;
    let response = await fetch(`https://nutriplan-api.vercel.app/api/products/search?q=${indexDataCategoryProudct}&page=1&limit=24`);
    if (response.ok) {
      let dataProductScanner = await response.json();
      let boxProductScanner = "";

      for (let productScanner of dataProductScanner.results) {
        let nutriScore = productScanner.nutritionGrade ? productScanner.nutritionGrade : "UNKNOWN";
        if (indexNutritionGrade !== '' && nutriScore !== indexNutritionGrade) { continue }
        let novaGroupNumber = productScanner.novaGroup;
        let colorNutriScore = "";
        let colorNovaGroup = "";

        switch (nutriScore.toUpperCase()) {
          case "A": colorNutriScore = "bg-green-500"; break;
          case "B": colorNutriScore = "bg-lime-500"; break;
          case "C": colorNutriScore = "bg-yellow-500"; break;
          case "D": colorNutriScore = "bg-orange-500"; break;
          case "E": colorNutriScore = "bg-red-500"; break;
          default: colorNutriScore = "bg-gray-400"; break;
        }

        switch (novaGroupNumber) {
          case "1": colorNovaGroup = "bg-green-500"; break;
          case "2": colorNovaGroup = "bg-lime-500"; break;
          case "3": colorNovaGroup = "bg-orange-500"; break;
          case "4": colorNovaGroup = "bg-red-500"; break;
          default: colorNovaGroup = "bg-gray-400"; break;
        }

        boxProductScanner += `
                    <div class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group" data-barcode="${productScanner.barcode}">
                        <div class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                            <img class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" src="${productScanner.image}" alt="${productScanner.name}" loading="lazy" />
                            <div class="absolute top-2 left-2 ${colorNutriScore} text-white text-xs font-bold px-2 py-1 rounded uppercase">NUTRI-SCORE ${nutriScore}</div>
                            <div class="absolute top-2 right-2 ${colorNovaGroup} text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center" title="NOVA ${novaGroupNumber}">${novaGroupNumber}</div>
                        </div>
                        <div class="p-4">
                            <p class="text-xs text-emerald-600 font-semibold mb-1 truncate">${productScanner.brand}</p>
                            <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">${productScanner.name}</h3>
                            <div class="flex items-center gap-3 text-xs text-gray-500 mb-3">
                                <span><i class="fa-solid fa-weight-scale mr-1"></i>250g</span>
                                <span><i class="fa-solid fa-fire mr-1"></i>${productScanner.nutrients.calories}kcal/100g</span>
                            </div>
                            <div class="grid grid-cols-4 gap-1 text-center">
                                <div class="bg-emerald-50 rounded p-1.5"><p class="text-xs font-bold text-emerald-700">${productScanner.nutrients.protein}g</p><p class="text-[10px] text-gray-500">Protein</p></div>
                                <div class="bg-blue-50 rounded p-1.5"><p class="text-xs font-bold text-blue-700">${productScanner.nutrients.carbs}g</p><p class="text-[10px] text-gray-500">Carbs</p></div>
                                <div class="bg-purple-50 rounded p-1.5"><p class="text-xs font-bold text-purple-700">${productScanner.nutrients.fat}g</p><p class="text-[10px] text-gray-500">Fat</p></div>
                                <div class="bg-orange-50 rounded p-1.5"><p class="text-xs font-bold text-orange-700">${productScanner.nutrients.sugar}g</p><p class="text-[10px] text-gray-500">Sugar</p></div>
                            </div>
                        </div>
                    </div>
                `;
      }
      productsGrid.innerHTML = boxProductScanner;

      const productCards = document.querySelectorAll(".product-card");
      productCards.forEach(function (cards) {
        cards.addEventListener("click", async function () {
          const indexBarcode = this.getAttribute("data-barcode");
          productDetailModal.classList.remove("hidden");
          try {
            productDetailModalContent.innerHTML = loadingSpiner;
            let response = await fetch(`https://nutriplan-api.vercel.app/api/products/barcode/${indexBarcode}`);
            if (response.ok) {
              let dataProductProductResults = await response.json();
              let salt = dataProductProductResults.result.nutrients.sodium * 2.5;
              let nutriScore = dataProductProductResults.result.nutritionGrade.toUpperCase();
              let novaGroupNumber = dataProductProductResults.result.novaGroup;
              let colorProductnutriScore = "";
              let colorNovaGroup = "";
              let colorProductScannerBg = "";
              let colorNovaGroupBg = "";

              switch (nutriScore.toUpperCase()) {
                case "A": colorProductnutriScore = "#038141"; colorProductScannerBg = "#03814120"; break;
                case "B": colorProductnutriScore = "#85bb2f"; colorProductScannerBg = "#85bb2f20"; break;
                case "C": colorProductnutriScore = "#f8c700"; colorProductScannerBg = "#f8c70020"; break;
                case "D": colorProductnutriScore = "#ee8100"; colorProductScannerBg = "#ee810020"; break;
                case "E": colorProductnutriScore = "#e63e11"; colorProductScannerBg = "#e63e1120"; break;
                default: colorProductnutriScore = "#989898"; colorProductScannerBg = "#98989820"; break;
              }

              switch (novaGroupNumber) {
                case "1": colorNovaGroup = "#038141"; colorNovaGroupBg = "#03814120"; break;
                case "2": colorNovaGroup = "#85bb2f"; colorNovaGroupBg = "#85bb2f20"; break;
                case "3": colorNovaGroup = "#ee8100"; colorNovaGroupBg = "#ee810020"; break;
                case "4": colorNovaGroup = "#e63e11"; colorNovaGroupBg = "#e63e1120"; break;
                default: colorNovaGroup = "#989898"; colorNovaGroupBg = "#98989820"; break;
              }

              productDetailModalContent.innerHTML = `
                                <div class="flex items-start gap-6 mb-6">
                                    <div class="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                                        <img src="${dataProductProductResults.result.image}" alt="${dataProductProductResults.result.name}" class="w-full h-full object-contain">
                                    </div>
                                    <div class="flex-1">
                                        <p class="text-sm text-emerald-600 font-semibold mb-1">${dataProductProductResults.result.brand}</p>
                                        <h2 class="text-2xl font-bold text-gray-900 mb-2">${dataProductProductResults.result.name}</h2>
                                        <p class="text-sm text-gray-500 mb-3">33 cl</p>
                                        <div class="flex items-center gap-3">
                                            <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background-color: ${colorProductScannerBg}">
                                                <span class="w-8 h-8 rounded flex items-center justify-center text-white font-bold" style="background-color: ${colorProductnutriScore}">${nutriScore}</span>
                                                <div><p class="text-xs font-bold" style="color: ${colorProductnutriScore}">Nutri-Score</p><p class="text-[10px] text-gray-600">Excellent</p></div>
                                            </div>
                                            <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background-color: ${colorNovaGroupBg}">
                                                <span class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style="background-color: ${colorNovaGroup}">${novaGroupNumber}</span>
                                                <div><p class="text-xs font-bold" style="color: ${colorNovaGroup}">NOVA</p><p class="text-[10px] text-gray-600">Ultra-processed</p></div>
                                            </div>
                                        </div>
                                    </div>
                                    <button id="close-product-modal" class="close-product-modal text-gray-400 hover:text-gray-600"><i class="text-2xl fa-solid fa-xmark"></i></button>
                                </div>
                                <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 mb-6 border border-emerald-200">
                                    <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2"><i class="text-emerald-600 fa-solid fa-chart-pie"></i>Nutrition Facts <span class="text-sm font-normal text-gray-500">(per 100g)</span></h3>
                                    <div class="text-center mb-4 pb-4 border-b border-emerald-200">
                                        <p class="text-4xl font-bold text-gray-900">${dataProductProductResults.result.nutrients.calories}</p>
                                        <p class="text-sm text-gray-500">Calories</p>
                                    </div>
                                    <div class="grid grid-cols-4 gap-4">
                                        <div class="text-center">
                                            <div class="w-full bg-gray-200 rounded-full h-2 mb-2"><div class="bg-emerald-500 h-2 rounded-full" style="width: ${dataProductProductResults.result.nutrients.protein}%"></div></div>
                                            <p class="text-lg font-bold text-emerald-600">${dataProductProductResults.result.nutrients.protein} g</p><p class="text-xs text-gray-500">Protein</p>
                                        </div>
                                        <div class="text-center">
                                            <div class="w-full bg-gray-200 rounded-full h-2 mb-2"><div class="bg-blue-500 h-2 rounded-full" style="width: ${dataProductProductResults.result.nutrients.carbs}%"></div></div>
                                            <p class="text-lg font-bold text-blue-600">${dataProductProductResults.result.nutrients.carbs}g</p><p class="text-xs text-gray-500">Carbs</p>
                                        </div>
                                        <div class="text-center">
                                            <div class="w-full bg-gray-200 rounded-full h-2 mb-2"><div class="bg-purple-500 h-2 rounded-full" style="width: ${dataProductProductResults.result.nutrients.fat}%"></div></div>
                                            <p class="text-lg font-bold text-purple-600">${dataProductProductResults.result.nutrients.fat}g</p><p class="text-xs text-gray-500">Fat</p>
                                        </div>
                                        <div class="text-center">
                                            <div class="w-full bg-gray-200 rounded-full h-2 mb-2"><div class="bg-orange-500 h-2 rounded-full" style="width: ${dataProductProductResults.result.nutrients.sugar}%"></div></div>
                                            <p class="text-lg font-bold text-orange-600">${dataProductProductResults.result.nutrients.sugar}g</p><p class="text-xs text-gray-500">Sugar</p>
                                        </div>
                                    </div>
                                    <div class="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-emerald-200">
                                        <div class="text-center"><p class="text-sm font-semibold text-gray-900">0.0g</p><p class="text-xs text-gray-500">Saturated Fat</p></div>
                                        <div class="text-center"><p class="text-sm font-semibold text-gray-900">${dataProductProductResults.result.nutrients.fiber}g</p><p class="text-xs text-gray-500">Fiber</p></div>
                                        <div class="text-center"><p class="text-sm font-semibold text-gray-900">${salt}g</p><p class="text-xs text-gray-500">Salt</p></div>
                                    </div>
                                </div>
                                <div class="bg-gray-50 rounded-xl p-5 mb-6"><h3 class="font-bold text-gray-900 mb-3 flex items-center gap-2"><i class="text-gray-600 fa-solid fa-list"></i>Ingredients</h3><p class="text-sm text-gray-600 leading-relaxed"></p></div>
                                <div class="flex gap-3">
                                    <button class="add-product-to-log flex-1 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all" data-name="${dataProductProductResults.result.name}" data-img="${dataProductProductResults.result.image}" data-calories="${dataProductProductResults.result.nutrients.calories}" data-protein="${dataProductProductResults.result.nutrients.protein}" data-carbs="${dataProductProductResults.result.nutrients.carbs}" data-fat="${dataProductProductResults.result.nutrients.fat}">
                                        <i class="fa-solid fa-plus mr-2"></i>Log This Food
                                    </button>
                                    <button class="close-product-modal flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">Close</button>
                                </div>
                            `;
              const closeBtn = document.getElementById("close-product-modal");
              closeBtn.addEventListener("click", function () {
                productDetailModal.classList.add("hidden");
              });
            }
          } catch (error) {
            productDetailModalContent.innerHTML = `
                            <div class="flex flex-col items-center justify-center py-12 text-center">
                                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
                                </div>
                                <p class="text-gray-500 text-lg">No recipes found</p>
                                <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
                            </div>
                        `;
          }
        });
      });
    }
  } catch (error) {
    productsGrid.innerHTML = `
            <div class="flex flex-col items-center justify-center py-12 text-center">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
                </div>
                <p class="text-gray-500 text-lg">No recipes found</p>
                <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
            </div>
        `;
  }
}
/* =================================================== */

/* ========================Categories Product Api=========================== */
async function productCategoriesApi() {
  try {
    categoriesArea.innerHTML = loadingSpiner;
    let response = await fetch(`https://nutriplan-api.vercel.app/api/products/categories`);
    if (response.ok) {
      let dataProductCategories = await response.json();
      let boxBtnCategories = "";
      for (let productCategoriesData of dataProductCategories.results) {
        boxBtnCategories += `
                    <button data-product-category="${productCategoriesData.name}" class="product-category-btn flex-shrink-0 px-5 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                        ${productCategoriesData.name}
                    </button>
                `;
      }
      productCategories.innerHTML = boxBtnCategories;
      const categoryProductBtn = document.querySelectorAll(".product-category-btn");
      categoryProductBtn.forEach(function (btn) {
        btn.addEventListener("click", function () {
          const indexDataCategoryProudct = this.getAttribute("data-product-category");
          categoriesProductScanner(indexDataCategoryProudct);
        });
      });
    }
  } catch (error) {
    productCategories.innerHTML = `
            <div class="flex flex-col items-center justify-center py-12 text-center">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
                </div>
                <p class="text-gray-500 text-lg">No recipes found</p>
                <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
            </div>
        `;
  }
}
/* =================================================== */

/* ========================Products Api=========================== */
async function categoriesProductResults(productScannerValue, indexNutritionGrade = '') {
  try {
    categoriesArea.innerHTML = loadingSpiner;
    let response = await fetch(`https://nutriplan-api.vercel.app/api/products/search?q=${productScannerValue}&page=1&limit=24`);
    if (response.ok) {
      let dataProductScanner = await response.json();
      let boxProductScanner = "";

      for (let productScanner of dataProductScanner.results) {
        let nutriScore = productScanner.nutritionGrade ? productScanner.nutritionGrade : "UNKNOWN";
        if (indexNutritionGrade !== '' && nutriScore !== indexNutritionGrade) { continue; }
        let novaGroupNumber = productScanner.novaGroup;
        let colorNutriScore = "";
        let colorNovaGroup = "";

        switch (nutriScore.toUpperCase()) {
          case "A": colorNutriScore = "bg-green-500"; break;
          case "B": colorNutriScore = "bg-lime-500"; break;
          case "C": colorNutriScore = "bg-yellow-500"; break;
          case "D": colorNutriScore = "bg-orange-500"; break;
          case "E": colorNutriScore = "bg-red-500"; break;
          default: colorNutriScore = "bg-gray-400"; break;
        }

        switch (novaGroupNumber) {
          case "1": colorNovaGroup = "bg-green-500"; break;
          case "2": colorNovaGroup = "bg-lime-500"; break;
          case "3": colorNovaGroup = "bg-orange-500"; break;
          case "4": colorNovaGroup = "bg-red-500"; break;
          default: colorNovaGroup = "bg-gray-400"; break;
        }

        boxProductScanner += `
                    <div class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group" data-barcode="${productScanner.barcode}">
                        <div class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                            <img class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" src="${productScanner.image}" alt="${productScanner.name}" loading="lazy" />
                            <div class="absolute top-2 left-2 ${colorNutriScore} text-white text-xs font-bold px-2 py-1 rounded uppercase">NUTRI-SCORE ${nutriScore}</div>
                            <div class="absolute top-2 right-2 ${colorNovaGroup} text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center" title="NOVA ${novaGroupNumber}">${novaGroupNumber}</div>
                        </div>
                        <div class="p-4">
                            <p class="text-xs text-emerald-600 font-semibold mb-1 truncate">${productScanner.brand}</p>
                            <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">${productScanner.name}</h3>
                            <div class="flex items-center gap-3 text-xs text-gray-500 mb-3">
                                <span><i class="fa-solid fa-weight-scale mr-1"></i>250g</span>
                                <span><i class="fa-solid fa-fire mr-1"></i>${productScanner.nutrients.calories}kcal/100g</span>
                            </div>
                            <div class="grid grid-cols-4 gap-1 text-center">
                                <div class="bg-emerald-50 rounded p-1.5"><p class="text-xs font-bold text-emerald-700">${productScanner.nutrients.protein}g</p><p class="text-[10px] text-gray-500">Protein</p></div>
                                <div class="bg-blue-50 rounded p-1.5"><p class="text-xs font-bold text-blue-700">${productScanner.nutrients.carbs}g</p><p class="text-[10px] text-gray-500">Carbs</p></div>
                                <div class="bg-purple-50 rounded p-1.5"><p class="text-xs font-bold text-purple-700">${productScanner.nutrients.fat}g</p><p class="text-[10px] text-gray-500">Fat</p></div>
                                <div class="bg-orange-50 rounded p-1.5"><p class="text-xs font-bold text-orange-700">${productScanner.nutrients.sugar}g</p><p class="text-[10px] text-gray-500">Sugar</p></div>
                            </div>
                        </div>
                    </div>
                `;
      }
      productsGrid.innerHTML = boxProductScanner;

      const productCards = document.querySelectorAll(".product-card");
      productCards.forEach(function (cards) {
        cards.addEventListener("click", async function () {
          const indexBarcode = this.getAttribute("data-barcode");
          productDetailModal.classList.remove("hidden");
          try {
            productDetailModalContent.innerHTML = loadingSpiner;
            let response = await fetch(`https://nutriplan-api.vercel.app/api/products/barcode/${indexBarcode}`);
            if (response.ok) {
              let dataProductProductResults = await response.json();
              let salt = dataProductProductResults.result.nutrients.sodium * 2.5;
              let nutriScore = dataProductProductResults.result.nutritionGrade.toUpperCase();
              let novaGroupNumber = dataProductProductResults.result.novaGroup;
              let colorProductnutriScore = "";
              let colorNovaGroup = "";
              let colorProductScannerBg = "";
              let colorNovaGroupBg = "";

              switch (nutriScore.toUpperCase()) {
                case "A": colorProductnutriScore = "#038141"; colorProductScannerBg = "#03814120"; break;
                case "B": colorProductnutriScore = "#85bb2f"; colorProductScannerBg = "#85bb2f20"; break;
                case "C": colorProductnutriScore = "#f8c700"; colorProductScannerBg = "#f8c70020"; break;
                case "D": colorProductnutriScore = "#ee8100"; colorProductScannerBg = "#ee810020"; break;
                case "E": colorProductnutriScore = "#e63e11"; colorProductScannerBg = "#e63e1120"; break;
                default: colorProductnutriScore = "#989898"; colorProductScannerBg = "#98989820"; break;
              }

              switch (novaGroupNumber) {
                case "1": colorNovaGroup = "#038141"; colorNovaGroupBg = "#03814120"; break;
                case "2": colorNovaGroup = "#85bb2f"; colorNovaGroupBg = "#85bb2f20"; break;
                case "3": colorNovaGroup = "#ee8100"; colorNovaGroupBg = "#ee810020"; break;
                case "4": colorNovaGroup = "#e63e11"; colorNovaGroupBg = "#e63e1120"; break;
                default: colorNovaGroup = "#989898"; colorNovaGroupBg = "#98989820"; break;
              }

              productDetailModalContent.innerHTML = `
                                <div class="flex items-start gap-6 mb-6">
                                    <div class="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                                        <img src="${dataProductProductResults.result.image}" alt="${dataProductProductResults.result.name}" class="w-full h-full object-contain">
                                    </div>
                                    <div class="flex-1">
                                        <p class="text-sm text-emerald-600 font-semibold mb-1">${dataProductProductResults.result.brand}</p>
                                        <h2 class="text-2xl font-bold text-gray-900 mb-2">${dataProductProductResults.result.name}</h2>
                                        <p class="text-sm text-gray-500 mb-3">33 cl</p>
                                        <div class="flex items-center gap-3">
                                            <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background-color: ${colorProductScannerBg}">
                                                <span class="w-8 h-8 rounded flex items-center justify-center text-white font-bold" style="background-color: ${colorProductnutriScore}">${nutriScore}</span>
                                                <div><p class="text-xs font-bold" style="color: ${colorProductnutriScore}">Nutri-Score</p><p class="text-[10px] text-gray-600">Excellent</p></div>
                                            </div>
                                            <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background-color: ${colorNovaGroupBg}">
                                                <span class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style="background-color: ${colorNovaGroup}">${novaGroupNumber}</span>
                                                <div><p class="text-xs font-bold" style="color: ${colorNovaGroup}">NOVA</p><p class="text-[10px] text-gray-600">Ultra-processed</p></div>
                                            </div>
                                        </div>
                                    </div>
                                    <button id="close-product-modal" class="close-product-modal text-gray-400 hover:text-gray-600"><i class="text-2xl fa-solid fa-xmark"></i></button>
                                </div>
                                <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 mb-6 border border-emerald-200">
                                    <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2"><i class="text-emerald-600 fa-solid fa-chart-pie"></i>Nutrition Facts <span class="text-sm font-normal text-gray-500">(per 100g)</span></h3>
                                    <div class="text-center mb-4 pb-4 border-b border-emerald-200">
                                        <p class="text-4xl font-bold text-gray-900">${dataProductProductResults.result.nutrients.calories}</p>
                                        <p class="text-sm text-gray-500">Calories</p>
                                    </div>
                                    <div class="grid grid-cols-4 gap-4">
                                        <div class="text-center">
                                            <div class="w-full bg-gray-200 rounded-full h-2 mb-2"><div class="bg-emerald-500 h-2 rounded-full" style="width: ${dataProductProductResults.result.nutrients.protein}%"></div></div>
                                            <p class="text-lg font-bold text-emerald-600">${dataProductProductResults.result.nutrients.protein} g</p><p class="text-xs text-gray-500">Protein</p>
                                        </div>
                                        <div class="text-center">
                                            <div class="w-full bg-gray-200 rounded-full h-2 mb-2"><div class="bg-blue-500 h-2 rounded-full" style="width: ${dataProductProductResults.result.nutrients.carbs}%"></div></div>
                                            <p class="text-lg font-bold text-blue-600">${dataProductProductResults.result.nutrients.carbs}g</p><p class="text-xs text-gray-500">Carbs</p>
                                        </div>
                                        <div class="text-center">
                                            <div class="w-full bg-gray-200 rounded-full h-2 mb-2"><div class="bg-purple-500 h-2 rounded-full" style="width: ${dataProductProductResults.result.nutrients.fat}%"></div></div>
                                            <p class="text-lg font-bold text-purple-600">${dataProductProductResults.result.nutrients.fat}g</p><p class="text-xs text-gray-500">Fat</p>
                                        </div>
                                        <div class="text-center">
                                            <div class="w-full bg-gray-200 rounded-full h-2 mb-2"><div class="bg-orange-500 h-2 rounded-full" style="width: ${dataProductProductResults.result.nutrients.sugar}%"></div></div>
                                            <p class="text-lg font-bold text-orange-600">${dataProductProductResults.result.nutrients.sugar}g</p><p class="text-xs text-gray-500">Sugar</p>
                                        </div>
                                    </div>
                                    <div class="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-emerald-200">
                                        <div class="text-center"><p class="text-sm font-semibold text-gray-900">0.0g</p><p class="text-xs text-gray-500">Saturated Fat</p></div>
                                        <div class="text-center"><p class="text-sm font-semibold text-gray-900">${dataProductProductResults.result.nutrients.fiber}g</p><p class="text-xs text-gray-500">Fiber</p></div>
                                        <div class="text-center"><p class="text-sm font-semibold text-gray-900">${salt}g</p><p class="text-xs text-gray-500">Salt</p></div>
                                    </div>
                                </div>
                                <div class="bg-gray-50 rounded-xl p-5 mb-6"><h3 class="font-bold text-gray-900 mb-3 flex items-center gap-2"><i class="text-gray-600 fa-solid fa-list"></i>Ingredients</h3><p class="text-sm text-gray-600 leading-relaxed"></p></div>
                                <div class="flex gap-3">
                                    <button class="add-product-to-log flex-1 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all" data-name="${dataProductProductResults.result.name}" data-img="${dataProductProductResults.result.image}" data-calories="${dataProductProductResults.result.nutrients.calories}" data-protein="${dataProductProductResults.result.nutrients.protein}" data-carbs="${dataProductProductResults.result.nutrients.carbs}" data-fat="${dataProductProductResults.result.nutrients.fat}">
                                        <i class="fa-solid fa-plus mr-2"></i>Log This Food
                                    </button>
                                    <button class="close-product-modal flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">Close</button>
                                </div>
                            `;
              const closeBtn = document.getElementById("close-product-modal");
              closeBtn.addEventListener("click", function () {
                productDetailModal.classList.add("hidden");
              });
            }
          } catch (error) {
            productDetailModalContent.innerHTML = `
                            <div class="flex flex-col items-center justify-center py-12 text-center">
                                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
                                </div>
                                <p class="text-gray-500 text-lg">No recipes found</p>
                                <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
                            </div>
                        `;
          }
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
}
/* =================================================== */

/* ========================Food Log=========================== */
loggedItemsList.addEventListener('click', function (e) {
  const deleteBtn = e.target.closest('.remove-foodlog-item');
  if (deleteBtn) {
    deleteBtn.parentElement.parentElement.remove();
  }
});

productDetailModalContent.addEventListener('click', function (e) {
  const logBtn = e.target.closest('.add-product-to-log');

  if (logBtn) {
    const currentTime = new Date().toLocaleTimeString();
    const name = logBtn.getAttribute('data-name');
    const img = logBtn.getAttribute('data-img');
    const calories = logBtn.getAttribute('data-calories');
    const protein = logBtn.getAttribute('data-protein');
    const carbs = logBtn.getAttribute('data-carbs');
    const fat = logBtn.getAttribute('data-fat');

    loggedItemsList.innerHTML += `
            <div class="flex items-center justify-between bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all mb-2">
                <div class="flex items-center gap-4">
                    <img src="${img}" alt="${name}" class="w-14 h-14 rounded-xl object-cover">
                    <div>
                        <p class="font-semibold text-gray-900">${name}</p>
                        <p class="text-xs text-gray-400 mt-1">${currentTime}</p>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <div class="text-right">
                        <p class="text-lg font-bold text-emerald-600">${calories}</p>
                        <p class="text-xs text-gray-500">kcal</p>
                    </div>
                    <div class="hidden md:flex gap-2 text-xs text-gray-500">
                        <span class="px-2 py-1 bg-blue-50 rounded">${protein}g P</span>
                        <span class="px-2 py-1 bg-amber-50 rounded">${carbs}g C</span>
                        <span class="px-2 py-1 bg-purple-50 rounded">${fat}g F</span>
                    </div>
                    <button class="remove-foodlog-item text-gray-400 hover:text-red-500 transition-all p-2">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>`;

    productDetailModal.classList.add("hidden");
  }
});
/* =================================================== */

async function getApi() {
  const loader = document.getElementById("app-loading-overlay");
  try {
    await Promise.all([
      categoriesByArea(),
      categoriesByMeal(),
      allRecipes(),
      productCategoriesApi()
    ]);
    if (loader) {
      loader.classList.add("loading");
    }
  } catch (error) {
    console.log(error);
    if (loader) {
      loader.classList.add("loading");
    }
  }
}

initApp();