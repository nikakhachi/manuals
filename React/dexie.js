const db = new Dexie("ReactDexie");

// create a store for the database
db.version(1).stores({
  nameOfTheStore: "title, json",
});

// open the database, catch error (if present).
db.open().catch((err) => {
  console.log(err.stack || err);
});

// adding an object to db store
db.nameOfTheStore.add({
  title: objectTitle,
  json: data,
});

// Clearing whole database store
db.nameOfTheStore.clear();
