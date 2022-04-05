### [Use `bip` to install python libraries](https://github.com/imgcook/boa#install-python-package)
```shell
$ ./node_modules/.bin/bip install <LIB_NAME>
```

### Use `Gulp` to manage python libraries
- install
  > `$ gulp 'pip install' --lib <LIB_NAME>`

  or specify the library version

  > `$ gulp 'pip install' --lib <LIB_NAME>@<LIB_VERSION>`

- uninstall
  > `$ gulp 'pip uninstall' --lib <LIB_NAME>`

- sync libraries list
  > `$ gulp 'pip sync'`

### Online websocket test tool
https://amritb.github.io/socketio-client-tool/
