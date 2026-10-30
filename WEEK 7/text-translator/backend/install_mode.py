
import argostranslate.package
import argostranslate.translate

print("Checking translation models...")

argostranslate.package.update_package_index()

packages = argostranslate.package.get_available_packages()

matching = [
    p for p in packages
    if p.from_code == "en" and p.to_code == "de"
]

if not matching:
    print("English to German model not found.")
else:
    print("Downloading English to German model...")

    path = matching[0].download()

    print("Installing model...")

    argostranslate.package.install_from_path(path)

    print("Model installed successfully!")

print("Installed languages:")

for lang in argostranslate.translate.get_installed_languages():
    print(lang.code, "-", lang.name)
