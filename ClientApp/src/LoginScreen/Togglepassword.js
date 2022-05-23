
const togglePassword =
    () => {

        if (passType === "password") {
            setType("text")
            return;
        }
        setType("password")

    }

export default togglePassword