###Saz###
Minimalistic component - entity - system game engine.

####Phlysophy####
Saz.js is being developed for js13k game contest. So, i need the smallest footprint possible. 

1. First rule is to seperate data end logic. Keep whole game state in a single structure. Which is basically component arrays. And every component has entities such as position, velocity. But just data as plain javascript objects. And systems operates on this single state object. 
Immutablitiy is still under consideration. Which, immutably can be helful checking if a component/entity has been updated or not. If you are using immutable data structures checking is a simple === operation. Otherwise, you need a deep comparison which would be expensive. 
But see rule-2. I'm going with mutating single state object right now, but it wont be so hard to switch to a immutable structure. 

2. Second rule: never make "performance" optimizations as long as you don't experience some at the first hand. Using simple canvas and 2d rendering context is ok for now. 

####Systems####

1. physics [![ray casting based 2d arcade physics](https://img.youtube.com/vi/ApUAultbLn4/0.jpg)](https://www.youtube.com/watch?v=ApUAultbLn4)