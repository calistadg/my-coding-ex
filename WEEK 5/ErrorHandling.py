try:
    result = 10 / 0
except:
    print("Error: cannot divide by zero.")
finally:
    print("Closing...")

try:
    numerator = 10
    denominator = int(input("Enter a denominator: "))
    result = numerator / denominator
except:
    print("Error: cannot divide by zero!")
else:
    print(f"Success! Result = {result}")
finally:
    print("Closing...")