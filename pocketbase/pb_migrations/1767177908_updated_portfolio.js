/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3061497940")

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "file1829049001",
    "maxSelect": 1,
    "maxSize": 5,
    "mimeTypes": [],
    "name": "thumbnail",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3061497940")

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "file1829049001",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "coverImage",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
})
