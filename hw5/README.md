# Web Programming HW#5

Basic and advanced versions are in separate folders <br>
![image](https://user-images.githubusercontent.com/58879171/197439067-d2fcb1e3-7b67-46a2-9e75-d7d12f017e9c.png)

## Basic Version

All requirements are implemented

## Advanced Version

Advanced version is a 1A2B game. The introduction of this game can be found [here](https://zh.m.wikipedia.org/zh-tw/1A2B)<br>

There are two mode to play: Guess and Judge <br>
![image](https://user-images.githubusercontent.com/58879171/197439508-2ec469f3-5e20-43f5-b095-c48f10e09ed7.png)

### Guess Mode

In Guess mode, you have 8 chances to guess 4-digit numbers with distinct digits. <br>
Each time the server returns the result (#A#B). The result pair will be stored in a history list then. <br>
![image](https://user-images.githubusercontent.com/58879171/197440794-b65782e1-28dd-4893-82a3-5e86f41553d2.png)

You can view the answer in the terminal where you launched the server. <br>
![image](https://user-images.githubusercontent.com/58879171/197440734-74cba478-3dd3-49db-a403-cc93d3075982.png)

### Judge Mode

In judge mode, the server has 6 chances to guess. <br>
As you start, you will receive a 4-digit number from the server as a initial guess.
Decide your answer, then start judging the numbers (#A#B) carefully. <br>
![image](https://user-images.githubusercontent.com/58879171/197441524-2e7ad88f-49b9-48fe-9128-76629a2afbd9.png)

If your judges cause contradiction, you will lose the game. <br>
