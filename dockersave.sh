echo service name = $1
echo version = $2

cd /bpi/dockertars/ && docker save registry.unitas.com:5000/unitas/$1:$2 -o $1-$2.tar
