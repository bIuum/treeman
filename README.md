# treeman
Build automation tools that update your whole project tree.


# It's that simple:
```
const { scan } = require('treeman');

const addReactImport = (err, file) => {
    if(file.ext === '.jsx' || file.ext === ='.js') {
        if(!file.includes("import React")) {
            file.addLine(0, "import React from 'react';");
        }
    }
}

scan({dirName: 'my-directory'}, addReactImport);
```
