import csv
import random
import datetime

orders = []

for i in range(100):
    for j in range(1, random.randint(1, 12)):
        orders.append({
            "userEmail": f'test{i}@test.com',
            "date": datetime.date(2019, j, 19),
            "value": random.randint(10, 5000),
            "currency": 'USD',
            "status": random.choice(['approved', 'pending', 'rejected']),
        })

with open('input_test.csv', 'w', newline='') as wf:
    writer = csv.DictWriter(wf, fieldnames=orders[0].keys())
    writer.writeheader()
    writer.writerows(orders)