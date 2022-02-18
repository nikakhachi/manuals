## Set up NodeJS with TypeScript

#### 1) Initialize and install dependencies

``npm init``

``npm i --save-dev typescript @types/node ts-node ts-node-dev``

#### 2) Create ts config file

``touch tsconfig.json`` and copy the code from tsconfig.json 

or

``tsc --init``

#### 3) Add package.json scripts :
``"start": "ts-node server.ts",``

``"dev": "ts-node-dev --respawn server.ts",``
