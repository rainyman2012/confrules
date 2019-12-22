#!/bin/bash

echo "${1} ${2}" >>register.txt
curl   -H "Authorization: Token ${1}" -H "Content-Type: application/json" -X POST http://localhost:8000/api/program/
#curl -d "{\"username\":\"${1}\", \"email\":\"\", \"password\":\"1234\"}" -H "Content-Type: application/json" -X POST http://localhost:8000/auth/register
