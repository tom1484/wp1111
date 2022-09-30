window.onload = () => {

    let userPin = document.getElementsByClassName("user-pin-area")[0];
    let userList = document.getElementsByClassName("user-list-area")[0];

    userImageFile = [
        "./css/img/user/user-0.png", 
        "./css/img/user/user-1.png", 
        "./css/img/user/user-2.png", 
        "./css/img/user/user-3.png", 
        "./css/img/user/user-4.png", 
        "./css/img/user/user-5.png", 
    ]

    let templateUser = document.querySelector("template").content.querySelector("#template-user");
    let defaultUserInfo = [
        { userName: "User0", userImage: userImageFile[0], isSelf: true }, 
        { userName: "User1", userImage: userImageFile[1], isSelf: false }, 
        { userName: "User2", userImage: userImageFile[2], isSelf: false }, 
        { userName: "User3", userImage: userImageFile[3], isSelf: false }, 
        { userName: "User4", userImage: userImageFile[4], isSelf: false }, 
        { userName: "User5", userImage: userImageFile[5], isSelf: false }, 
    ];

    let listUserCount = 0;
    let participantCountTag = document.getElementsByClassName("participant-count-text")[0];
    participantCountTag.innerText = 0;

    function adjustPinLayout() {
        let maxWidth = userPin.offsetWidth;
        let maxHeight = userPin.offsetHeight;

        let width = 11;
        let height = 8;
        let f = Math.min(maxWidth / width, maxHeight / height);
        width *= f;
        height *= f;

        // let margin = width * 0.01;
        let margin = 0;

        for (let userTag of userPin.children) {
            userTag.style.width = width - 2 * margin + "px";
            userTag.style.height = height - 2 * margin + "px";

            userTag.style.top = (maxHeight - height) / 2 + margin + "px";
            userTag.style.left = (maxWidth - width) / 2 + margin + "px";
            // console.log(userTag);
        }
    }

    function adjustListLayout() {
        let maxWidth = userList.offsetWidth;
        let maxHeight = userList.offsetHeight;

        let width = 11;
        let height = 8;
        let f = 0;
        let cols = 0;
        let rows = 0;

        for (let i = 1; i <= listUserCount; i++) {
            let fullWidth = width * i;
            let fullHeight = height * Math.ceil(listUserCount / i);

            let widthF = maxWidth * 0.95 / fullWidth;
            let heightF = maxHeight * 0.95 / fullHeight;
            
            let minF = Math.min(widthF, heightF);
            if (minF > f) {
                f = minF;
                cols = i;
                rows = Math.ceil(listUserCount / cols);
            }
        }

        width *= f;
        height *= f;
        margin = width * 0.01;

        let fullWidth = width * cols;
        let fullHeight = height * rows;

        let lastCols = cols - cols * rows + listUserCount;
        let lastRowFull = (cols * rows == listUserCount);
        let extF = Math.min(1.2, (fullWidth / lastCols) / width);
        let lastWidth = lastCols * width * extF;

        let baseTop = (maxHeight - fullHeight) / 2;
        let baseLeft = (maxWidth - fullWidth) / 2;

        let col = 0;
        let row = 0;
        for (let userTag of userList.children) {
            if (!lastRowFull && row == rows - 1) {
                userTag.style.width = (width * extF - 2 * margin) + "px";
                userTag.style.height = (height - 2 * margin) + "px";

                userTag.style.top = baseTop + row * height + margin + "px";
                userTag.style.left = baseLeft + (fullWidth - lastWidth) / 2 + col * width * extF + margin + "px";
            }
            else {
                userTag.style.width = (width - 2 * margin) + "px";
                userTag.style.height = (height - 2 * margin) + "px";

                userTag.style.top = baseTop + row * height + margin + "px";
                userTag.style.left = baseLeft + col * width + margin + "px";
            }

            col += 1;
            if (col == cols) {
                col = 0;
                row += 1;
            }
        }
    }

    function adjustLayout() {
        adjustPinLayout();
        adjustListLayout();
    }

    function addUser(userInfo) {
        let userTag = templateUser.cloneNode(true);
        userTag.removeAttribute("id");
        // add pin sate
        userTag.setAttribute("pinned", false);
        // add self recognition
        userTag.setAttribute("is-self", userInfo.isSelf);
        // set user name
        let userNameTag = userTag.getElementsByClassName("user-name")[0];
        userNameTag.innerText = userInfo.isSelf ? "你" : userInfo.userName;
        // set user image
        let userImageTag = userTag.getElementsByClassName("user-img")[0];
        userImageTag.setAttribute("src", userInfo.userImage);
        // set delete button event listener for clicking
        let deleteButton = userTag.getElementsByClassName("delete-user")[0];
        let deleteClickListener = () => {
            if (userTag.getAttribute("pinned") == "true") {
                // unpin user
                userPin.setAttribute("enabled", false);

                userPin.removeChild(userTag);
            }
            else {
                userList.removeChild(userTag);
            }
            participantCountTag.innerText -= 1;
            listUserCount -= 1;

            adjustLayout();
        }
        deleteButton.addEventListener("click", deleteClickListener);
        // set tooltip event listener for clicking
        let tooltipOptions = userTag.getElementsByClassName("tooltip-option");
        let pinClickListener = () => {
            if (userTag.getAttribute("pinned") == "true") {
                // unpin user
                userPin.setAttribute("enabled", false);

                userPin.removeChild(userTag);

                userTag.setAttribute("pinned", false);
                userList.appendChild(userTag);

                listUserCount += 1;
            }
            else {
                userTag.setAttribute("pinned", true);

                if (userPin.getAttribute("enabled") === "true") {
                    let pinnedUserTag = userPin.getElementsByClassName("user")[0];
                    // swap pinned and unpinned
                    userPin.removeChild(pinnedUserTag);
                    userList.removeChild(userTag);

                    pinnedUserTag.setAttribute("pinned", false);
                    userPin.appendChild(userTag);
                    userList.appendChild(pinnedUserTag);
                }
                else {
                    // pin selected user
                    userList.removeChild(userTag);

                    userPin.setAttribute("enabled", true);
                    userPin.appendChild(userTag);

                    listUserCount -= 1;
                }
            }

            adjustLayout();
        }
        for (let option of tooltipOptions) {
            switch (option.getAttribute("id")) {
                case "pin-button":
                    option.addEventListener("click", pinClickListener);
                    break;
                case "block-button":
                    option.addEventListener("click", pinClickListener);
                    break;
                case "minimize-button":
                    option.addEventListener("click", pinClickListener);
                    break;
            }
        }
        // append child
        userList.appendChild(userTag);
        listUserCount += 1;

        participantCountTag.innerText = parseInt(participantCountTag.innerText) + 1;
    }

    for (let userInfo of defaultUserInfo) {
        addUser(userInfo);
    }

    window.addEventListener("resize", () => adjustLayout());

    adjustLayout();

    let addParticipant = document.getElementById("add-participant");
    let addDialog = document.getElementsByClassName("add-dialog")[0];

    console.log(addParticipant);
    addParticipant.addEventListener("click", () => {
        if (addDialog.style.visibility == "visible") {
            addDialog.style.visibility = "hidden";
        }
        else {
            addDialog.style.visibility = "visible";
        }
    });

    let userNameInput = document.getElementsByClassName("user-name-input-text")[0];
    let userImageInput = document.getElementsByClassName("user-image-input-drop")[0];

    for (let file of userImageFile) {
        let option = document.createElement("option");
        option.innerText = file;
        userImageInput.appendChild(option);
    }

    let addButton = document.getElementsByClassName("add-button")[0];
    addButton.addEventListener("click", () => {
        let userInfo = {
            userName: userNameInput.value, 
            userImage: userImageInput.value, 
            isSelf: false,
        }; 
        addUser(userInfo);
        adjustLayout();
        addDialog.style.visibility = "hidden";
    })
}


