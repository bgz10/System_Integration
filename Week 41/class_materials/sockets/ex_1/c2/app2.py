from bottle import route, run

people = {
    '111': {'name': 'A'},
    '222': {'name': 'B'}
}

@route('/get-data/<cpr>')
def index(cpr):
    return people[cpr]

# Second exercise
@route('/next-case')
def next_case():
    return {"status":0, "message": "There is no message"}


# localhost:2222/getData/12345678
# Run the server
run(host='localhost', port=2222, debug=1, reloader=1)