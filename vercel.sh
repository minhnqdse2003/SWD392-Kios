#!/bin/bash

if [[ "$VERCEL_GIT_COMMIT_REF" != "main"  ]] ; then
  # Don't build
  echo "🛑 - Build cancelled"
  exit 1;

else
  # Proceed with the build
    echo "✅ - Build can proceed"
  exit 0;
fi
