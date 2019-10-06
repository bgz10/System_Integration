
tax = 25

def get_total(price):
    print("Normal price:")
    total = price + (price * tax / 100)
    return total

def get_special_price(func):
    def inner(price):
        print("Special Price:")
        price -= 1
        return func(price)
    return inner

# print(get_total(100))
# run_spec_price = get_special_price(get_total)
# print(run_spec_price(100))


## Create a function that prints the get_total() and also prints hi on the screen

def ex_special_func(func):
    def inner(price):
        print("hi" + str(price))
        return func(price)
    return inner

special_f = ex_special_func(get_total)
print(special_f(100))