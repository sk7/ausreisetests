# fixes names, e.g "Salzburg(Stadt)" --> "Salzburg (Stadt)"

sed -E -e 's/"name": "(.*)\((.*)\)"/"name": "\1 (\2)"/g' -i "" $1
