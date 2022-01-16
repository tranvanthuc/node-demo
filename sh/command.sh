#!/bin/sh

echo 'Waiting for MySQL to start ...'
./sh/wait-for mysql:3306

echo "Starting the server..."
npm start