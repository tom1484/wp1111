window.onload = () => {

    var root = document.getElementsByClassName("root")[0];

    class UserHandle {
        constructor() {
            var userPin = document.getElementsByClassName("user-pin-area")[0];
            var userList = document.getElementsByClassName("user-list")[0];

            var templateUser = document.getElementById("template-user");
            var defaultUserInfo = [
                { userName: "UserMain", userImage: "./css/img/user/user-pin.png", isSelf: true, pinned: false }, 
                { userName: "User1", userImage: "./css/img/user/user-list-1.png", isSelf: false, pinned: false }, 
                { userName: "User2", userImage: "./css/img/user/user-list-2.png", isSelf: false, pinned: false }, 
                { userName: "User3", userImage: "./css/img/user/user-list-3.png", isSelf: false, pinned: false }, 
                { userName: "User4", userImage: "./css/img/user/user-list-4.png", isSelf: false, pinned: false }, 
                { userName: "User5", userImage: "./css/img/user/user-list-5.png", isSelf: false, pinned: false }, 
            ];

            this.users = [];
            for (let userInfo of defaultUserInfo) {
                let userTag = templateUser.cloneNode(true);
                userTag.removeAttribute("id");
                // set user name
                let userNameTag = userTag.getElementsByClassName("user-name")[0];
                userNameTag.innerText = userInfo.isSelf ? "你" : userInfo.userName;
                // set user image
                let userImageTag = userTag.getElementsByClassName("user-img")[0];
                userImageTag.setAttribute("src", userInfo.userImage);
                // set tooltip event listener for clicking
                let tooltipOptions = userTag.getElementsByClassName("tooltip-option");
                let pinClickListener = () => {
                    if (userInfo.pinned) {
                        let pinnedUserTag = userPin.getElementsByClassName("user")[0];
                        userPin.removeChild(pinnedUserTag);
                        userList.appendChild(pinnedUserTag);

                        userInfo.pinned = false;
                        userPin.setAttribute("enabled", "false");
                    }
                    else {
                        userInfo.pinned = true;
                        userList.removeChild(userTag);

                        if (userPin.getAttribute("enabled") == "true") {
                            let pinnedUserTag = userPin.getElementsByClassName("user")[0];
                            userPin.removeChild(pinnedUserTag);

                            userPin.appendChild(userTag);
                            userList.appendChild(pinnedUserTag);
                        }
                        else {
                            userPin.appendChild(userTag);
                            userPin.setAttribute("enabled", "true");
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
                this.users.push({ userTag: userTag, userInfo: userInfo });
            }
            
            this.pinnedUser = -1; 
            // this.pinnedUser
            // console.log(this.users);
        }
    };
    var userHandle = new UserHandle();

};


