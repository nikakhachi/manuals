Set up NodeJS with TypeScript

npm i --save-dev typescript @types/node ts-node ts-node-dev

Create ts config file

Add package.json scripts :
"start": "ts-node server.ts",
"dev": "ts-node-dev --respawn server.ts",
