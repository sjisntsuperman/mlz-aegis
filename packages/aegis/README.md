# mlz-aegis

开发时请在whistle上配置下列规则进行开发

```lua
/mlz-aegis-api.codemao.com/(.*)/ http://127.0.0.1:3000/$1
/mlz-aegis.codemao.com/(.*)/ http://127.0.0.1:8000/$1
```
