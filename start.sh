echo "Checking for packages:"
pip install -r requirements.txt

echo
echo
echo "Starting Server:"

python -m flask --app server run