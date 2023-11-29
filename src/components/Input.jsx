import React, { useContext, useState } from 'react'
import Img from '../img/img.png'
import Attach from '../img/attach.png';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../firebase';
const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          console.log("some error occured")
          // setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Date.now(),
                img: downloadURL
              })
            })
          });
        }
      );

    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Date.now()
        })
      })
    }
    await updateDoc(doc(db,"userChats",currentUser.uid),{
      [data.chatId+".lastMessage"]: {
        text,
      },
      [data.chatId+".date"]:serverTimestamp()
    });
    await updateDoc(doc(db,"userChats",data.user.uid),{
      [data.chatId+".lastMessage"]: {
        text,
      },
      [data.chatId+".date"]:serverTimestamp()
    });
    setText("");
    setImg(null);
  }
  return (
    <div className='input'>
      <input type="text" placeholder='type something' onChange={e => setText(e.target.value)} value={text}  />
      <div className="send">
        <img src={Attach} alt="attach" />
        <input type="file" style={{ display: "none" }} id='file' onChange={e => setImg(e.target.files[0])} />
        <label htmlFor="file">
          <img src={Img} alt="img" />
        </label>
        <button onClick={handleSend}>send</button>
      </div>
    </div>
  )
}

export default Input