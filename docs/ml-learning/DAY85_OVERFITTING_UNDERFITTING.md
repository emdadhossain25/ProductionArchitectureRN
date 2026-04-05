# Day 85: Overfitting and Underfitting

## The Goldilocks Problem

Machine learning models can be too simple, too complex, or just right. Understanding this balance is critical for building useful models.

The goal:
Model that generalizes well to new, unseen data.

## What is Underfitting?

Model is too simple to capture underlying patterns.

Real-world analogy:
Learning to identify dogs:
Underfitting rule: "Has four legs"
Problem:
Cats, horses, and tables also have four legs
Model too simple to distinguish dogs

Housing example:
Predict price using only number of bedrooms
Ignores size, location, condition, age
Model: Price = bedrooms × 100k
3-bedroom mansion downtown: Predicts $300k (actually $800k)
3-bedroom shack in suburb: Predicts $300k (actually $150k)
Too simple, misses important patterns

Characteristics:
Training error: High
Test error: High (similar to training)
Predictions: Consistently inaccurate
Pattern: Cannot fit even training data well

Visual representation:
Data points scattered
Model draws straight line
Line does not follow curve of data
Large gaps between line and points

Why it happens:
Model too simple for problem complexity
Too few features used
Wrong algorithm chosen
Insufficient training time

## What is Overfitting?

Model is too complex and memorizes training data instead of learning patterns.

Real-world analogy:
Learning to identify dogs:
Overfitting rule: "Memorize every dog photo I have seen"
Student 1 seen: Brown dog with collar named Buddy
Student 2 seen: Black dog with spots named Max
...memorizes 1000 specific dogs
Problem:
New brown dog appears
"Not Buddy, so not a dog"
Memorized examples instead of learning general concept

Housing example:
Model learns:
"123 Main Street = $450k"
"456 Oak Avenue = $380k"
Memorizes specific addresses
New house at 789 Pine Road appears
Model has no idea (never seen this address)
Cannot generalize to new data

Characteristics:
Training error: Very low (near perfect)
Test error: High
Gap: Large difference between training and test
Pattern: Memorized training data

Visual representation:
Data points scattered
Model draws wiggly line
Line passes through every training point exactly
Model fails on new points between training points

Why it happens:
Model too complex for amount of data
Too many features (especially irrelevant ones)
Training for too long
Not enough training data
No regularization

## Perfect Fit (Goal)

Model complexity matches problem complexity.

Characteristics:
Training error: Low
Test error: Low (similar to training)
Gap: Small difference between training and test
Pattern: Learned generalizable patterns

Visual representation:
Data points scattered
Model follows general trend
Does not try to hit every point exactly
Works well on new data points

## Detecting Overfitting vs Underfitting

### Learning Curves

Training and validation error over time:

Underfitting pattern:
Epochs:        1    5    10   15   20
Training err: 80%  75%  73%  72%  72%
Validation:   82%  77%  75%  74%  74%
Both errors high and similar
Not learning enough

Good fit pattern:
Epochs:        1    5    10   15   20
Training err: 80%  40%  25%  18%  15%
Validation:   82%  42%  28%  20%  18%
Both errors low and close
Generalizing well

Overfitting pattern:
Epochs:        1    5    10   15   20
Training err: 80%  40%  25%  10%   2%
Validation:   82%  42%  28%  35%  45%
Training keeps improving
Validation gets worse
Memorizing training data

### Performance Gap

Calculate gap between training and test:
Training accuracy: 95%
Test accuracy: 60%
Gap: 35 percentage points
Large gap indicates overfitting

Good gap:
Training: 85%
Test: 82%
Gap: 3 percentage points
Small gap indicates good generalization

## Solutions for Underfitting

### 1. Increase Model Complexity

Use more complex algorithm:
From: Linear Regression
To: Decision Tree or Random Forest
From: Logistic Regression
To: Neural Network

### 2. Add More Features

Include additional relevant information:
Current: Only bedrooms
Add: Square footage, location, age, condition
Current: Only word count
Add: Sender domain, time sent, link count

### 3. Feature Engineering

Create derived features:
Current: Height and Weight separately
Add: BMI = Weight / Height²
Current: Date only
Add: Day of week, is weekend, season, quarter

### 4. Remove Regularization

If using regularization, reduce it:
Current: Strong regularization (large penalty)
Change: Weak regularization (small penalty)

### 5. Train Longer

Increase number of epochs:
Current: 10 epochs
Change: 50 epochs
Monitor validation error

### 6. Reduce Constraints

Remove artificial limitations:
Current: Maximum tree depth = 2
Change: Maximum tree depth = 10
Current: Limited number of neurons
Change: More neurons in network

## Solutions for Overfitting

### 1. Get More Training Data

Most effective solution when possible:
Current: 100 training examples
Goal: 1000 or 10000 examples
More data makes memorization harder
Forces model to learn patterns

Data augmentation when cannot collect more:
Images: Rotate, flip, crop, adjust brightness
Text: Synonym replacement, back-translation
Audio: Add noise, change speed, change pitch

### 2. Reduce Model Complexity

Use simpler algorithm:
From: Deep neural network
To: Random Forest or Logistic Regression
From: Random Forest with 1000 trees
To: Random Forest with 100 trees

Reduce model parameters:
Neural Network: Fewer layers or neurons
Decision Tree: Limit depth or minimum samples

### 3. Feature Selection

Remove irrelevant or redundant features:
Before: 100 features
After: 20 most important features
Remove:

Features with low correlation to target
Duplicate information
Noisy features


### 4. Regularization

Add penalty for model complexity.

L1 Regularization (Lasso):
Encourages some features to have zero weight
Automatic feature selection
Creates sparse models

L2 Regularization (Ridge):
Shrinks all feature weights
Reduces impact of any single feature
Prevents extreme parameter values

Example:
Without regularization:
Feature weights: [1000, 50, 2000, 5, 3000]
Some weights very large
With regularization:
Feature weights: [100, 45, 150, 40, 120]
Weights more balanced

### 5. Early Stopping

Stop training when validation error increases:
Monitor validation error each epoch
Save best model
Stop when validation error increases
Epoch 10: Val error 20% (best so far)
Epoch 15: Val error 22% (getting worse)
Epoch 20: Val error 25% (still worse)
Use model from Epoch 10

### 6. Dropout (Neural Networks)

Randomly disable neurons during training:
Each training step:
Randomly turn off 20% of neurons
Forces network to not rely on specific neurons
Prevents memorization
Creates ensemble effect

### 7. Cross-Validation

Use all data for both training and validation:
5-fold cross-validation
Each fold becomes test set once
Average performance across folds
More reliable than single split

### 8. Ensemble Methods

Combine multiple models:
Train multiple models
Average their predictions
Reduces overfitting of individual models
Random Forest does this automatically
Bagging and boosting also help

## Bias-Variance Tradeoff

Fundamental tradeoff in machine learning.

Bias (Underfitting):
Model assumptions too strong
Cannot capture true pattern
Consistently wrong predictions
High training and test error

Variance (Overfitting):
Model too sensitive to training data
Different training data gives very different model
Unstable predictions
Low training error, high test error

Optimal balance:
Some bias: Model makes reasonable assumptions
Some variance: Model flexible enough to learn
Total error minimized

Visual understanding:
Dartboard analogy:
High bias, low variance:
All darts in same spot (consistent)
But far from bullseye (systematically wrong)
= Underfitting
Low bias, high variance:
Darts scattered around bullseye
Average close to center
But individual darts far off
= Overfitting
Low bias, low variance:
Darts clustered near bullseye
= Good model

## Practical Example: House Price Prediction

### Underfitting scenario:
Model: Price = bedrooms × 100k
Training examples:
House 1: 3 bed, 2000 sqft, downtown → Actual: $600k, Predicted: $300k
House 2: 2 bed, 1500 sqft, suburb → Actual: $200k, Predicted: $200k
House 3: 4 bed, 3000 sqft, downtown → Actual: $800k, Predicted: $400k
Training error: $200k average
Test error: $210k average
Problem: Model too simple, only uses bedrooms
Solution: Add square footage and location features

### Overfitting scenario:
Model learns: Every specific house in training set
Training examples:
"123 Main St, 3 bed, 2000 sqft" = $600k (memorized)
"456 Oak Ave, 2 bed, 1500 sqft" = $200k (memorized)
Training error: $0 (perfect on training data)
Test example:
"789 Pine Rd, 3 bed, 2000 sqft" = ??? (never seen this address)
Test error: $150k average (fails on new houses)
Problem: Memorized training addresses
Solution: Remove address feature, use only generalizable features

### Good fit scenario:
Model learns: Price = (sqft × 200) + (bedrooms × 50k) + location_premium
Training examples:
House 1: 2000 sqft, 3 bed, downtown → Predicted: $610k, Actual: $600k
House 2: 1500 sqft, 2 bed, suburb → Predicted: $205k, Actual: $200k
Training error: $8k average
Test examples:
House A: 2200 sqft, 3 bed, downtown → Predicted: $650k, Actual: $640k
House B: 1800 sqft, 3 bed, suburb → Predicted: $465k, Actual: $475k
Test error: $10k average
Problem: None, generalizes well

## Mobile ML Considerations

### On-Device Constraints

Limited model complexity:
Cannot use very complex models
Risk of underfitting
Solution: Feature engineering to compensate

Small datasets:
Limited on-device data
Risk of overfitting
Solution: Pretrained models, transfer learning

### Federated Learning

Train on many devices:
Each device has limited data (risk of overfitting)
But combined across devices: Large effective dataset
Aggregation reduces overfitting

## Key Takeaways

1. Underfitting: Model too simple for problem
2. Overfitting: Model memorizes instead of learns
3. Goal: Balance complexity with data amount
4. Monitor both training and validation error
5. Large gap between training and test indicates overfitting
6. Both errors high indicates underfitting
7. More data is best cure for overfitting
8. Simpler models less prone to overfitting
9. Regularization helps prevent overfitting
10. Cross-validation gives reliable performance estimate

## ML Learning Series Complete

Days 79-85 Summary:
- Day 79: What is Machine Learning
- Day 80: Data - The Fuel of ML
- Day 81: Features and Labels
- Day 82: Training and Testing
- Day 83: Common ML Algorithms
- Day 84: Model Evaluation Metrics
- Day 85: Overfitting and Underfitting

Next steps: Apply these fundamentals to real projects

