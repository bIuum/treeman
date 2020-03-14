# treeman
Build automation tools that update your whole project tree.


### It's that simple:
```
const { scan } = require('treeman');

const handleFile = (err, file) => {
    if(err) {
        // handle error
    } else {
        // view and edit the file using the treeman file API
    }
}

scan({dirName: 'my-directory'}, handleFile);
```

For more information regarding the treeman file API, view the docs.
