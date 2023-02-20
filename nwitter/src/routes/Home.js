import { dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";

const Home = () => {
    const [nweet, setNweet] = useState("");
    const onSubmit = async (e) => {
        e.preventDefault();
        // DB설정
        // add에는 원하는 데이터 넣기 가능
        try {
            // coolect 추가하기
            const docRef = await addDoc(collection(dbService, "nweets"), {
                nweet,
                createdAt: Date.now(),
            });
            // 작성자 아이디
            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            // 에러메세지
            console.error("Error adding document: ", error);
        }
        // 빈문자열로 초기화
        setNweet("");
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNweet(value);
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="submit" value="Ntweet" />
            </form>
        </div>
    );
};

export default Home;
