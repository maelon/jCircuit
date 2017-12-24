# What is jCircuit?
In one word, a little javascript library that works like electronic circuit.  
There are 3 concepts:  
* element  
  The base type of jCircuit.  
  It has some simple special function like an electronic component.
* circuit  
  It combines some elements and works like a electronic circuit board.
  Most js library should be a circuit.
* line  
  It can't work with circuit only.  It would be find that a circuit with eletronic power and you can control it.  
  That is line.

# How to use?

## install
```
npm install jcircuit
```
```
import jCircuit from 'jcircuit';

class Ele extends jCircuit.Element
class Cir extends jCircuit.Circuit
class Lin extends jCircuit.Line
```

## usage

### element
An element has three interfaces: `input` `process` `output`.  
* input(data: Object)  
  `input` receive a parameter `data`, and should return a boolean value that true will execute process and false will not.  
  So you can determine whether the data processed or not.  
  If not, `output` will return a special signal.
  if true, you should call `this.saveInputData(data)`, thus the next process will receive the initial data.
* process  
  This is the feather of element.
  You can get initial data by calling `this.getInputData()`.  
  And you should call `this.saveProcessData(data)` at the end.
* output  
  This will be called outside to get result of this element.

### circuit
Circuit extends element, but has one more interface `append`.  
There are two types: parallel circuit and serial one.  
You can append other circuits and elements.  

### line
Line extends circuit, but has one more interface `switch`.
You can pass `on` or `off` to `switch`.
A line combines some circuits or elements.

See more detail with [wiki](https://github.com/maelon/jCircuit/wiki)

# For developer
