# What Is Minetron

MineTron is a service that gets a Users Minehut Login info so you can control their servers remotly

# How Do I Use It?

If you want to implement MineTron in your Node.js Codebase use

`npm i minetron --save`

then you can do stuff like this

```
const { minetron } = require("./index.js")


minetron("5a8g1251-12ba-4a4c-b6ba-f15770b1a2b0", async (data) => {
	console.log(await data.getServer(0))
})
```

which gives you server data
