import { authService, firebaseInstance } from "fbase";
import { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;

        // name에 따라 입력시켜주기
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = async (event) => {
        // 새로고침을 막아줌
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
                // create New Acc
                // 이메일, 패스워드를 넘겨줘서 회원가입시킴
                data = await authService.createUserWithEmailAndPassword(
                    email,
                    password
                );
            } else {
                // Log in
                // 이메일, 패스워드를 넘겨줘서 로그인가능한지 확인함
                data = await authService.signInWithEmailAndPassword(
                    email,
                    password
                );
            }
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    };

    // 로그인 관리 토글
    const toggleAccount = () => setNewAccount((prev) => !prev);

    // 소셜 클릭
    const onSocialClick = (event) => {
        // ES6
        const {
            target: { name },
        } = event;
        // provider
        let provider;
        // 서비스별 제공자 가져오기
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name == "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={onChange}
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={onChange}
                    required
                />
                <input
                    type="submit"
                    value={newAccount ? "Create Account" : "Log In"}
                />
                {/* 에러메세지 뜨게해줌 */}
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Log in" : "Create Account"}
            </span>
            <div>
                <button onClick={onSocialClick} name="google">
                    Contunue With Google
                </button>
                <button onClick={onSocialClick} name="github">
                    Contunue With Github
                </button>
            </div>
        </div>
    );
};

export default Auth;
