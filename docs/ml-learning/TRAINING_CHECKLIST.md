# Training Process Checklist

## Before Training

Data Preparation:
- [ ] Data split into train/val/test (70/15/15)
- [ ] Data shuffled randomly
- [ ] Features scaled appropriately
- [ ] No data leakage between sets

Model Setup:
- [ ] Algorithm selected
- [ ] Parameters initialized
- [ ] Loss function chosen
- [ ] Learning rate set

## During Training

Monitor:
- [ ] Training loss decreasing
- [ ] Validation loss tracked
- [ ] Training time acceptable
- [ ] No errors or warnings

Watch For:
- [ ] Overfitting (validation worse than training)
- [ ] Underfitting (both errors high)
- [ ] Training plateau (no improvement)

## After Training

Evaluate:
- [ ] Test on held-out test set
- [ ] Calculate multiple metrics
- [ ] Compare to baseline
- [ ] Check performance on edge cases

Save:
- [ ] Best model (by validation)
- [ ] Training history
- [ ] Final metrics
- [ ] Model configuration

## Common Training Issues

Training loss not decreasing:
- Learning rate too high or too low
- Bad initialization
- Data quality issues

Validation loss increasing:
- Overfitting
- Stop training earlier
- Add regularization

Both losses high:
- Underfitting
- Model too simple
- Need more features

## Evaluation Metrics Summary

Regression:
- MAE: Average absolute error
- MSE: Penalizes large errors
- R²: Proportion of variance explained

Classification:
- Accuracy: Overall correctness
- Precision: Correct positive predictions
- Recall: Found positive examples
- F1: Balance of precision and recall

Choose metric based on problem:
- Spam detection: High recall (catch all spam)
- Medical diagnosis: High precision (avoid false alarms)
- General classification: F1 score (balanced)

