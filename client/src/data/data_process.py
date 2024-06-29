import pandas as pd

# Load the CSV data into a DataFrame
df = pd.read_csv('data.csv')

# Extract unique wilayas
wilayas = df[['wilaya_code', 'wilaya_name']].drop_duplicates().sort_values(by='wilaya_code')
wilayas['value'] = wilayas['wilaya_name'].str.lower().str.replace(' ', '_')

# Extract cities and their corresponding wilaya
cities = df[['commune_name', 'wilaya_name']].drop_duplicates().sort_values(by=['wilaya_name', 'commune_name'])
cities['value'] = cities['commune_name'].str.lower().str.replace(' ', '_')
cities['wilaya'] = cities['wilaya_name'].str.lower().str.replace(' ', '_')

# Print wilayas array
print("const wilayas = [")
for _, row in wilayas.iterrows():
    print(f"  {{ label: \"{row['wilaya_name']}\", value: \"{row['value']}\" }},")
print("];")

# Print cities array
print("\nconst cities = [")
for _, row in cities.iterrows():
    print(f"  {{ label: \"{row['commune_name']}\", value: \"{row['value']}\", wilaya: \"{row['wilaya']}\" }},")
print("];")
