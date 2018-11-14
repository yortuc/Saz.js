### Saz
Minimalistic component - entity - system game engine.

#### Why?
Saz.js is being developed for js13k game contest in need with the smallest footprint possible. 

1. Seperate Data and Logic.
Keep whole game state in a single structure which is basically game-entity arrays. 

2. No performance optimizations until one is felt deeply. 

### How to run
Setup is based on old gulp with live reloading.

```
> git clone https://github.com/yortuc/Saz.js.git
> cd Saz.js
> npm install
> gulp
```

#### Systems

1. PhysicsSolver 

2. RectangleRenderer
render game entities as solid rectangles.

See the demo of raycasting with debug rays

[![ray casting based 2d arcade physics](https://img.youtube.com/vi/ApUAultbLn4/0.jpg)](https://www.youtube.com/watch?v=ApUAultbLn4)
