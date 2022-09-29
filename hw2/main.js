window.onload = () => {

    let userPin = document.getElementsByClassName("user-pin-area")[0];
    let userList = document.getElementsByClassName("user-list")[0];

    let templateUser = document.querySelector("template").content.querySelector("#template-user");
    let defaultUserInfo = [
        { userName: "User0", userImage: "./css/img/user/user-pin.png", isSelf: true }, 
        { userName: "User1", userImage: "./css/img/user/user-list-1.png", isSelf: false }, 
        { userName: "User2", userImage: "./css/img/user/user-list-2.png", isSelf: false }, 
        { userName: "User3", userImage: "./css/img/user/user-list-3.png", isSelf: false }, 
        { userName: "User4", userImage: "./css/img/user/user-list-4.png", isSelf: false }, 
        { userName: "User5", userImage: "./css/img/user/user-list-5.png", isSelf: false }, 
    ];

    let participantCountTag = document.getElementsByClassName("participant-count-text")[0];
    participantCountTag.innerText = defaultUserInfo.length;

    for (let userInfo of defaultUserInfo) {
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
                }
            }
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
    }
}


