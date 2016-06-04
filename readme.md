[![Build Status](https://travis-ci.org/markelog/docker-ip.svg?branch=master)](https://travis-ci.org/markelog/docker-ip)
[![Coverage Status](https://coveralls.io/repos/github/markelog/docker-ip/badge.svg?branch=master)](https://coveralls.io/github/markelog/docker-ip?branch=master)

# Get docker ip
Get docker ip from `docker-machine` if applicable otherwise `localhost`

## Usage
```js
import ip from 'docker-ip';

ip() // 192.168.99.100 a "default" one
ip('dev') // a "dev" one
```

In order to run tests you need to instal and run docker
