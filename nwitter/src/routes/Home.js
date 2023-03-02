import Nweet from "components/Nweet";
import { dbService, storageService } from "fbase";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";

import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { v4 } from "uuid";

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
    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";

        //이미지 첨부하지 않고 텍스트만 올리고 싶을 때도 있기 때문에 attachment가 있을때만 아래 코드 실행
        //이미지 첨부하지 않은 경우엔 attachmentUrl=""이 된다.
        if (attachment !== "") {
            //파일 경로 참조 만들기
            const attachmentRef = ref(storageService, `${userObj.uid}/${v4()}`);
            //storage 참조 경로로 파일 업로드 하기
            const response = await uploadString(
                attachmentRef,
                attachment,
                "data_url"
            );
            //storage 참조 경로에 있는 파일의 URL을 다운로드해서 attachmentUrl 변수에 넣어서 업데이트
            attachmentUrl = await getDownloadURL(response.ref);
        }

        //트윗 오브젝트
        const nweetObj = {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        };

        //트윗하기 누르면 nweetObj 형태로 새로운 document 생성하여 nweets 콜렉션에 넣기
        await addDoc(collection(dbService, "nweets"), nweetObj);

        //state 비워서 form 비우기
        setNweet("");

        //파일 미리보기 img src 비워주기
        setAttachment("");
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

    // 파일선택 취소 버튼, 첨부파일을 ""로 해줌
    const onClearAttachment = () => setAttachment("");
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
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
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
