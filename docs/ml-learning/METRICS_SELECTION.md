# Metrics Selection Quick Guide

## Regression Problems

Predicting house prices:
→ RMSE (dollar errors) + R² (overall fit)

Predicting stock returns:
→ MAE (percentage errors less sensitive to outliers)

General regression:
→ Start with RMSE and R²

## Classification Problems

Balanced classes (50/50 split):
→ Accuracy + F1 Score

Imbalanced classes (90/10 split):
→ Precision, Recall, F1 (ignore accuracy)

Medical diagnosis:
→ Recall primary (catch all cases) + Precision

Spam filtering:
→ Recall primary (catch spam) + Precision

Fraud detection:
→ F1 Score (balance both errors)

## Metric Interpretation

RMSE = $50k:
Predictions off by $50k on average

R² = 0.85:
Model explains 85% of variance

Accuracy = 95%:
95% of predictions correct

Precision = 90%:
90% of positive predictions were correct

Recall = 85%:
Caught 85% of actual positive cases

F1 = 88%:
Good balance of precision and recall

## Red Flags

High accuracy but low F1:
→ Imbalanced data problem

High training accuracy, low test accuracy:
→ Overfitting

Perfect scores (100%):
→ Data leakage or bug

Model worse than baseline:
→ Check data preparation

## Baseline Comparisons

Always measure against:
- Random guessing
- Majority class prediction
- Mean value prediction
- Previous model version
- Simple rule-based system

Your model must beat baseline to be useful.

