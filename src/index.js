
import connectDB from "./db/index.js"
import {app} from "./app.js"
import {PORT} from "./constant.js"



 connectDB().then(()=>{
    app.listen(5000,()=>{
        console.log(`app is listening ${PORT}`)
    })
 })