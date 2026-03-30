# Day 79: What is Machine Learning?

## Definition

Machine Learning is teaching computers to learn from data instead of explicitly programming every rule.

Traditional Programming:
Input + Rules → Output

Machine Learning:
Input + Output → Rules (learned automatically)

## Real World Example

Email Spam Filter:

Traditional approach:
if (email.contains("viagra")) mark as spam
if (email.contains("lottery")) mark as spam
// Need to write rule for every spam word

ML approach:
Show 1000 spam emails and 1000 normal emails
Computer learns patterns automatically
Adapts to new spam tricks without new rules

## Three Types of Learning

### 1. Supervised Learning
You provide labeled examples (answers included)

Example: House Price Prediction
- Training data: 1000 houses with prices
- Features: bedrooms, location, size
- Labels: actual selling prices
- Model learns: relationship between features and price

Use cases:
- Email spam detection (spam/not spam)
- Image classification (cat/dog/bird)
- Disease diagnosis (healthy/sick)

### 2. Unsupervised Learning
No labels, computer finds patterns

Example: Customer Segmentation
- Data: customer purchase history
- No labels about customer types
- Algorithm groups similar customers
- Discovers: budget shoppers, luxury buyers, etc

Use cases:
- Customer grouping
- Anomaly detection
- Recommendation systems

### 3. Reinforcement Learning
Learn by trial and error with rewards

Example: Game Playing AI
- Try different moves
- Get reward for winning
- Get penalty for losing
- Learns winning strategies

Use cases:
- Game AI (Chess, Go)
- Robot control
- Self-driving cars

## Key ML Terminology

**Dataset**: Collection of examples
- Training set: Data used to learn
- Test set: Data used to evaluate

**Features**: Input variables (bedrooms, size, location)
**Labels**: Output/answers (house price)
**Model**: The learned rules/patterns
**Training**: Process of learning from data
**Prediction**: Using model on new data

**Example:**
```
Feature: [3 bedrooms, 2000 sqft, downtown]
Label: $500,000
Model learns: more bedrooms + bigger size + downtown = higher price
Prediction: New house [4 bedrooms, 2500 sqft, downtown] = $650,000
```

## The ML Workflow

1. Collect Data
   Example: Gather 10,000 house records

2. Prepare Data
   Example: Clean missing values, convert text to numbers

3. Choose Algorithm
   Example: Linear Regression for price prediction

4. Train Model
   Example: Feed data to algorithm, it learns patterns

5. Evaluate
   Example: Test on new houses, check accuracy

6. Deploy
   Example: Use in mobile app for price estimates

## When to Use ML vs Traditional Programming

Use Traditional Programming when:
- Rules are clear and simple
- Few cases to handle
- Rules don't change often
Example: Calculator, form validation

Use Machine Learning when:
- Too many rules to write
- Rules keep changing
- Patterns are complex
- Need to adapt to new data
Example: Face recognition, voice assistant, recommendations

## Mobile ML Applications

On-device ML (runs on phone):
- Face ID authentication
- Photo organization
- Text prediction
- Voice recognition

Cloud ML (runs on server):
- Complex image analysis
- Natural language understanding
- Large-scale recommendations

## Simple Mental Model

Think of ML like teaching a child:

Traditional Programming:
Tell child exact rule: "2 + 2 = 4"

Machine Learning:
Show child many examples:
- 1 apple + 1 apple = 2 apples
- 2 toys + 3 toys = 5 toys
- 5 - 2 = 3
Child learns concept of math
Can solve new problems: 7 + 8 = ?

## Next Steps

Day 80: Data - The fuel of ML
Day 81: Features and labels
Day 82: Training and testing
Day 83: Common algorithms
Day 84: Model evaluation
Day 85: Overfitting and underfitting

