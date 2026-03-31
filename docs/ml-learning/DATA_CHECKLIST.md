# Data Quality Checklist

## Before Training

Data Collection:
- [ ] Collected enough examples (100+ minimum)
- [ ] Data represents real-world scenarios
- [ ] Data is recent and relevant
- [ ] Data collection was ethical and legal

Data Inspection:
- [ ] Checked for missing values
- [ ] Identified outliers
- [ ] Found duplicate entries
- [ ] Verified data consistency
- [ ] Checked for imbalanced classes

Data Cleaning:
- [ ] Removed or imputed missing values
- [ ] Handled outliers appropriately
- [ ] Removed duplicates
- [ ] Standardized formats
- [ ] Balanced classes if needed

Feature Engineering:
- [ ] Created useful new features
- [ ] Removed irrelevant features
- [ ] Encoded categorical variables
- [ ] Scaled/normalized numerical features

Data Split:
- [ ] Split into train/validation/test (70/15/15)
- [ ] Ensured random splitting
- [ ] No data leakage between sets

## Common Data Problems

Missing Values:
Options: Remove, fill with mean/median, predict

Outliers:
Check: Is it error or real? Remove or transform

Duplicates:
Action: Remove exact duplicates

Imbalance:
Solutions: Oversample, undersample, special algorithms

Wrong Type:
Fix: Convert text to numbers, dates to features

## Data Types Summary

Numerical: Numbers (prices, sizes, ages)
Categorical: Groups (colors, cities, brands)
Text: Words (reviews, emails, posts)
Image: Pixels (photos, scans)
Time Series: Sequential (stocks, weather)

