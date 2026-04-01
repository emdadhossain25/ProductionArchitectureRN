# Feature Engineering Quick Guide

## From Raw to Useful Features

### Numerical Features

Direct use:
- Age, Price, Count, Rating

Transformations:
- Log: log(price) for skewed data
- Square: area² for relationships
- Binning: age → age_group (0-18, 19-35, 36-50, 51+)

### Categorical Features

Encoding methods:
- One-hot: Color [Red, Blue, Green] → [1,0,0], [0,1,0], [0,0,1]
- Label: Size [S, M, L] → [0, 1, 2]
- Frequency: Replace with count of occurrences

### Date/Time Features

Extractions:
- Year, Month, Day, Hour, Minute
- Day of week (0-6)
- Is weekend (0 or 1)
- Quarter (Q1, Q2, Q3, Q4)
- Days until event
- Season

### Text Features

Basic:
- Word count
- Character count
- Average word length

Advanced:
- Sentiment score
- Keyword presence
- Language detected

### Location Features

From address:
- City, State, Zip
- Latitude, Longitude
- Distance to point of interest
- Population density
- Median income of area

## Feature Selection Checklist

Ask these questions:
- [ ] Is it relevant to the prediction?
- [ ] Is it available at prediction time?
- [ ] Does it have too many missing values?
- [ ] Is it duplicate of another feature?
- [ ] Does it leak information about the label?

Remove if:
- Correlation with label < 0.1
- Missing in > 50% of data
- Constant value across all examples
- Perfect correlation with another feature

## Scaling Methods

When to use:
- Normalization (0-1): Tree-based models
- Standardization (mean=0, std=1): Linear models, neural networks
- No scaling: Tree-based models can work without it

Formula:
```
Normalization: (x - min) / (max - min)
Standardization: (x - mean) / std
```

## Common Patterns

Ratios:
- Price per square foot
- Revenue per employee
- Clicks per impression

Interactions:
- Feature1 × Feature2
- Feature1 + Feature2
- Feature1 / Feature2

Aggregations:
- Average over time window
- Sum over category
- Count of occurrences

