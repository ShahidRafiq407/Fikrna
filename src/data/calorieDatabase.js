/**
 * Calorie Database
 * Common foods with calorie information per 100g
 */

export const calorieDatabase = {
    // Proteins
    'chicken breast': { calories: 165, protein: 31, carbs: 0, fat: 3.6, category: 'Protein' },
    'chicken thigh': { calories: 209, protein: 26, carbs: 0, fat: 11, category: 'Protein' },
    'beef': { calories: 250, protein: 26, carbs: 0, fat: 17, category: 'Protein' },
    'mutton': { calories: 294, protein: 25, carbs: 0, fat: 21, category: 'Protein' },
    'fish': { calories: 206, protein: 22, carbs: 0, fat: 12, category: 'Protein' },
    'salmon': { calories: 208, protein: 20, carbs: 0, fat: 13, category: 'Protein' },
    'egg': { calories: 155, protein: 13, carbs: 1.1, fat: 11, category: 'Protein' },
    'tofu': { calories: 76, protein: 8, carbs: 1.9, fat: 4.8, category: 'Protein' },
    'lentils': { calories: 116, protein: 9, carbs: 20, fat: 0.4, category: 'Protein' },
    'chickpeas': { calories: 164, protein: 8.9, carbs: 27, fat: 2.6, category: 'Protein' },

    // Grains & Carbs
    'rice': { calories: 130, protein: 2.7, carbs: 28, fat: 0.3, category: 'Carbs' },
    'brown rice': { calories: 111, protein: 2.6, carbs: 23, fat: 0.9, category: 'Carbs' },
    'white bread': { calories: 265, protein: 9, carbs: 49, fat: 3.2, category: 'Carbs' },
    'whole wheat bread': { calories: 247, protein: 13, carbs: 41, fat: 3.4, category: 'Carbs' },
    'pasta': { calories: 131, protein: 5, carbs: 25, fat: 1.1, category: 'Carbs' },
    'oats': { calories: 389, protein: 17, carbs: 66, fat: 6.9, category: 'Carbs' },
    'quinoa': { calories: 120, protein: 4.4, carbs: 21, fat: 1.9, category: 'Carbs' },
    'potato': { calories: 77, protein: 2, carbs: 17, fat: 0.1, category: 'Carbs' },
    'sweet potato': { calories: 86, protein: 1.6, carbs: 20, fat: 0.1, category: 'Carbs' },
    'naan': { calories: 262, protein: 7.6, carbs: 45, fat: 5.4, category: 'Carbs' },
    'roti': { calories: 297, protein: 11, carbs: 51, fat: 5.7, category: 'Carbs' },

    // Vegetables
    'broccoli': { calories: 34, protein: 2.8, carbs: 7, fat: 0.4, category: 'Vegetable' },
    'spinach': { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, category: 'Vegetable' },
    'carrot': { calories: 41, protein: 0.9, carbs: 10, fat: 0.2, category: 'Vegetable' },
    'tomato': { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, category: 'Vegetable' },
    'cucumber': { calories: 16, protein: 0.7, carbs: 3.6, fat: 0.1, category: 'Vegetable' },
    'lettuce': { calories: 15, protein: 1.4, carbs: 2.9, fat: 0.2, category: 'Vegetable' },
    'onion': { calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1, category: 'Vegetable' },
    'garlic': { calories: 149, protein: 6.4, carbs: 33, fat: 0.5, category: 'Vegetable' },
    'bell pepper': { calories: 31, protein: 1, carbs: 6, fat: 0.3, category: 'Vegetable' },

    // Fruits
    'apple': { calories: 52, protein: 0.3, carbs: 14, fat: 0.2, category: 'Fruit' },
    'banana': { calories: 89, protein: 1.1, carbs: 23, fat: 0.3, category: 'Fruit' },
    'orange': { calories: 47, protein: 0.9, carbs: 12, fat: 0.1, category: 'Fruit' },
    'mango': { calories: 60, protein: 0.8, carbs: 15, fat: 0.4, category: 'Fruit' },
    'grapes': { calories: 69, protein: 0.7, carbs: 18, fat: 0.2, category: 'Fruit' },
    'watermelon': { calories: 30, protein: 0.6, carbs: 8, fat: 0.2, category: 'Fruit' },
    'strawberry': { calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3, category: 'Fruit' },

    // Dairy
    'milk': { calories: 42, protein: 3.4, carbs: 5, fat: 1, category: 'Dairy' },
    'yogurt': { calories: 59, protein: 10, carbs: 3.6, fat: 0.4, category: 'Dairy' },
    'cheese': { calories: 402, protein: 25, carbs: 1.3, fat: 33, category: 'Dairy' },
    'butter': { calories: 717, protein: 0.9, carbs: 0.1, fat: 81, category: 'Dairy' },
    'cream': { calories: 340, protein: 2.2, carbs: 2.8, fat: 36, category: 'Dairy' },

    // Nuts & Seeds
    'almonds': { calories: 579, protein: 21, carbs: 22, fat: 50, category: 'Nuts' },
    'peanuts': { calories: 567, protein: 26, carbs: 16, fat: 49, category: 'Nuts' },
    'cashews': { calories: 553, protein: 18, carbs: 30, fat: 44, category: 'Nuts' },
    'walnuts': { calories: 654, protein: 15, carbs: 14, fat: 65, category: 'Nuts' },

    // Oils & Fats
    'olive oil': { calories: 884, protein: 0, carbs: 0, fat: 100, category: 'Oil' },
    'coconut oil': { calories: 862, protein: 0, carbs: 0, fat: 100, category: 'Oil' },

    // Pakistani Dishes (approximate)
    'biryani': { calories: 200, protein: 8, carbs: 30, fat: 5, category: 'Dish' },
    'nihari': { calories: 250, protein: 15, carbs: 10, fat: 18, category: 'Dish' },
    'haleem': { calories: 180, protein: 12, carbs: 20, fat: 6, category: 'Dish' },
    'tikka': { calories: 220, protein: 20, carbs: 5, fat: 14, category: 'Dish' },
    'samosa': { calories: 252, protein: 5, carbs: 24, fat: 15, category: 'Snack' },
    'pakora': { calories: 165, protein: 4, carbs: 18, fat: 8, category: 'Snack' }
};

/**
 * Search for food in database (fuzzy matching)
 */
export function searchFood(query) {
    const lowerQuery = query.toLowerCase();
    const results = [];

    for (const [name, data] of Object.entries(calorieDatabase)) {
        if (name.includes(lowerQuery)) {
            results.push({ name, ...data });
        }
    }

    return results;
}

/**
 * Calculate calories for a given food and quantity
 */
export function calculateCalories(foodName, grams) {
    const food = calorieDatabase[foodName.toLowerCase()];
    if (!food) return null;

    const multiplier = grams / 100;
    return {
        name: foodName,
        grams,
        calories: Math.round(food.calories * multiplier),
        protein: Math.round(food.protein * multiplier * 10) / 10,
        carbs: Math.round(food.carbs * multiplier * 10) / 10,
        fat: Math.round(food.fat * multiplier * 10) / 10,
        category: food.category
    };
}
