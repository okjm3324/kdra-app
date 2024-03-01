#!/bin/bash
set -e

rm -f /myapp/tmp/pids/server.pid
exec bundle exec rails server -b 0.0.0.0 -p $PORT