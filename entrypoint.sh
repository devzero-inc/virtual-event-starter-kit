#!/bin/sh

echo "Waiting for the Docker daemon to start..."
while ! docker info >/dev/null 2>&1; do
    sleep 1
done
echo "Docker daemon is up and running!"

npx supabase start -x imgproxy,migra,studio,edge-runtime,logflare,vector,pgbouncer > start.txt

echo "NEXT_PUBLIC_SUPABASE_URL=$(awk '/API URL:/ {print $3}' start.txt)" > .env.local
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=$(awk '/anon key:/ {print $3}' start.txt)" >> .env.local

exec npm run startapp