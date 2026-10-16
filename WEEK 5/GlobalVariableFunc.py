x = 10

def without_global ():
    x = 5
    print(f"Local x: {x}")

without_global()
print(f"Global x: {x}")