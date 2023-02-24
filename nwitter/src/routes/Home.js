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

    // 이미지
    const [attachment, setAttachment] = useState("");
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

    const onFileChange = (event) => {
        const {
            target: { files },
        } = event;
        // file 경로
        const theFile = files[0];
        //  파일 미리보기
        const reader = new FileReader();
        // 파일위치를 URL로 반환해준다
        // 이를 img element로 보여주면된다!
        // 시점까지 함께 관리해줘야 URL을 얻을 수 있다./
        // "웹 브라우저 파일을 인식 하는 시점", "웹 브라우저 팦일 인식이 끝난 시점"
        // reader.readAsDataURL(theFile);
        //상태관리
        reader.onloadend = (finshedEvent) => {
            // currentTarget - result에 url이 저장되어 있음
            console.log(finshedEvent);
            const {
                currentTarget: { result },
            } = finshedEvent;
            setAttachment(result);
        };
        // 생명주기
        reader.readAsDataURL(theFile);
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
                {/* image  */}

                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Ntweet" />
                {attachment && (
                    <img src={attachment} width="50px" height="50px" />
                )}
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
