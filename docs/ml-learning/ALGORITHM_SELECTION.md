# Algorithm Selection Quick Guide

## By Problem Type

Predicting House Prices:
→ Random Forest Regression

Spam Email Detection:
→ Naive Bayes or Logistic Regression

Customer Grouping:
→ K-Means Clustering

Image Classification:
→ Random Forest or Neural Network

Fraud Detection:
→ Random Forest or SVM

Text Sentiment Analysis:
→ Naive Bayes or Logistic Regression

## By Data Size

Small Dataset (< 1000):
- Linear Regression
- Logistic Regression
- KNN
- Simple Decision Tree

Medium Dataset (1000-100k):
- Random Forest
- SVM
- Gradient Boosting

Large Dataset (> 100k):
- Random Forest
- Neural Networks
- Ensemble methods

## By Priority

Need Interpretability:
- Linear Regression
- Logistic Regression
- Decision Tree

Need Accuracy:
- Random Forest
- SVM
- Ensemble methods

Need Speed:
- Linear models
- Naive Bayes
- Simple trees

Need Small Model:
- Linear models
- Pruned decision trees
- Quantized models

## Algorithm Comparison Table

| Algorithm | Speed | Accuracy | Interpretable | Mobile-Friendly |
|-----------|-------|----------|---------------|-----------------|
| Linear Regression | Fast | Medium | Yes | Yes |
| Decision Tree | Fast | Medium | Yes | Yes |
| Random Forest | Slow | High | No | Medium |
| Logistic Regression | Fast | Medium | Yes | Yes |
| KNN | Slow | Medium | Medium | No |
| SVM | Medium | High | No | Medium |
| Naive Bayes | Very Fast | Medium | Medium | Yes |
| K-Means | Fast | N/A | Medium | Yes |

## First Algorithm to Try

Regression: Start with Linear Regression
Classification: Start with Logistic Regression
Clustering: Start with K-Means

If not accurate enough, move to Random Forest.

