import csv
from random import randint, choice
import datetime

orders = []

for i in range(100):
    for j in range(1, randint(1, 12)):
        orders.append({
            "userEmail": f'test{i}@test.com',
            "date": datetime.date(randint(1970, 2020), j, randint(1, 28)),
            "value": randint(10, 5000),
            "currency": 'USD',
            "status": choice(['approved', 'pending', 'rejected']),
        })

with open('input_test.csv', 'w', newline='') as wf:
    writer = csv.DictWriter(wf, fieldnames=orders[0].keys())
    writer.writeheader()
    writer.writerows(orders)
