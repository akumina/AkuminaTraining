## Akumina starter project

Make sure to have NODE 8.9.1++

npm install

npm install -g typescript

tsc --init

npm install @types/jquery --save-dev

npm run stub (create your widget package)

npm run build (builds your JS)

npm run package (creates the .zip file)

npm run deploy (see tools/deploy.js for more info)

Edit webpack.config.js (and put your widget name in - this will be automatic in future versions)


## Changelist

7.30.18

-Added versioning info - added updated Exit codes for failed steps - introduced diagnostic mode (doc coming soon)

5.29.18

-Added support for langid and langcode parameters for multilingual widget instances