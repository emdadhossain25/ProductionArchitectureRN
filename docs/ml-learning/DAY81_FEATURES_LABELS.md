# Day 81: Features and Labels

## What Are Features?

Features are the input variables that describe your data. Think of them as the characteristics you measure to make a prediction.

House Price Example:
```
Features (Input):
- Number of bedrooms: 3
- Square footage: 2000
- Location: Downtown
- Age of house: 10 years
- Number of bathrooms: 2

Label (Output):
- Price: $400,000
```

The model learns: Given these features, predict the price.

## What Are Labels?

Labels are the answers or outputs you want to predict. In supervised learning, you provide labels during training so the model can learn the relationship between features and labels.

Types of Labels:

Regression (continuous numbers):
- House price: $250,000
- Temperature: 72.5°F
- Stock price: $150.23

Classification (categories):
- Email: spam or not spam
- Image: cat, dog, or bird
- Disease: healthy or sick

## Feature Types in Detail

### 1. Raw Features
Direct measurements from data

Email spam detection:
- Number of words
- Number of exclamation marks
- Sender email domain
- Email length in characters
- Time sent

### 2. Derived Features
Calculated from raw features

Email spam example:
```
Raw: Number of exclamation marks = 5
Raw: Total words = 100
Derived: Exclamation density = 5/100 = 0.05
```

House price example:
```
Raw: Square footage = 2000
Raw: Number of bedrooms = 3
Derived: Square feet per bedroom = 2000/3 = 667
```

### 3. Engineered Features
Creative combinations that add value

Date features:
```
Raw: Date = "2024-03-15"

Engineered features:
- Is_weekend: No
- Month: March (3)
- Quarter: Q1
- Days_until_holiday: 20
- Season: Spring
```

Text features:
```
Raw: Product review = "This phone is amazing and fast"

Engineered features:
- Word_count: 6
- Contains_positive_word: Yes ("amazing")
- Sentiment_score: 0.9 (positive)
- Has_speed_mention: Yes ("fast")
```

## Good Features vs Bad Features

### Good Features

Relevant to the prediction:
```
Predicting house price:
✓ Square footage (bigger = more expensive)
✓ Location (downtown = more expensive)
✓ Number of bedrooms (more = expensive)
```

Independent from each other:
```
✓ Square footage
✓ Number of bedrooms
✗ Square footage in meters (duplicate of sqft)
```

Available at prediction time:
```
Predicting tomorrow's stock price:
✓ Today's price (available)
✓ Yesterday's volume (available)
✗ Tomorrow's news (not available yet)
```

### Bad Features

Irrelevant to prediction:
```
Predicting house price:
✗ Owner's favorite color
✗ House number (123 vs 456)
✗ Owner's birthday
```

Data leakage (contains answer):
```
Predicting loan default:
✗ Payment_status (this reveals if they defaulted)
✗ Collection_calls (only happens after default)
```

Too many missing values:
```
10,000 houses in dataset
Feature "Attic_size" only available for 50 houses
→ Bad feature, too much missing data
```

## Feature Selection Process

### Step 1: Start with All Possible Features
```
House price prediction:
- Bedrooms
- Bathrooms
- Square footage
- Lot size
- Age
- Garage spaces
- Pool (yes/no)
- School rating
- Crime rate
- Distance to downtown
```

### Step 2: Remove Irrelevant Features
```
Remove:
- House number (not related to price)
- Owner name (not related to price)
- Street name (use location instead)
```

### Step 3: Check Correlation with Label
```
High correlation (keep):
- Square footage ↔ Price: 0.85
- Location ↔ Price: 0.78
- School rating ↔ Price: 0.72

Low correlation (consider removing):
- Paint color ↔ Price: 0.05
- Garage door brand ↔ Price: 0.02
```

### Step 4: Remove Duplicate Information
```
Keep one of these:
- Square footage in sqft: 2000
- Square footage in sqm: 186
(Both measure same thing)
```

### Step 5: Test and Iterate
```
Start: 20 features → 75% accuracy
Remove 5 weak features → 78% accuracy
Add 2 engineered features → 82% accuracy
```

## Feature Scaling

Why scale features:

Problem:
```
House price prediction:
- Bedrooms: 1 to 5 (small range)
- Square footage: 500 to 5000 (large range)
- Age: 0 to 100 (medium range)

Model gives too much weight to large numbers
```

Solution - Normalization (0 to 1):
```
Bedrooms: 3 → (3-1)/(5-1) = 0.5
Square footage: 2000 → (2000-500)/(5000-500) = 0.33
Age: 10 → (10-0)/(100-0) = 0.1
```

Solution - Standardization (mean=0, std=1):
```
Bedrooms: 3 → (3 - 2.5) / 1.2 = 0.42
Square footage: 2000 → (2000 - 2250) / 1300 = -0.19
Age: 10 → (10 - 50) / 28 = -1.43
```

## Feature Engineering Examples

### Text to Features

Review: "This product is amazing"
```
Features:
- Word_count: 4
- Character_count: 24
- Positive_words: 1 ("amazing")
- Negative_words: 0
- Sentiment_score: 0.9
- Contains_exclamation: No
```

### Time to Features

Timestamp: "2024-03-15 14:30:00"
```
Features:
- Year: 2024
- Month: 3
- Day: 15
- Hour: 14
- Day_of_week: Friday (5)
- Is_weekend: 0
- Is_business_hours: 1
- Quarter: 1
```

### Location to Features

Address: "123 Main St, New York, NY"
```
Features:
- City: New York
- State: NY
- Latitude: 40.7128
- Longitude: -74.0060
- Population_density: High
- Median_income: $65,000
- Crime_rate: 0.04
```

## Label Types and Encoding

### Binary Classification

Two possible outcomes:
```
Email: [Spam, Not Spam]
Encode as: [1, 0]

Disease: [Sick, Healthy]
Encode as: [1, 0]
```

### Multi-class Classification

Multiple categories (one at a time):
```
Animal: [Cat, Dog, Bird]
Encode as:
Cat:  [1, 0, 0]
Dog:  [0, 1, 0]
Bird: [0, 0, 1]
```

### Multi-label Classification

Multiple categories can be true simultaneously:
```
Movie genres: [Action, Comedy, Drama]
Movie 1: Action + Comedy → [1, 1, 0]
Movie 2: Drama only → [0, 0, 1]
Movie 3: All three → [1, 1, 1]
```

### Regression

Continuous numbers:
```
House price: $425,000 (any number)
Temperature: 72.5°F (any decimal)
Stock price: $150.23 (any positive number)
```

## Common Mistakes

### Mistake 1: Too Many Features
```
Problem: 100 features, 200 examples
Model overfits, memorizes training data
Can't generalize to new data

Solution: Feature selection, remove weak features
```

### Mistake 2: Irrelevant Features
```
Predicting student grades:
✗ Shoe size (not related)
✗ Hair color (not related)
✓ Study hours (related)
✓ Previous grades (related)
```

### Mistake 3: Data Leakage
```
Predicting loan default:
✗ Using "default_flag" as feature (this IS the label)
✗ Using "payment_received" (only known after outcome)
```

### Mistake 4: Not Scaling
```
Feature 1: 0.001 to 0.005
Feature 2: 1000 to 5000

Feature 2 dominates because numbers are bigger
Model ignores Feature 1

Solution: Scale both to 0-1 range
```

## Mobile App Feature Examples

User Activity Prediction:
```
Features:
- Session_duration: 5 minutes
- Screens_viewed: 8
- Buttons_clicked: 12
- Time_of_day: 14 (2 PM)
- Day_of_week: 5 (Friday)
- Device_type: iPhone
- App_version: 1.0.2
- Days_since_install: 15

Label:
- Will_return_tomorrow: Yes/No
```

Push Notification Engagement:
```
Features:
- Previous_open_rate: 0.45
- Time_since_last_notification: 3 hours
- User_active_last_hour: No
- Notification_type: Promotional
- Day_of_week: Monday
- Time_of_day: Morning

Label:
- Will_open_notification: Yes/No
```

## Key Takeaways

1. Features are inputs, labels are outputs
2. Good features are relevant, independent, available
3. Feature engineering can improve accuracy significantly
4. Always scale features to similar ranges
5. Remove irrelevant and duplicate features
6. Test different feature combinations
7. More features is not always better
8. Avoid data leakage at all costs

Tomorrow: Training and Testing Models

