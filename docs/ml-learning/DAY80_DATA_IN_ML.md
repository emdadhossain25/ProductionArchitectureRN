# Day 80: Data - The Fuel of Machine Learning

## Why Data Matters

Machine learning models are only as good as the data they learn from.

Garbage In = Garbage Out

Good data leads to accurate predictions. Bad data leads to wrong predictions no matter how good your algorithm is.

## Data Types

### 1. Numerical Data
Numbers that represent quantities

Continuous (can be any value):
- House price: $250,000, $300,500, $425,750
- Temperature: 72.5°F, 85.3°F, 60.1°F
- Weight: 150.2 lbs, 180.7 lbs

Discrete (specific values only):
- Number of bedrooms: 1, 2, 3, 4
- Age: 25, 30, 45 years
- Rating: 1, 2, 3, 4, 5 stars

### 2. Categorical Data
Categories or groups

Nominal (no order):
- Color: red, blue, green
- City: New York, London, Tokyo
- Brand: Apple, Samsung, Google

Ordinal (has order):
- Education: High School, Bachelor, Master, PhD
- Size: Small, Medium, Large
- Rating: Poor, Fair, Good, Excellent

### 3. Text Data
Written language

Examples:
- Product reviews: "This phone is amazing"
- Email content: spam detection
- Social media posts: sentiment analysis

Need special processing to convert to numbers.

### 4. Image Data
Visual information as pixels

Examples:
- Photo: 1920x1080 pixels, each with RGB values
- Medical scan: X-ray, MRI images
- Face recognition: facial features

Each pixel is a number representing color/brightness.

### 5. Time Series Data
Data collected over time

Examples:
- Stock prices: daily closing prices
- Weather: hourly temperature readings
- Sales: monthly revenue figures

Order matters - cannot shuffle randomly.

## Data Quality Issues

### 1. Missing Values

Problem:
```
House 1: 3 bedrooms, 2000 sqft, $400k
House 2: 4 bedrooms, ????, $500k  ← missing size
House 3: ??? bedrooms, 1800 sqft, $350k  ← missing bedrooms
```

Solutions:
- Remove rows with missing data
- Fill with average value (2000 sqft average)
- Fill with most common value (3 bedrooms most common)
- Use advanced imputation methods

### 2. Outliers

Problem:
```
Normal houses: $200k, $250k, $300k, $350k
Outlier: $50 million  ← mansion or data error?
```

Effects:
- Skews predictions
- Model learns wrong patterns

Solutions:
- Remove if data error
- Keep if legitimate (mansion is real)
- Transform data (use log scale)

### 3. Duplicate Data

Problem:
```
House A: 3 bed, 2000 sqft, $400k
House A: 3 bed, 2000 sqft, $400k  ← duplicate
```

Effects:
- Model gives too much weight to duplicates
- Biased predictions

Solution:
- Remove duplicate entries

### 4. Inconsistent Data

Problem:
```
City: "New York", "NY", "new york", "NEW YORK"
All same city, different formats
```

Solution:
- Standardize to one format: "New York"

### 5. Imbalanced Data

Problem:
```
Email dataset:
- Normal emails: 9,900
- Spam emails: 100

Model learns to predict everything as normal (99% accuracy but useless)
```

Solutions:
- Collect more spam examples
- Duplicate spam examples (oversampling)
- Remove some normal examples (undersampling)
- Use special algorithms for imbalanced data

## Data Preparation Steps

### Step 1: Data Collection
Where to get data:
- Public datasets (Kaggle, UCI)
- Company databases
- Web scraping
- Sensors/IoT devices
- User interactions in app

### Step 2: Data Cleaning

Remove duplicates:
```
Before: 10,000 rows
After: 9,500 rows (500 duplicates removed)
```

Handle missing values:
```
Bedrooms: Fill with median (3 bedrooms)
Price: Remove rows (too important to guess)
```

Fix inconsistencies:
```
"NY" → "New York"
"1/1/2024" and "Jan 1 2024" → "2024-01-01"
```

### Step 3: Feature Engineering
Create new useful features from existing data:

Original data:
```
Height: 180 cm
Weight: 80 kg
```

New feature:
```
BMI = Weight / (Height/100)² = 24.7
```

Date feature engineering:
```
Date: "2024-03-15"
→ Year: 2024
→ Month: 3
→ Day: 15
→ Day of week: Friday
→ Is weekend: No
```

### Step 4: Data Transformation

Normalization (scale to 0-1):
```
House sizes: 1000, 2000, 3000 sqft
Normalized: 0.0, 0.5, 1.0
```

Standardization (mean=0, std=1):
```
Prices: $200k, $300k, $400k
Standardized: -1, 0, +1
```

Why transform:
- Algorithms work better with similar scales
- Faster training
- Better accuracy

### Step 5: Encoding Categorical Data

One-Hot Encoding:
```
Color: Red, Blue, Green

Becomes:
Is_Red  Is_Blue  Is_Green
1       0        0         (Red)
0       1        0         (Blue)
0       0        1         (Green)
```

Label Encoding (for ordered categories):
```
Education: High School, Bachelor, Master, PhD

Becomes:
0, 1, 2, 3
```

## How Much Data Do You Need?

Rules of thumb:

Simple problems:
- 100-1,000 examples
- Example: Predict house price from size

Medium complexity:
- 1,000-100,000 examples
- Example: Image classification (10 categories)

Complex problems:
- 100,000-1,000,000+ examples
- Example: Speech recognition, language translation

More data usually helps, but quality matters more than quantity.

1,000 high-quality examples > 100,000 poor-quality examples

## Data Split Strategy

Training Set (70%):
- Used to train the model
- Model learns patterns from this data

Validation Set (15%):
- Used during training to tune settings
- Helps prevent overfitting

Test Set (15%):
- Used only at the end
- Measures final accuracy
- Model has never seen this data

Example with 1,000 houses:
- Train: 700 houses
- Validation: 150 houses
- Test: 150 houses

## Mobile App Data Collection

User interactions:
- Button clicks
- Screen views
- Time spent
- Search queries

Device sensors:
- GPS location
- Accelerometer (movement)
- Camera (photos)
- Microphone (voice)

Best practices:
- Ask permission
- Explain why you need data
- Allow opt-out
- Respect privacy
- Secure storage

## Key Takeaways

1. Data quality is critical
2. Clean data before training
3. Different data types need different handling
4. Feature engineering improves models
5. More data helps, but quality matters most
6. Always split data for training and testing
7. Handle missing values and outliers
8. Balance your dataset

Tomorrow: Features and Labels in detail

