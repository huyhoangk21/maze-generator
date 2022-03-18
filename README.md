<div id="top"></div>

<!-- PROJECT LOGO -->
<div align="center">
<!--   <img src="/src/assets/maze.svg" alt="Logo"/> -->

  <h3 align="center">Maze Generation Visualizer</h3>

  <p align="center">
    <p align="center">A TypeScript React app that demonstrates how some maze generation algorithms work!</p>
    <a href="https://hoangple-maze.netlify.app" target="_blank">View Demo</a>
  </p>
</div>
<br/>
<br/>

<!-- TABLE OF CONTENTS -->
### Table of Contents
<ol>
  <li>
    <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
  </li>
  <li>
    <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
  </li>
  <li><a href="#algorithms">Algorithms</a></li>
      <ul>
        <li><a href="#randomized-depth-first-search">Randomized Depth-First Search</a></li>
        <li><a href="#randomized-kruskals">Randomized Kruskal's</a></li>
        <li><a href="#randomized-prims">Randomized Prim's</a></li>
        <li><a href="#wilsons">Wilson's</a></li>
        <li><a href="#aldous-broder">Aldous Broder</a></li>
      </ul>
  <li><a href="#improvement">Improvement</a></li>

</ol>

<!-- ABOUT THE PROJECT -->
## About The Project

This is a visualizer for some of the most common algorithms used to generate solvable maze. The visualizer provides options for users to adjust the size of a maze, change the delay of the animation, and select a maze generator from a list of 5 algorithms.

### Built With

* [React.js](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Follow these simple steps to get a local copy of this application up and running.

### Prerequisites

Have Node.js and npm already installed in your local machine.

For those of you who haven't already. Follow this [doc](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) for steps of installation.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/huyhoangk21/maze-generator.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start the application
   ```sh
   npm start
   ```

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- ALGORITHMS -->
## Algorithms

The maze can be generated starting with a grid of cells, each of which has 4 walls enclosing it. Hence, the maze can be effectively represented as a connected graph where cells are vertices and walls are edges to adjacent vertices. Thus, to form a passage is to remove walls between cells.

### Randomized Depth-First Search

This algorithm is also known as "recursive backtracker". It works similar like depth-first search but at each iteration we choose an adjacent node at random. I implemented this iteratively by using a stack. Here is the pseudocode:

<ol type="1">
  <li>Pick a random cell as a starting point and push it to the stack</li>
  <li>Mark the cell as visited</li>
  <li>While the stack is not empty</li>
  <ol type="1">
    <li>Peek the cell from stack and make it a current cell</li>
    <li>Choose a random adjacent unvisited cell</li>
    <li>If there is such a cell</li>
    <ol type="1">
      <li>Remove walls between current cell and the chosen cell</li>
      <li>Push the chosen cell to the stack and mark it as visited</li>
    </ol>
    <li>Else</li>
    <ol type="1">
      <li>Pop the current cell from the stack</li>
    </ol>
  </ol>
</ol>

This algorithm is biased in the sense that it will generate mazes with long passageways and low branching factor because it will explore as deep as it can before branching out.
     
<p align="right">(<a href="#top">back to top</a>)</p>

### Randomized Kruskal's

Kruskal's algorithm is used to find a minimum spanning tree in a connected graph. A maze is like a spanning tree where each cell is reachable from any cell. The randomized version picks a wall randomly and decide to remove the wall and connect 2 cells if they are not reachable from each other. We can use a disjoint set data structure to implement this algorithm because it gives us amortized constant time for lookup and join. Assuming that you already have the data structure, here is the pseudocode for the algorithm:

<ol type="1">
  <li>Initially each cell belongs to its own set</li>
  <li>Create a list of all walls and shuffle it</li>
  <li>While the number of components in the disjoint set is not 1</li>
  <ol type="1">
    <li>Pop a wall from the list</li>
    <li>If the cells divided by this wall do not belong to the same set</li>
    <ol type="1">
      <li>Remove walls between the cells</li>
      <li>Join the sets of two cells</li>
    </ol>
  </ol>
</ol>

This algorithm is biased because it tends to generate mazes with high branching factor (i.e. many short deadends), which is the opposite of the randomized DFS above.

<p align="right">(<a href="#top">back to top</a>)</p>

### Randomized Prim's

Prim's algorithm is a greedy algorithm that finds a minimum spanning tree. As said earlier, a maze is a minimum spanning tree itself, so it can be created by using this algorithm. Here is the pseudocode:

<ol type="1">
  <li>Pick a random cell and mark it as visited</li>
  <li>Add the walls of the cell to the wall list</li>
  <li>While the wall list is not empty</li>
  <ol type="1">
    <li>Pop a wall randomly from the list</li>
    <li>If one of the cells divided by this wall is unvisited</li>
    <ol type="1">
      <li>Remove walls between the cells</li>
      <li>All the walls of the unvisited cell to the wall list</li>
      <li>Mark the unvisited cell as visited</li>
    </ol>
  </ol>
</ol>

Similar to Kruskal's algorithm, this algorithm is biased and the generated mazes usually have high branching factor and favor short deadends.
<p align="right">(<a href="#top">back to top</a>)</p>

### Wilson's

Unlike the previous algorithms, Wilson's algorithm is unbiased and the resulting mazes will not contain many long corridors or short deadends. It uses random walks to create a passageways and removes loops in the walks before constructing paths. Here is the pseudocode:

<ol type="1">
  <li>Pick a random cell and mark it as visited</li>
  <li>While there is an unvisited cell</li>
  <ol type="1">
    <li>Pick a random unvisited cell and start a walk from there</li>
    <li>Keep walking to a random adjacent cell</li>
    <ol type="1">
      <li>If there is a loop in the walk</li>
      <ol type="1">
        <li>Remove the loop</li>
      </ol>
      <li>If we walk to a visited cell</li>
       <ol type="1">
        <li>Constructing a path from the starting cell to the visited cell</li>
        <li>End the walk</li>
      </ol>
    </ol>
  </ol>
</ol>

I find the visualizer for this algorithm is the most challenging to implement, partly because my React Maze component does not support efficient loops erasing function. The algorithm starts slow but will incrementally converge faster towards the end, which is the opposite of the Aldous Broder algorithm below. 

<p align="right">(<a href="#top">back to top</a>)</p>

### Aldous Broder

Similar to Wilson's, Aldous Broder algorithm produces unbiased, uniform mazes. Unlike Wilson's, this algorithm converges rather poorly towards the end where most of the cells are visited. It is an inefficient algorithm and frustrating to look at. The pseudocode for this algorithm is as follows:

<ol type="1">
  <li>Pick a random cell as current cell and mark it as visited</li>
  <li>While there is an unvisited cell</li>
  <ol type="1">
    <li>Pick a random adjacent cell</li>
    <li>If the chosen cell is not visited</li>
    <ol type="1">
      <li>Remove the walls between the current and the chosen cell</li>   
    </ol>
    <li>Make the chosen cell current cell</li>
  </ol>
</ol>


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- IMPROVEMENTS -->
## Improvement

Currently once an algorithm starts, it takes over the control of the app and disallows users to interact with the app until the algorithm is done. A possible reason for this behavior is that I use async/await with Promise to delay state update inside loops, thus making the algorithm asynchronous. The delay is necessary to show what has or hasn't been changed **during** each iteration because React batches state update inside loops. Here are some possible fixes:

1. Wrap the delay function inside a cancellable promise that will cancel when the app state change (i.e. when a user clicks stop button)
2. Create something similar to a "loop" with setInterval that runs after a certain tick interval. Doing so removes the need of using the async delay function and makes the algorithm synchronous.

<p align="right">(<a href="#top">back to top</a>)</p>
