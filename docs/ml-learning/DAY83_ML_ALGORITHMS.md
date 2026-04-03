# Day 83: Common Machine Learning Algorithms

## Algorithm Categories

Machine learning algorithms fall into main categories based on what they do and how they learn.

Supervised Learning:
- Regression: Predict numbers
- Classification: Predict categories

Unsupervised Learning:
- Clustering: Group similar items
- Dimensionality Reduction: Simplify data

## Regression Algorithms (Predicting Numbers)

### 1. Linear Regression

How it works:
Finds straight line that best fits data
Formula: y = mx + b
Example: Price = (sqft × 200) + 50000
Simple but powerful for linear relationships

When to use:
- Relationship between features and target is roughly linear
- Need interpretable results
- Fast predictions required

Example use cases:
- House price prediction from size
- Sales forecasting from advertising spend
- Temperature prediction from time

Pros:
- Fast to train
- Easy to understand
- Works well with small datasets
- Interpretable coefficients

Cons:
- Only works for linear relationships
- Sensitive to outliers
- Assumes features are independent

### 2. Decision Tree Regression

How it works:
Creates tree of questions
Question 1: Is sqft > 2000?
Yes → Question 2: Is location downtown?
Yes → Predict $500k
No → Predict $350k
No → Predict $250k
Splits data based on feature values

When to use:
- Non-linear relationships
- Want visual interpretability
- Have categorical and numerical features mixed

Example use cases:
- Property valuation with multiple factors
- Customer lifetime value prediction
- Risk assessment scoring

Pros:
- Handles non-linear relationships
- No need for feature scaling
- Easy to visualize and explain
- Works with mixed data types

Cons:
- Can overfit easily
- Unstable (small data changes affect tree)
- Not great for very smooth relationships

### 3. Random Forest Regression

How it works:
Creates many decision trees
Each tree trained on random subset of data
Final prediction = average of all trees
Tree 1 predicts: $480k
Tree 2 predicts: $520k
Tree 3 predicts: $495k
Average: $498k

When to use:
- Need high accuracy
- Complex relationships in data
- Want to reduce overfitting

Example use cases:
- Stock price prediction
- Demand forecasting
- Credit risk modeling

Pros:
- Very accurate
- Reduces overfitting
- Handles complex relationships
- Works well with default settings

Cons:
- Slower than single tree
- Less interpretable
- Requires more memory

## Classification Algorithms (Predicting Categories)

### 4. Logistic Regression

How it works:
Despite name, used for classification
Predicts probability of category
Spam probability = 0.85 (85% likely spam)
If probability > 0.5: classify as spam

When to use:
- Binary classification (yes/no, spam/not spam)
- Need probability scores
- Want interpretable model

Example use cases:
- Email spam detection
- Customer churn prediction
- Disease diagnosis (healthy/sick)

Pros:
- Outputs probabilities
- Fast predictions
- Works well with linear separation
- Easy to interpret

Cons:
- Assumes linear decision boundary
- Limited to binary or multi-class
- May underperform on complex patterns

### 5. Decision Tree Classification

How it works:
Same as regression but predicts categories
Question 1: Email has > 5 exclamation marks?
Yes → Question 2: From unknown sender?
Yes → Classify as SPAM
No → Classify as NOT SPAM
No → Classify as NOT SPAM

When to use:
- Need interpretable decisions
- Have categorical features
- Want to see decision rules

Example use cases:
- Customer segmentation
- Loan approval decisions
- Medical diagnosis

Pros:
- Easy to explain decisions
- Visual representation possible
- No preprocessing needed
- Handles missing values

Cons:
- Prone to overfitting
- Can be unstable
- Biased toward dominant classes

### 6. Random Forest Classification

How it works:
Multiple decision trees vote
Tree 1: Spam
Tree 2: Spam
Tree 3: Not Spam
Tree 4: Spam
Tree 5: Spam
Majority vote: Spam (4 out of 5)

When to use:
- Need high accuracy
- Complex decision boundaries
- Have large dataset

Example use cases:
- Image classification
- Fraud detection
- Customer behavior prediction

Pros:
- High accuracy
- Robust to overfitting
- Handles non-linear relationships
- Works with minimal tuning

Cons:
- Slower predictions
- Large model size
- Hard to interpret

### 7. K-Nearest Neighbors (KNN)

How it works:
Classify based on nearest neighbors
New email arrives
Find 5 most similar emails in training data
4 are spam, 1 is not spam
Classify new email as spam (majority)

When to use:
- Small to medium datasets
- Need simple baseline
- Similarity-based classification makes sense

Example use cases:
- Recommendation systems
- Pattern recognition
- Anomaly detection

Pros:
- Simple to understand
- No training phase
- Adapts to new data easily

Cons:
- Slow predictions on large datasets
- Sensitive to feature scaling
- Performs poorly in high dimensions

### 8. Support Vector Machine (SVM)

How it works:
Finds best boundary between classes
Maximizes distance to nearest points
Creates decision boundary with margin
Spam on one side, not spam on other
Boundary has maximum separation

When to use:
- Clear separation between classes
- High-dimensional data
- Need robust classification

Example use cases:
- Text classification
- Image recognition
- Bioinformatics

Pros:
- Effective in high dimensions
- Works with limited data
- Robust to overfitting

Cons:
- Slow on large datasets
- Requires feature scaling
- Hard to interpret

### 9. Naive Bayes

How it works:
Uses probability theory
Calculates likelihood of each class
Assumes features are independent
P(Spam | word "free" appears) = 0.8
P(Spam | word "meeting" appears) = 0.1
Combines probabilities

When to use:
- Text classification
- Fast training needed
- Features roughly independent

Example use cases:
- Email spam filtering
- Document categorization
- Sentiment analysis

Pros:
- Very fast training and prediction
- Works well with text data
- Needs little training data

Cons:
- Assumes feature independence (often wrong)
- Can be outperformed by other methods
- Sensitive to feature representation

## Unsupervised Learning Algorithms

### 10. K-Means Clustering

How it works:
Groups similar items together
Specify K (number of groups)
Algorithm finds K clusters
Example: Customer segmentation
Cluster 1: Budget shoppers
Cluster 2: Luxury buyers
Cluster 3: Occasional shoppers

When to use:
- Group similar items
- Customer segmentation
- Data exploration

Example use cases:
- Customer grouping for marketing
- Image compression
- Anomaly detection

Pros:
- Simple and fast
- Scalable to large datasets
- Easy to implement

Cons:
- Must specify number of clusters
- Sensitive to initial positions
- Assumes spherical clusters

## Algorithm Selection Guide

### Problem Type Decision Tree

Question 1: What are you predicting?
- Number → Use regression algorithm
- Category → Use classification algorithm
- Groups → Use clustering algorithm

Question 2: How much data do you have?
- Small (< 1000): Linear models, KNN
- Medium (1000-100k): Random Forest, SVM
- Large (> 100k): Neural Networks (not covered yet)

Question 3: Is interpretability important?
- Yes → Linear Regression, Decision Tree, Logistic Regression
- No → Random Forest, SVM, Neural Networks

Question 4: Is prediction speed critical?
- Yes → Linear models, simple trees
- No → Random Forest, SVM

## Real-World Algorithm Choices

### Email Spam Detection
Algorithm: Naive Bayes or Logistic Regression
Why: Fast, works well with text, interpretable
Features: Word frequencies, sender info, links count

### House Price Prediction
Algorithm: Random Forest Regression
Why: Handles non-linear relationships, accurate
Features: Size, location, bedrooms, age, condition

### Customer Segmentation
Algorithm: K-Means Clustering
Why: Groups similar customers, no labels needed
Features: Purchase history, demographics, behavior

### Image Classification
Algorithm: Random Forest or Neural Network
Why: Handles complex patterns, high accuracy
Features: Pixel values, color histograms, edges

### Credit Card Fraud Detection
Algorithm: Random Forest or SVM
Why: Handles imbalanced data, high accuracy needed
Features: Transaction amount, location, time, merchant

## Mobile ML Algorithm Considerations

### On-Device Requirements
Model size: < 10 MB preferred
Inference time: < 100 ms
Memory: < 50 MB RAM
Good choices:

Linear models (smallest)
Small decision trees
Quantized neural networks


### Cloud ML Flexibility
Model size: No strict limit
Inference time: Can be slower
Memory: Abundant
Can use:

Large Random Forests
Complex SVMs
Deep Neural Networks


## Algorithm Performance Comparison

### Speed (Training)
Fastest: Naive Bayes, Linear Regression
Fast: Logistic Regression, Decision Trees
Medium: KNN, SVM
Slow: Random Forest, Neural Networks

### Speed (Prediction)
Fastest: Linear models, Naive Bayes
Fast: Decision Trees
Medium: KNN (with indexing)
Slow: Random Forest, SVM

### Accuracy (Generally)
Lower: Naive Bayes, Single Decision Tree
Medium: Linear models, KNN
Higher: Random Forest, SVM, Neural Networks

### Interpretability
Most: Linear Regression, Logistic Regression, Decision Trees
Medium: Naive Bayes, KNN
Least: Random Forest, SVM, Neural Networks

## Ensemble Methods

Combining multiple algorithms for better results:

### Bagging (Bootstrap Aggregating)
Random Forest is an example
Create multiple models on random subsets
Average predictions
Reduces overfitting

### Boosting
Train models sequentially
Each model focuses on previous mistakes
Gradient Boosting, XGBoost, LightGBM
Often wins competitions

### Stacking
Combine different algorithm types
Train meta-model on their predictions
Uses strengths of multiple approaches

## Key Takeaways

1. No single best algorithm for all problems
2. Start simple: Linear models, Decision Trees
3. Move to complex if needed: Random Forest, SVM
4. Match algorithm to problem requirements
5. Consider trade-offs: accuracy vs speed vs interpretability
6. Try multiple algorithms and compare
7. Ensemble methods often perform best
8. Mobile deployment favors simpler models
9. Data quality matters more than algorithm choice
10. Start with baseline, iterate to improve

Tomorrow: Model Evaluation and Metrics in Depth

