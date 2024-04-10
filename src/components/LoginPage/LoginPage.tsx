import React, {useState} from "react";
import { TextField, Button } from "@mui/material";

export const LoginPage = () => {
    const [nickName, setNickName] = useState("")
    const [nickNameError, setNickNameError] = useState(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setNickNameError(false);

        if (nickName == '') {
            setNickNameError(true);
        }

        if (nickName) {
            console.log(nickName);
        }
    }

    return (
        <>
            <form autoComplete="off" noValidate={true} onSubmit={handleSubmit}>
                <h2>Login Form</h2>
                <TextField
                    label="Nick name"
                    onChange={e => setNickName(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="nickName"
                    sx={{mb: 3}}
                    fullWidth
                    value={nickName}
                    error={nickNameError}
                />

                <Button variant="contained" color="primary" type="submit">Login</Button>
            </form>
        </>
    );
}