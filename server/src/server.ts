import express, { Express, Request, Response } from "express";
import cors from "cors";
import Users from "../../server/db/users.json"
import Posts from "../../server/db/posts.json"
import fs from 'fs';
import path from 'path'
const bodyParser = require('body-parser');
const posts_file_path = path.join(__dirname,"../../server/db/posts.json");
//const user_file_path = path.join(__dirname,"../../server/db/users.json");
const app: Express = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Server is up!");
});


app.get('/users', (req: Request, res: Response) => { 
  res.json({Users}) 
}); 

app.get('/posts', (req: Request, res: Response) => { 
  Posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  res.json({Posts}) 
});


app.post('/create', (req: Request, res: Response) => { 
  let newDate = new Date();
  let maxPostId= Posts[Posts.length -1].id +1;
  Posts.push ({
    "id": maxPostId,
    "userId": parseInt(req.body.userId),
    "date": String(newDate.toISOString()),
    "content": req.body.content,
    "imageUrl": req.body.imageUrl
  })

  fs.writeFile(posts_file_path, JSON.stringify(Posts), (err) => {
    if (err) {
        console.log('Error writing file:', err);
    } else {
        console.log('Successfully wrote file');
    }
});
  Posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  res.json({Posts}) 

});
app.put('/edit', (req: Request, res: Response) => { 
  let newDate = new Date();
  let maxPostId= Posts[Posts.length -1].id +1;
  Posts.forEach(function (post,index) {
    console.log(post);
    console.log(index);
    if(post.id == parseInt(req.body.id))
      if (index > -1) {
        Posts.splice(index, 1);
}
});
  Posts.push({
    "id": maxPostId,
    "userId": parseInt(req.body.userId),
    "date": String(newDate.toISOString()),
    "content": req.body.content,
    "imageUrl": req.body.imageUrl
  })

  fs.writeFile(posts_file_path, JSON.stringify(Posts), (err) => {
    if (err) {
        console.log('Error writing file:', err);
    } else {
        console.log('Successfully wrote file');
    }
});
  Posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  res.json({Posts}) 
});

app.delete('/delete', (req: Request, res: Response) => { 
  Posts.forEach(function (post,index) {

    if(post.id == req.body.id){
  
   
      if (index > -1) {
        Posts.splice(index, 1);
}
    

     
    }

   
    
  });
  
  fs.writeFile(posts_file_path, JSON.stringify(Posts), (err) => {
    if (err) {
        console.log('Error writing file:', err);
    } else {
        console.log('Successfully wrote file');
    }
}

   );
  
  Posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  res.json({Posts}) 
});
app.listen(port, () => {
  console.log(`🔋 Server is running at http://localhost:${port}`);
});
