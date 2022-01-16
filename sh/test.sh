#!/bin/sh

echo 'Waiting for testing ...'
./sh/wait-for web:5000

echo 'Running testing ...'
./sh/test-demo.sh

echo 'Test success'