# Overfitting vs Underfitting Diagnosis

## Quick Diagnosis

Check training and test errors:

Both errors high:
→ Underfitting
→ Model too simple

Training low, test high:
→ Overfitting
→ Model too complex

Both errors low and similar:
→ Good fit
→ Keep this model

## Solutions at a Glance

Underfitting fixes:
- Use more complex algorithm
- Add more features
- Remove regularization
- Train longer
- Increase model capacity

Overfitting fixes:
- Get more training data
- Reduce model complexity
- Remove irrelevant features
- Add regularization
- Early stopping
- Cross-validation
- Ensemble methods

## Visual Patterns

Underfitting:
Training: ████████░░ 80%
Test:     ████████░░ 78%
Gap: Small, both high

Good fit:
Training: ████████████████░░ 92%
Test:     ████████████████░░ 90%
Gap: Small, both low

Overfitting:
Training: ███████████████████░ 98%
Test:     ████████░░░░░░░░░░░░ 65%
Gap: Large

## Learning Curve Patterns

Plot error vs epochs:

Underfitting:
Both lines high and flat (not learning)

Good fit:
Both lines decrease and converge

Overfitting:
Training decreases, validation increases

## Prevention Checklist

Before training:
- [ ] Sufficient training data (100+ examples minimum)
- [ ] Features relevant and not redundant
- [ ] Appropriate algorithm for problem complexity
- [ ] Validation set prepared

During training:
- [ ] Monitor both training and validation error
- [ ] Watch for divergence
- [ ] Save best model (by validation)
- [ ] Stop if validation error increases

After training:
- [ ] Test on held-out test set
- [ ] Compare to baseline
- [ ] Check error gap
- [ ] Validate on new data

