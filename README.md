###Saz
Minimalistic component - entity - system game engine.

###Phlysophy
*Why?*
Saz.js is being developed for js13k game contest. So, we need the smallest footprint possible. 

1. First rule is to seperate data end logic. Keep whole game state in a single structure. Which is basically component arrays. And every component has entities such as position, velocity. But just data as plain javascript objects. And systems operates on this single state object. 

Immutablitiy is still under consideration. Which, immutably can be helful checking if a component/entity has been updated or not. If you are using immutable data structures checking is a simple === operation. Otherwise, you need a deep comparison which would be expensive. 

But see rule-2. I'm going with mutating single state object right now, but it wont be so hard to switch to a immutable structure. 

2. Second rule is never make performance optimizations as long as you experience some issues at the first hand. Using simple canvas and 2d rendering context for now. 

*Core*
Component is the smallest logical data fragment for a particular game object. Such as velocity of player at moment t. 

Entity is the smallest logical individual in game. Such as player. 

System is a function to transform game-state in a particular way. PhysicsSolver is a system which is reponsible for collisions. RectangleRenderer is responsible for rendering rectagular-shaped entites. 

Services are global utilites reponsible for providing drawing, generating sound, key press tracking functionalities. 