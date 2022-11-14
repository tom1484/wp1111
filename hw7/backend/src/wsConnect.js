export default {
    onMessage: (ws) => (
        async (byteString) => {
            const { data } = byteString;
            const [task, payload] = JSON.parse(data);
            switch (task) {
                case "input": {
                    const { name, message } = payload;
                    ws.send(JSON.stringify(["output", [payload]]));
                    ws.send(JSON.stringify([
                        "status",
                        {
                            type: "success",
                            msg: "Message sent",
                        }
                    ]));
                    break;
                }
                default:
                    break;
            }
        }
    )
};