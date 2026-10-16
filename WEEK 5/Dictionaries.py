person = {
    "name":"Calista",
    "age": 28,
    "city": "New Zealand"
}

print(person["name"])
person["email"] = "calista@gmail.com"
print(person)
for key in person:
    print(key)
for value in person.values():
    print(value)
for key, value in person.items():
    print(f"{key}: {value}")