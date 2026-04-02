# Day 82: Training and Testing Models

## The Learning Process

Machine learning models learn by finding patterns in data. The training phase adjusts internal parameters to minimize prediction errors.

Simple analogy:
```
Learning to ride a bike:
- Try riding (make prediction)
- Fall or wobble (error)
- Adjust balance (update parameters)
- Try again (next iteration)
- Repeat until you can ride smoothly
```

## Training Phase

### What Happens During Training

Step 1: Initialize
```
Model starts with random guesses
House price prediction: Start with random formula
Price = (bedrooms × 50000) + random_number
First guess is terrible
```

Step 2: Make Predictions
```
House 1: 3 bedrooms, actual price $400k
Prediction: 3 × 50000 = $150k
Error: $400k - $150k = $250k off
```

Step 3: Calculate Error
```
How wrong was the prediction?
Error = Actual - Predicted
Large error = bad prediction
Small error = good prediction
```

Step 4: Adjust Parameters
```
Model adjusts its formula:
Old: Price = bedrooms × 50000
New: Price = bedrooms × 120000
(Increased multiplier to reduce error)
```

Step 5: Repeat
```
Go through all training examples
Adjust parameters after each example
Or adjust after seeing a batch of examples
Continue for many iterations (epochs)
```

### Training Terminology

Epoch: One complete pass through all training data
```
1000 houses in training set
1 epoch = model sees all 1000 houses once
10 epochs = model sees all 1000 houses ten times
```

Batch: Subset of data processed together
```
1000 houses, batch size 100
10 batches per epoch
Update parameters after each batch
```

Learning Rate: How much to adjust parameters
```
High learning rate: Big adjustments, faster but risky
Learning rate 0.1: Adjust parameters by 10%

Low learning rate: Small adjustments, slower but stable
Learning rate 0.001: Adjust parameters by 0.1%
```

Loss Function: Measures prediction error
```
Mean Squared Error for regression:
Loss = average of (actual - predicted)²

Small loss = good predictions
Large loss = bad predictions
```

## The Data Split

### Why Split Data?

Problem without split:
```
Train on 1000 houses
Test on same 1000 houses
Model has seen all answers
Like taking an exam with answer key
100% accuracy but useless on new houses
```

Solution with split:
```
Total: 1000 houses
Train: 700 houses (70%)
Validation: 150 houses (15%)
Test: 150 houses (15%)

Model learns from 700
Tunes using 150 validation
Final evaluation on 150 test (never seen before)
```

### Training Set (70%)

Purpose: Model learns patterns
```
700 houses with features and prices
Model adjusts parameters to predict these prices
Sees this data multiple times (epochs)
```

### Validation Set (15%)

Purpose: Tune model settings during training
```
150 houses model has not trained on
Check performance after each epoch
Decide when to stop training
Select best model configuration
```

Example usage:
```
After epoch 1: Validation accuracy 60%
After epoch 5: Validation accuracy 75%
After epoch 10: Validation accuracy 82%
After epoch 15: Validation accuracy 81% (getting worse)

Stop at epoch 10 (best validation performance)
```

### Test Set (15%)

Purpose: Final evaluation only
```
150 houses completely unseen
Used once at the very end
Measures real-world performance
Never use for training or tuning
```

## Training Example: House Price Prediction

### Initial State
```
Training data: 700 houses
Model formula: Price = w1×bedrooms + w2×sqft + w3×age + b
Parameters: w1=0, w2=0, w3=0, b=0 (random start)
```

### Epoch 1
```
House 1: 3 bed, 2000 sqft, 10 years old, actual $400k
Prediction: 0×3 + 0×2000 + 0×10 + 0 = $0
Error: Very high
Adjust: w1=80000, w2=150, w3=-5000, b=50000

House 2: 4 bed, 2500 sqft, 5 years old, actual $550k
Prediction: 80000×4 + 150×2500 + (-5000)×5 + 50000 = $720k
Error: $550k - $720k = -$170k (overestimated)
Adjust parameters again

Continue for all 700 houses
Average error after epoch 1: $180k
```

### Epoch 5
```
Parameters have been adjusted many times
Average error: $85k (much better)
Validation error: $90k
```

### Epoch 10
```
Average training error: $45k
Validation error: $48k
Model is learning well
```

### Epoch 20
```
Training error: $30k (still improving)
Validation error: $55k (getting worse)
Warning: Overfitting
Stop training here
```

### Final Test
```
Test on 150 unseen houses
Average error: $52k
This is the real-world performance
```

## Evaluation Metrics

### For Regression (predicting numbers)

Mean Absolute Error (MAE):
```
Predictions: $380k, $420k, $390k
Actual:      $400k, $450k, $380k
Errors:      $20k,  $30k,  $10k
MAE = (20 + 30 + 10) / 3 = $20k average error
```

Mean Squared Error (MSE):
```
Same predictions and actuals
Errors squared: 400, 900, 100
MSE = (400 + 900 + 100) / 3 = 467
Penalizes large errors more
```

R-squared (R²):
```
Measures how well model explains variance
R² = 1.0: Perfect predictions
R² = 0.8: Explains 80% of variance (good)
R² = 0.0: No better than average guess
```

### For Classification (predicting categories)

Accuracy:
```
100 emails classified
90 correct predictions
10 wrong predictions
Accuracy = 90/100 = 90%
```

Precision:
```
Spam classifier predicted 80 emails as spam
70 were actually spam, 10 were normal
Precision = 70/80 = 87.5%
"Of emails marked spam, how many were correct?"
```

Recall:
```
100 actual spam emails in test set
Classifier caught 70 of them
Missed 30 spam emails
Recall = 70/100 = 70%
"Of all spam emails, how many did we catch?"
```

F1 Score:
```
Balances precision and recall
F1 = 2 × (Precision × Recall) / (Precision + Recall)
F1 = 2 × (0.875 × 0.70) / (0.875 + 0.70) = 0.78
```

Confusion Matrix:
```
              Predicted
              Spam  Normal
Actual Spam   70    30      (70 correct, 30 missed)
       Normal 10    90      (10 false alarms, 90 correct)
```

## Overfitting vs Underfitting

### Underfitting (Model too simple)
```
Linear model for complex pattern
Training error: High
Test error: High
Both perform poorly

Example:
Predicting house prices with only bedrooms
Ignoring size, location, age
Model too simple to capture patterns
```

### Good Fit (Just right)
```
Model complexity matches problem
Training error: Low
Test error: Low (similar to training)
Generalizes well to new data
```

### Overfitting (Model too complex)
```
Model memorizes training data
Training error: Very low
Test error: High
Poor generalization

Example:
Model learns "House at 123 Main St = $400k"
Instead of learning general patterns
Fails on new addresses
```

## Preventing Overfitting

### 1. More Training Data
```
Small dataset: 100 houses → overfits easily
Large dataset: 10,000 houses → harder to memorize
```

### 2. Regularization
```
Penalize complex models
Force simpler patterns
Add penalty term to loss function
```

### 3. Early Stopping
```
Monitor validation error
Stop when it starts increasing
Don't train too long
```

### 4. Dropout (for neural networks)
```
Randomly disable neurons during training
Forces model to not rely on specific patterns
Prevents memorization
```

### 5. Cross-Validation
```
Split data into 5 parts
Train on 4 parts, validate on 1
Rotate which part is validation
Average results across all 5 splits
More reliable performance estimate
```

## Training Best Practices

### 1. Shuffle Data
```
Before splitting, randomize order
Prevents patterns from data collection
Ensures representative splits
```

### 2. Monitor Both Errors
```
Track training error (should decrease)
Track validation error (should decrease then plateau)
If validation increases while training decreases: overfitting
```

### 3. Save Best Model
```
Not the final model
The model with best validation performance
May be from epoch 10, not epoch 20
```

### 4. Learning Rate Schedule
```
Start with higher learning rate
Gradually decrease over time
Fast learning initially
Fine-tuning later
```

### 5. Batch Size Selection
```
Small batches (32): Noisy updates, slower
Large batches (512): Smooth updates, faster
Medium batches (128): Good balance
```

## Mobile ML Training Considerations

### On-Device Training
```
Pros:
- Private (data never leaves device)
- Works offline
- Personalized to user

Cons:
- Limited compute power
- Battery drain
- Storage constraints

Use for: Simple models, personalization
```

### Cloud Training
```
Pros:
- Powerful servers
- Large models possible
- Can train on massive datasets

Cons:
- Requires internet
- Privacy concerns
- Server costs

Use for: Complex models, initial training
```

### Federated Learning
```
Hybrid approach:
1. Train on device with user data
2. Send only model updates to server
3. Server combines updates from many users
4. Send improved model back to devices

Benefits:
- Privacy preserved
- Learns from all users
- No raw data shared
```

## Key Takeaways

1. Training adjusts parameters to minimize errors
2. Always split data: train, validation, test
3. Validation helps tune and prevent overfitting
4. Test set measures real-world performance
5. Multiple metrics tell complete story
6. Overfitting memorizes, underfitting oversimplifies
7. Monitor both training and validation errors
8. Stop when validation error stops improving
9. More data usually helps prevent overfitting
10. Choose metrics that match your goal

Tomorrow: Common ML Algorithms

