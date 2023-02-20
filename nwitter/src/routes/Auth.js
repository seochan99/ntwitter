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

    const onSubmit = (event) => {
        // 새로고침을 막아줌
        event.preventDefault();
        if (newAccount) {
            // create New Acc
        } else {
            // Log in
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
