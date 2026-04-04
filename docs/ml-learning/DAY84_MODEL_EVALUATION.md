# Day 84: Model Evaluation and Metrics

## Why Evaluation Matters

You cannot improve what you cannot measure. Proper evaluation tells you if your model is actually useful in production.

Bad evaluation leads to:
- Deploying models that fail in real world
- Choosing wrong algorithm
- Wasting time on irrelevant improvements
- Missing critical edge cases

Good evaluation provides:
- Confidence in model performance
- Comparison between different approaches
- Understanding of failure modes
- Guidance for improvements

## Regression Metrics (Predicting Numbers)

### 1. Mean Absolute Error (MAE)

What it measures:
Average absolute difference between predictions and actual values.

Formula:
MAE = (|actual1 - predicted1| + |actual2 - predicted2| + ...) / n

Example:
House 1: Actual $400k, Predicted $380k, Error: $20k
House 2: Actual $300k, Predicted $330k, Error: $30k
House 3: Actual $500k, Predicted $485k, Error: $15k
MAE = (20k + 30k + 15k) / 3 = $21.67k

Interpretation:
MAE = $21.67k means:
On average, predictions are off by $21,670
Easy to understand in original units

When to use:
- Want interpretable metric in original units
- All errors should be weighted equally
- Outliers should not dominate metric

Pros:
- Easy to understand
- Same units as target variable
- Robust to outliers

Cons:
- Does not penalize large errors more
- Cannot differentiate model improvements well

### 2. Mean Squared Error (MSE)

What it measures:
Average of squared differences between predictions and actual values.

Formula:
MSE = ((actual1 - predicted1)² + (actual2 - predicted2)² + ...) / n

Example:
House 1: Error $20k → Squared: 400 million
House 2: Error $30k → Squared: 900 million
House 3: Error $15k → Squared: 225 million
MSE = (400M + 900M + 225M) / 3 = 508.33 million

Interpretation:
MSE = 508.33M
Hard to interpret directly (squared units)
Use Root MSE (RMSE) for interpretation
RMSE = √508.33M = $22,546

When to use:
- Want to penalize large errors heavily
- Mathematical optimization (gradient descent)
- Standard metric for regression

Pros:
- Penalizes large errors more
- Smooth gradient for optimization
- Widely used and understood

Cons:
- Units are squared (less interpretable)
- Sensitive to outliers
- Can be dominated by few large errors

### 3. Root Mean Squared Error (RMSE)

What it measures:
Square root of MSE, returns to original units.

Formula:
RMSE = √MSE

Example:
From previous MSE = 508.33M
RMSE = √508.33M = $22,546

Interpretation:
RMSE = $22,546 means:
Standard deviation of errors is $22,546
Roughly 68% of predictions within ±$22,546

When to use:
- Same as MSE but want interpretable units
- Compare models on same problem
- Understand typical error magnitude

### 4. R-squared (R² or Coefficient of Determination)

What it measures:
Proportion of variance in target explained by model.

Formula:
R² = 1 - (Sum of squared errors / Total variance)

Range:
R² = 1.0: Perfect predictions
R² = 0.8: Explains 80% of variance (good)
R² = 0.5: Explains 50% of variance (moderate)
R² = 0.0: No better than predicting mean
R² < 0.0: Worse than predicting mean

Example:
Actual prices: $300k, $400k, $500k
Mean: $400k
Baseline (always predict mean):
Errors: $100k, $0k, $100k
Total squared error: 20,000M
Your model predictions: $310k, $390k, $510k
Errors: $10k, $10k, $10k
Total squared error: 300M
R² = 1 - (300M / 20,000M) = 0.985
Model explains 98.5% of variance

When to use:
- Want scale-independent metric
- Compare models on different datasets
- Understand model explanatory power

Pros:
- Scale-independent (0 to 1 range)
- Easy to interpret as percentage
- Good for comparing models

Cons:
- Can be misleading with small datasets
- Always increases with more features
- Not suitable for all regression types

## Classification Metrics (Predicting Categories)

### Understanding Confusion Matrix

Foundation of classification metrics:

Binary classification example (Spam detection):
          Predicted
          Spam    Not Spam
Actual Spam    70        30       Total: 100
Normal  10        90       Total: 100
Total:         80       120       Grand: 200

Key terms:
True Positive (TP): 70 (Correctly identified spam)
False Negative (FN): 30 (Missed spam)
False Positive (FP): 10 (Normal marked as spam)
True Negative (TN): 90 (Correctly identified normal)

### 1. Accuracy

What it measures:
Overall correctness across all predictions.

Formula:
Accuracy = (TP + TN) / (TP + TN + FP + FN)

Example:
Accuracy = (70 + 90) / (70 + 90 + 10 + 30)
= 160 / 200
= 0.80 or 80%

Interpretation:
80% of predictions were correct
20% were wrong

When to use:
- Balanced datasets
- All errors equally important
- Simple baseline metric

Pitfall with imbalanced data:
Dataset: 990 normal emails, 10 spam emails
Naive model: Always predict "normal"
Accuracy = 990/1000 = 99%
But catches 0% of spam (useless)

### 2. Precision

What it measures:
Of all positive predictions, how many were actually positive?

Formula:
Precision = TP / (TP + FP)

Example:
Predicted 80 emails as spam
70 were actually spam
10 were false alarms
Precision = 70 / (70 + 10) = 70/80 = 87.5%

Interpretation:
87.5% of emails marked spam were actually spam
12.5% were false alarms (normal emails)

When to use:
- Cost of false positives is high
- Want to avoid false alarms
- Examples: medical diagnosis, fraud alerts

Real-world impact:
Cancer screening:
High precision = Few false cancer diagnoses
Low precision = Many healthy people alarmed

### 3. Recall (Sensitivity)

What it measures:
Of all actual positives, how many did we catch?

Formula:
Recall = TP / (TP + FN)

Example:
100 actual spam emails in dataset
Caught 70 of them
Missed 30
Recall = 70 / (70 + 30) = 70/100 = 70%

Interpretation:
70% of spam emails were caught
30% slipped through to inbox

When to use:
- Cost of false negatives is high
- Must catch all positives
- Examples: disease screening, fraud detection

Real-world impact:
Spam filter:
High recall = Catches most spam
Low recall = Lots of spam in inbox

### 4. F1 Score

What it measures:
Harmonic mean of precision and recall. Balances both.

Formula:
F1 = 2 × (Precision × Recall) / (Precision + Recall)

Example:
Precision = 87.5%
Recall = 70%
F1 = 2 × (0.875 × 0.70) / (0.875 + 0.70)
= 2 × 0.6125 / 1.575
= 0.778 or 77.8%

When to use:
- Need balance between precision and recall
- Imbalanced datasets
- Single metric to optimize

Trade-off visualization:
High Precision, Low Recall:
Few false alarms, but miss many cases
High Recall, Low Precision:
Catch all cases, but many false alarms
High F1:
Good balance of both

### 5. Specificity

What it measures:
Of all actual negatives, how many did we correctly identify?

Formula:
Specificity = TN / (TN + FP)

Example:
100 normal emails
90 correctly identified as normal
10 incorrectly marked as spam
Specificity = 90 / (90 + 10) = 90%

When to use:
- Important to avoid false positives
- Medical screening (avoid alarming healthy people)
- Security systems (avoid false alerts)

## Choosing the Right Metric

### Regression Decision Tree

Question: What type of errors matter?
- All errors equal → MAE
- Large errors bad → RMSE
- Want percentage → R²

Question: Need to compare across datasets?
- Yes → R²
- No → MAE or RMSE

### Classification Decision Tree

Question: Is dataset balanced?
- Yes → Accuracy is fine
- No → Use Precision, Recall, or F1

Question: Which error is worse?
- False Positives worse → Optimize Precision
- False Negatives worse → Optimize Recall
- Both equally bad → Optimize F1

Question: Multi-class problem?
- Yes → Macro or Weighted F1
- No → Standard metrics

## Real-World Metric Examples

### Spam Email Filter
Priority: Catch spam (high recall)
Acceptable: Some false positives
Primary metric: Recall
Secondary: Precision
Goal: Recall > 95%, Precision > 80%

### Medical Diagnosis (Cancer)
Priority: Catch all cases (high recall)
Critical: Avoid false alarms (high precision)
Primary metric: F1 Score
Secondary: Recall
Goal: F1 > 90%, Recall > 95%

### Fraud Detection
Priority: Catch fraud (high recall)
Also important: Avoid blocking legitimate transactions (precision)
Primary metric: F1 Score
Monitor: Precision and Recall separately
Goal: F1 > 85%

### House Price Prediction
Priority: Accurate predictions
Context: Dollars matter
Primary metric: RMSE (in dollars)
Secondary: R² (overall fit)
Goal: RMSE < $50k, R² > 0.85

## Baseline Comparisons

Always compare against simple baselines:

### Regression Baseline
Always predict mean value:
Houses average $400k
Baseline: Predict $400k for all houses
Your model must beat this

### Classification Baseline
Always predict majority class:
90% of emails are normal
Baseline accuracy: 90%
Your model must beat this

### Previous Model Baseline
If improving existing model:
Old model: 85% accuracy
New model must: > 85% accuracy
Meaningful improvement: > 87%

## Cross-Validation

More reliable evaluation than single train-test split.

### K-Fold Cross-Validation

Process:
Split data into 5 parts (folds)
Iteration 1: Train on folds 1,2,3,4 → Test on fold 5
Iteration 2: Train on folds 1,2,3,5 → Test on fold 4
Iteration 3: Train on folds 1,2,4,5 → Test on fold 3
Iteration 4: Train on folds 1,3,4,5 → Test on fold 2
Iteration 5: Train on folds 2,3,4,5 → Test on fold 1
Average results across all 5 iterations

Benefits:
Every data point used for testing once
More reliable performance estimate
Reduces luck from single split
Shows performance variance

Example results:
Fold 1: 85% accuracy
Fold 2: 87% accuracy
Fold 3: 84% accuracy
Fold 4: 86% accuracy
Fold 5: 88% accuracy
Average: 86% ± 1.5%
More confident than single 86% score

## Mobile ML Evaluation Considerations

### On-Device Metrics
Model size: < 10 MB
Inference time: < 100 ms
Memory usage: < 50 MB
Battery impact: Minimal
Accuracy: Good enough for use case

### A/B Testing in Production
Deploy model to 10% of users
Compare against baseline
Measure real-world metrics:

User engagement
Task completion
Error reports
Battery usage


## Key Takeaways

1. Choose metrics matching your business goal
2. Never rely on single metric
3. Always compare to baseline
4. Use cross-validation for reliability
5. Consider class imbalance in classification
6. Regression: RMSE and R² commonly used
7. Classification: F1 balances precision and recall
8. Test on truly unseen data
9. Monitor multiple metrics
10. Real-world performance matters most

Tomorrow: Overfitting and Underfitting Deep Dive

