
## convention naming
example for photos resource
```
resource: photos
model: Photo
controller: PhotoController
```

## about restful router definition
example for photos resource router defined as below

Verb | URI | Action | Route Name
---|---|---|---
GET | /photos |	index | photos.index
GET | /photos/:photo | show | photos.show
POST | /photos | create | photos.create
PUT/PATCH | /photos/:photo | update | photos.update
DELETE | /photos/:photo | destroy | photos.destroy