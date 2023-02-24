import Nweet from "components/Nweet";
import { dbService } from "fbase";
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
} from "firebase/firestore";
import { useState, useEffect } from "react";

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    // 트윗가져오기
    // const getNweets = async () => {
    //     const q = query(collection(dbService, "nweets"));
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((doc) => {
    //         const nweetObj = {
    //             ...doc.data(),
    //             id: doc.id,
    //         };
    //         // nweets 설정
    //         setNweets((prev) => [nweetObj, ...prev]);
    //     });
    // };

    // realtime 트윗 적용하기
    useEffect(() => {
        const q = query(
            collection(dbService, "nweets"),
            orderBy("createdAt", "desc")
        );
        onSnapshot(q, (snapshot) => {
            const nweetArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArr);
        });
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
                creatorId: userObj.uid,
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
                {/* 트윗 뿌리기 */}
                {nweets.map((nweet) => (
                    <Nweet
                        key={nweet.id}
                        nweetObj={nweet}
                        isOwner={nweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
