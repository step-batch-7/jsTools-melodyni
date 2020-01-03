#! /bin/bash
cat <<EOF > .git/hooks/pre-commit
node_modules/eslint/bin/eslint.js tail.js && "./runAppTests.sh appTest/*.test" && "nyc mocha"
if [ \$? != 0 ]; then
echo "you have failing tests melodyni! please fix it before doing a commit & push!"
exit 1
fi
EOF

chmod +x .git/hooks/pre-commit

cat <<EOF > .git/hooks/pre-push
run npm lint
if [ \$? != 0 ]; then
echo "rules have updated! fix errors and proceed."
exit 1
fi
EOF

chmod +x .git/hooks/pre-push
