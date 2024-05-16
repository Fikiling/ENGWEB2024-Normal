import csv
import json

def read_csv_file(file_path):
    bd = []
    try:
        with open(file_path, 'r') as csv_file:
            csv_reader = csv.DictReader(csv_file, delimiter=';')
            
            for row in csv_reader:
                bd.append(row)
    except FileNotFoundError:
        print("File not found")
    except Exception as e:
        print(f"Error: {e}")
    
    return bd

file_path = 'contratos2024.csv'
myBD = read_csv_file(file_path)

novaBD = {
    "ocorrencias": myBD
}

f = open("contratos.json", "w")
json.dump(novaBD, f, indent=4)

