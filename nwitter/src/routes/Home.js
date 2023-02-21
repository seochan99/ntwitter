import { dbService } from "fbase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { useState, useEffect } from "react";

const Home = () => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    const getNweets = async () => {
        const q = query(collection(dbService, "nweets"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const nweetObj = {
                ...doc.data(),
                id: doc.id,
            };
            setNweets((prev) => [nweetObj, ...prev]);
        });
    };
    useEffect(() => {
        getNweets();
    }, []);

    // 제출시
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
    console.log(nweets);

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
            <div>
                {nweets.map((nweet) => (
                    <div key={nweet.id}>
                        <h4>{nweet.nweet}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
