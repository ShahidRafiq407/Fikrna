/**
 * International Recipe Database for Meal Planner
 * Includes Middle Eastern, Mediterranean, European, South Asian cuisines
 */

export const recipes = [
    // Middle Eastern
    {
        id: 1,
        name: 'Hummus with Pita',
        category: 'Snack',
        cuisine: 'Middle Eastern',
        region: ['UAE', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Oman'],
        ingredients: ['chickpeas', 'tahini', 'lemon juice', 'garlic', 'olive oil', 'pita bread'],
        instructions: [
            'Drain and rinse canned chickpeas',
            'Blend chickpeas with tahini, lemon juice, and garlic',
            'Add olive oil while blending until smooth',
            'Serve with warm pita bread'
        ],
        prepTime: '10 min',
        cookTime: '0 min',
        servings: 4,
        calories: 280,
        protein: '8g',
        carbs: '32g',
        fat: '14g',
        fiber: '7g',
        difficulty: 'Easy',
        halal: true,
        vegetarian: true,
        vegan: true,
        glutenFree: false,
        dairyFree: true,
        keto: false,
        lowCarb: false,
        highProtein: false,
        diabeticFriendly: true,
        heartHealthy: true,
        allergies: ['gluten'],
        mealType: ['snack', 'breakfast'],
        timeCategory: 'under-10'
    },
    {
        id: 2,
        name: 'Grilled Lamb Kebabs',
        category: 'Main Course',
        cuisine: 'Middle Eastern',
        region: ['UAE', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Oman', 'Turkey'],
        ingredients: ['lamb', 'onion', 'garlic', 'cumin', 'paprika', 'yogurt', 'lemon'],
        instructions: [
            'Cut lamb into cubes and marinate with yogurt, spices, and lemon for 2 hours',
            'Thread meat onto skewers',
            'Grill over medium-high heat for 10-12 minutes, turning occasionally',
            'Serve with rice or flatbread'
        ],
        prepTime: '120 min',
        cookTime: '12 min',
        servings: 4,
        calories: 420,
        protein: '38g',
        carbs: '8g',
        fat: '26g',
        fiber: '1g',
        difficulty: 'Medium',
        halal: true,
        vegetarian: false,
        vegan: false,
        glutenFree: true,
        dairyFree: false,
        keto: true,
        lowCarb: true,
        highProtein: true,
        diabeticFriendly: true,
        heartHealthy: false,
        allergies: ['dairy'],
        mealType: ['lunch', 'dinner'],
        timeCategory: 'meal-prep'
    },
    // Mediterranean
    {
        id: 3,
        name: 'Greek Salad',
        category: 'Salad',
        cuisine: 'Mediterranean',
        region: ['Italy', 'Spain', 'France', 'UK', 'Germany', 'Netherlands'],
        ingredients: ['cucumber', 'tomato', 'feta cheese', 'olives', 'red onion', 'olive oil', 'oregano'],
        instructions: [
            'Chop cucumber, tomatoes, and red onion',
            'Add olives and crumbled feta cheese',
            'Drizzle with olive oil and sprinkle oregano',
            'Toss gently and serve immediately'
        ],
        prepTime: '10 min',
        cookTime: '0 min',
        servings: 2,
        calories: 220,
        protein: '6g',
        carbs: '12g',
        fat: '18g',
        fiber: '3g',
        difficulty: 'Easy',
        halal: true,
        vegetarian: true,
        vegan: false,
        glutenFree: true,
        dairyFree: false,
        keto: true,
        lowCarb: true,
        highProtein: false,
        diabeticFriendly: true,
        heartHealthy: true,
        allergies: ['dairy'],
        mealType: ['lunch', 'dinner'],
        timeCategory: 'under-10'
    },
    {
        id: 4,
        name: 'Mediterranean Baked Fish',
        category: 'Main Course',
        cuisine: 'Mediterranean',
        region: ['Italy', 'Spain', 'France'],
        ingredients: ['white fish', 'tomato', 'garlic', 'olive oil', 'lemon', 'herbs', 'capers'],
        instructions: [
            'Preheat oven to 200°C',
            'Place fish in baking dish',
            'Top with chopped tomatoes, garlic, capers, and herbs',
            'Drizzle with olive oil and lemon juice',
            'Bake for 20-25 minutes until fish flakes easily'
        ],
        prepTime: '10 min',
        cookTime: '25 min',
        servings: 2,
        calories: 280,
        protein: '32g',
        carbs: '6g',
        fat: '14g',
        fiber: '2g',
        difficulty: 'Easy',
        halal: true,
        vegetarian: false,
        vegan: false,
        glutenFree: true,
        dairyFree: true,
        keto: true,
        lowCarb: true,
        highProtein: true,
        diabeticFriendly: true,
        heartHealthy: true,
        allergies: [],
        mealType: ['lunch', 'dinner'],
        timeCategory: 'under-30'
    },
    // Italian
    {
        id: 5,
        name: 'Caprese Salad',
        category: 'Salad',
        cuisine: 'Italian',
        region: ['Italy', 'UK', 'Germany', 'Netherlands'],
        ingredients: ['tomato', 'mozzarella', 'basil', 'olive oil', 'balsamic vinegar'],
        instructions: [
            'Slice tomatoes and mozzarella into rounds',
            'Arrange alternating slices on a plate',
            'Add fresh basil leaves between slices',
            'Drizzle with olive oil and balsamic vinegar',
            'Season with salt and pepper'
        ],
        prepTime: '10 min',
        cookTime: '0 min',
        servings: 2,
        calories: 240,
        protein: '12g',
        carbs: '8g',
        fat: '18g',
        fiber: '2g',
        difficulty: 'Easy',
        halal: true,
        vegetarian: true,
        vegan: false,
        glutenFree: true,
        dairyFree: false,
        keto: true,
        lowCarb: true,
        highProtein: false,
        diabeticFriendly: true,
        heartHealthy: true,
        allergies: ['dairy'],
        mealType: ['lunch', 'snack'],
        timeCategory: 'under-10'
    },
    {
        id: 6,
        name: 'Chicken Pasta Primavera',
        category: 'Main Course',
        cuisine: 'Italian',
        region: ['Italy', 'UK', 'Germany', 'France', 'Spain', 'Netherlands'],
        ingredients: ['pasta', 'chicken breast', 'bell peppers', 'zucchini', 'garlic', 'olive oil', 'parmesan'],
        instructions: [
            'Cook pasta according to package directions',
            'Sauté chicken pieces in olive oil until golden',
            'Add chopped vegetables and garlic, cook until tender',
            'Toss with cooked pasta',
            'Top with grated parmesan cheese'
        ],
        prepTime: '15 min',
        cookTime: '20 min',
        servings: 4,
        calories: 480,
        protein: '32g',
        carbs: '54g',
        fat: '14g',
        fiber: '4g',
        difficulty: 'Easy',
        halal: true,
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        dairyFree: false,
        keto: false,
        lowCarb: false,
        highProtein: true,
        diabeticFriendly: false,
        heartHealthy: true,
        allergies: ['gluten', 'dairy'],
        mealType: ['lunch', 'dinner'],
        timeCategory: 'under-30'
    },
    // Turkish
    {
        id: 7,
        name: 'Turkish Lentil Soup',
        category: 'Soup',
        cuisine: 'Turkish',
        region: ['Turkey', 'UAE', 'Saudi Arabia', 'Germany'],
        ingredients: ['red lentils', 'onion', 'carrot', 'cumin', 'lemon', 'olive oil', 'vegetable broth'],
        instructions: [
            'Sauté chopped onions and carrots in olive oil',
            'Add red lentils and vegetable broth',
            'Simmer for 25 minutes until lentils are soft',
            'Blend until smooth',
            'Season with cumin and serve with lemon wedges'
        ],
        prepTime: '10 min',
        cookTime: '30 min',
        servings: 4,
        calories: 210,
        protein: '12g',
        carbs: '34g',
        fat: '4g',
        fiber: '8g',
        difficulty: 'Easy',
        halal: true,
        vegetarian: true,
        vegan: true,
        glutenFree: true,
        dairyFree: true,
        keto: false,
        lowCarb: false,
        highProtein: false,
        diabeticFriendly: true,
        heartHealthy: true,
        allergies: [],
        mealType: ['lunch', 'dinner'],
        timeCategory: 'under-30'
    },
    // South Asian
    {
        id: 8,
        name: 'Chicken Tikka Masala',
        category: 'Main Course',
        cuisine: 'South Asian',
        region: ['UK', 'UAE', 'Qatar', 'Saudi Arabia'],
        ingredients: ['chicken', 'yogurt', 'tomato', 'cream', 'garam masala', 'ginger', 'garlic', 'onion'],
        instructions: [
            'Marinate chicken in yogurt and spices for 1 hour',
            'Grill or pan-fry chicken until cooked',
            'Sauté onions, ginger, and garlic',
            'Add tomatoes and spices, simmer for 10 minutes',
            'Add cream and cooked chicken, simmer for 5 minutes'
        ],
        prepTime: '60 min',
        cookTime: '30 min',
        servings: 4,
        calories: 380,
        protein: '36g',
        carbs: '12g',
        fat: '22g',
        fiber: '3g',
        difficulty: 'Medium',
        halal: true,
        vegetarian: false,
        vegan: false,
        glutenFree: true,
        dairyFree: false,
        keto: false,
        lowCarb: true,
        highProtein: true,
        diabeticFriendly: true,
        heartHealthy: false,
        allergies: ['dairy'],
        mealType: ['lunch', 'dinner'],
        timeCategory: 'meal-prep'
    },
    {
        id: 9,
        name: 'Vegetable Biryani',
        category: 'Main Course',
        cuisine: 'South Asian',
        region: ['UK', 'UAE', 'Qatar', 'Saudi Arabia', 'Kuwait'],
        ingredients: ['basmati rice', 'mixed vegetables', 'onion', 'yogurt', 'biryani spices', 'saffron', 'ghee'],
        instructions: [
            'Soak rice for 30 minutes, then parboil',
            'Fry onions until golden, set aside',
            'Sauté vegetables with spices',
            'Layer rice and vegetables in a pot',
            'Add saffron milk and fried onions, cover and cook on low for 20 minutes'
        ],
        prepTime: '40 min',
        cookTime: '30 min',
        servings: 6,
        calories: 320,
        protein: '8g',
        carbs: '58g',
        fat: '8g',
        fiber: '5g',
        difficulty: 'Medium',
        halal: true,
        vegetarian: true,
        vegan: false,
        glutenFree: true,
        dairyFree: false,
        keto: false,
        lowCarb: false,
        highProtein: false,
        diabeticFriendly: false,
        heartHealthy: true,
        allergies: ['dairy'],
        mealType: ['lunch', 'dinner'],
        timeCategory: 'meal-prep'
    },
    // Continental
    {
        id: 10,
        name: 'Grilled Chicken with Roasted Vegetables',
        category: 'Main Course',
        cuisine: 'Continental',
        region: ['UK', 'Germany', 'France', 'Netherlands', 'Spain', 'Italy'],
        ingredients: ['chicken breast', 'broccoli', 'bell peppers', 'zucchini', 'olive oil', 'herbs', 'lemon'],
        instructions: [
            'Preheat oven to 200°C',
            'Season chicken with herbs, salt, and pepper',
            'Grill chicken for 6-7 minutes per side',
            'Toss vegetables with olive oil and roast for 25 minutes',
            'Serve with lemon wedges'
        ],
        prepTime: '10 min',
        cookTime: '25 min',
        servings: 2,
        calories: 340,
        protein: '42g',
        carbs: '14g',
        fat: '14g',
        fiber: '5g',
        difficulty: 'Easy',
        halal: true,
        vegetarian: false,
        vegan: false,
        glutenFree: true,
        dairyFree: true,
        keto: true,
        lowCarb: true,
        highProtein: true,
        diabeticFriendly: true,
        heartHealthy: true,
        allergies: [],
        mealType: ['lunch', 'dinner'],
        timeCategory: 'under-30'
    },
    // More recipes for variety
    {
        id: 11,
        name: 'Quinoa Buddha Bowl',
        category: 'Main Course',
        cuisine: 'Continental',
        region: ['UK', 'Germany', 'Netherlands', 'France'],
        ingredients: ['quinoa', 'chickpeas', 'avocado', 'kale', 'tahini', 'lemon', 'sweet potato'],
        instructions: [
            'Cook quinoa according to package instructions',
            'Roast chickpeas and sweet potato cubes',
            'Massage kale with lemon juice',
            'Arrange quinoa, vegetables, and avocado in a bowl',
            'Drizzle with tahini dressing'
        ],
        prepTime: '15 min',
        cookTime: '25 min',
        servings: 2,
        calories: 420,
        protein: '14g',
        carbs: '52g',
        fat: '18g',
        fiber: '12g',
        difficulty: 'Easy',
        halal: true,
        vegetarian: true,
        vegan: true,
        glutenFree: true,
        dairyFree: true,
        keto: false,
        lowCarb: false,
        highProtein: false,
        diabeticFriendly: true,
        heartHealthy: true,
        allergies: [],
        mealType: ['lunch', 'dinner'],
        timeCategory: 'under-30'
    },
    {
        id: 12,
        name: 'Shakshuka',
        category: 'Breakfast',
        cuisine: 'Middle Eastern',
        region: ['UAE', 'Saudi Arabia', 'Qatar', 'Israel'],
        ingredients: ['eggs', 'tomato', 'bell peppers', 'onion', 'cumin', 'paprika', 'feta cheese'],
        instructions: [
            'Sauté onions and bell peppers in olive oil',
            'Add chopped tomatoes and spices',
            'Simmer for 10 minutes',
            'Create wells and crack eggs into sauce',
            'Cover and cook until eggs are set',
            'Top with crumbled feta'
        ],
        prepTime: '10 min',
        cookTime: '20 min',
        servings: 2,
        calories: 280,
        protein: '16g',
        carbs: '14g',
        fat: '18g',
        fiber: '4g',
        difficulty: 'Easy',
        halal: true,
        vegetarian: true,
        vegan: false,
        glutenFree: true,
        dairyFree: false,
        keto: true,
        lowCarb: true,
        highProtein: true,
        diabeticFriendly: true,
        heartHealthy: true,
        allergies: ['eggs', 'dairy'],
        mealType: ['breakfast'],
        timeCategory: 'under-30'
    }
];

/**
 * Search recipes by ingredients
 */
export function searchRecipesByIngredients(ingredients) {
    const lowerIngredients = ingredients.map(i => i.toLowerCase());

    return recipes.filter(recipe => {
        const matches = recipe.ingredients.filter(ing =>
            lowerIngredients.some(userIng => ing.toLowerCase().includes(userIng))
        );
        return matches.length > 0;
    }).sort((a, b) => {
        const aMatches = a.ingredients.filter(ing =>
            lowerIngredients.some(userIng => ing.toLowerCase().includes(userIng))
        ).length;
        const bMatches = b.ingredients.filter(ing =>
            lowerIngredients.some(userIng => ing.toLowerCase().includes(userIng))
        ).length;
        return bMatches - aMatches;
    });
}

/**
 * Generate 7-day meal plan
 */
export function generate7DayMealPlan(preferences) {
    const { dietType, region, allergies, healthGoal, familySize = 2 } = preferences;

    let filteredRecipes = [...recipes];

    // Apply filters
    if (dietType) {
        filteredRecipes = filteredRecipes.filter(r => r[dietType] === true);
    }

    if (region) {
        filteredRecipes = filteredRecipes.filter(r => r.region.includes(region));
    }

    if (allergies && allergies.length > 0) {
        filteredRecipes = filteredRecipes.filter(r =>
            !allergies.some(allergy => r.allergies.includes(allergy))
        );
    }

    if (healthGoal === 'weightLoss') {
        filteredRecipes = filteredRecipes.filter(r => r.calories < 400);
    } else if (healthGoal === 'muscleBuilding') {
        filteredRecipes = filteredRecipes.filter(r => r.highProtein);
    }

    // Generate 7-day plan
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const mealPlan = {};

    days.forEach(day => {
        const breakfast = filteredRecipes.find(r => r.mealType.includes('breakfast')) || filteredRecipes[0];
        const lunch = filteredRecipes.find(r => r.mealType.includes('lunch')) || filteredRecipes[1];
        const dinner = filteredRecipes.find(r => r.mealType.includes('dinner')) || filteredRecipes[2];
        const snack = filteredRecipes.find(r => r.mealType.includes('snack')) || filteredRecipes[0];

        mealPlan[day] = {
            breakfast: { ...breakfast, servings: breakfast.servings * familySize },
            lunch: { ...lunch, servings: lunch.servings * familySize },
            dinner: { ...dinner, servings: dinner.servings * familySize },
            snack: { ...snack, servings: snack.servings * familySize }
        };
    });

    return mealPlan;
}

export function getRecipesByCuisine(cuisine) {
    return recipes.filter(r => r.cuisine.toLowerCase() === cuisine.toLowerCase());
}

export function getRecipesByTimeCategory(timeCategory) {
    return recipes.filter(r => r.timeCategory === timeCategory);
}
