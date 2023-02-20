import { authService } from "fbase";
import { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);

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
            console.log(error);
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
            </form>
            <div>
                <button>Contunue With Google</button>
                <button>Contunue With Github</button>
            </div>
        </div>
    );
};

export default Auth;
