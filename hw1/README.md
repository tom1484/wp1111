# Web Programming HW#1

The css files are separated into several files for different part of layout (but are merged into single file for submitting).

## root.css

This part defines the layout of different funciton areas, such as user lists, buttons and so on. <br>
The layout is designed with `display: grid;` in order to maintain the ratio of area of different parts as shown.

![image](https://user-images.githubusercontent.com/58879171/189489599-53c76099-11d3-40c4-bff4-b3179bdb3b68.png)

*Hint: to allow the first and last line of grid to have width, you can add redundant partitions with zero space.*

## user-pin-area.css

This area if for displaying the pinned users. <br>

The user block has layout style of `display: block;` since there are only four main elements in each block.
It contains microphone state, user name, user image and tooltip. <br>

The first three elements are simple while tooltip is relatively complicated.
It handles two states of opacity and button color on hovering as well. <br>

## user-list-area.css

This area if for displaying the user list which are not pinned. <br>

The list has layout style of `display: flex;` with `flex-direction: row;`.
Width of each block is set to be about half the width of the list, so that each row can only contain two blocks.
Also, I set `flex-grow: 0.3;` to allow the single block in the last row to stretch a little bit.

![image](https://user-images.githubusercontent.com/58879171/189490942-c09c7509-2617-4ce6-8e0b-c658b29bec29.png)

Aside from the list, the user blocks are the same with that in **user-pin-are**.

## footer.css

This area is for displaying time and meeting room name.

## action-bar.css

This part consists of action buttons such as turning on/off microphone, turning on/off camera, raising hand and so on. <br>

The buttons having two states contains checkbox inside so that the clicks can be memorized. <br>
To prevent image glitching when changing state, I added a hidden element by selector `:after` to preload button svg images before clicking.

## info-bar.css

Finally, this part has buttons for more information of the meeting, which are implemented with similar methods introduced previously.





