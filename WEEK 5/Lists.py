fruits = ["apple", "banana", "orange"]
fruits.append("grape")
fruits.insert(1, "mango")
fruits.remove("apple")
print(fruits)
print(fruits[0])
print(fruits[-1])

numbers = [3, 1, 4, 1, 5, 9, 2]
numbers.sort()
print(numbers)
numbers.reverse()
print(numbers)
print(numbers.count(1))
print(numbers.index(1))

todos = []
todos.append("Buy groceries")
todos.append("Clean the house")
todos.append("Pay bills")
print("To-Do List:")
for index, task in enumerate(todos, 1):
    print(f"{index}. {task}")