curl -i http://localhost:3000/users

echo
echo
echo

curl \
  --silent \
  -i \
  -X POST \
  -d '{"name":"John Doe","age":"22", "email":"johndoe@gmail.com"}' \
  http://localhost:3000/users

echo
echo
echo

curl \
  --silent \
  -i \
  -X POST \
  -d '{"name":"John Doe","age":"22", "email":"johndoe@gmail.com}' \
  http://localhost:3000/users