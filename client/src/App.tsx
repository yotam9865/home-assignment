import { useState,useEffect} from "react";
import { Header } from "./components";
import { PostData, UserData } from "./types";
import { Avatar, CardMedia } from "@mui/material";
import { Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import { UserAvatar } from "../../client/src/components/UserAvatar"
function App() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [isPostEditorOpen, setIsPostEditorOpen] = useState(false);
  const [currentUser, SetCurrentUser] =  useState<UserData[]>([]);


  var RandomUserFunc = () => SetCurrentUser([]);

  const openEditor = () => setIsPostEditorOpen(true);


  useEffect(() => {
    const fetchUser = async () => {
  
      const response = await fetch('http://localhost:3000/users');
      if (!response.ok){
        throw new Error('Network response is bad');
      }
      const data = await response.json();
      // let arr =Array.from({length: 10}, (_, i) => i + 1)
      // if (arr.length === 0) {
      //   let arr =Array.from({length: 10}, (_, i) => i + 1)

      // }
      // else {
      // const ind =Math.floor(Math.random() * arr.length);
      // const result = arr.splice(ind, 1)[0];
      // console.log(`Random Element = ${result}`);
      // console.log("arrey"+arr +"rand"+result)

      // };

      let rndInt = Math.floor(Math.random() * 11) + 1;
      let set_current =[JSON.parse(JSON.stringify(data.Users))[rndInt]]
      SetCurrentUser(set_current);
      
    }; 
    const fetchPosts = async () => {
      const response = await fetch('http://localhost:3000/posts');
      if (!response.ok){
        throw new Error('Network response is bad');
      }
      const data = await response.json();
      console.log(data.Posts);
      setPosts(data.Posts)
    };
    
    fetchUser();
    fetchPosts();

  },[]);

   
  return (
    <>
    
    {currentUser.map((user) => (
    
    <Header openPostEditor={openEditor} clickUser={user} />))
    
}
      <div className="posts-wrapper">


{posts.map((post) => (
  
              <>
              
              <Avatar src={post.imageUrl}   sizes="600px" />
              <CardContent>{new Date(post.date).toLocaleDateString()} {new Date(post.date).toLocaleTimeString()}</CardContent>
              <CardMedia src={post.imageUrl} />
              <CardContent>{post.content}</CardContent>

              
              
              
              
              </>
            
              
            )
            )
            }
    


       </div>

    </>
  );
}

export default App;
