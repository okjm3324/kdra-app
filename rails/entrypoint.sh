#!/bin/bash
set -e

rm -f /myapp/tmp/pids/server.pid
if [ "$RAILS_SERVER" = "true" ]; then
  exec bundle exec rails server -b 0.0.0.0
fi
