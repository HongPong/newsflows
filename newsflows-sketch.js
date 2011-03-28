// newsflows 0.0.0 Processing.js sketch
//

// definitions
float frame = 0; // we start at frame 0  
float framerate = 24; // our "sketch" will have a framerate of 24 frames per second.  

void setup()
{
  size(800,200);
  frameRate(framerate);
  stroke(#000000); // set the default shape outline colour
  fill(#FFFFCC); // set the default shape fill colour 

}

void draw()
{
  frame++; // note that we're one frame further than last time  


}
/////////// INTERFACES

interface InfoDroplet {

  void iterateDroplet();
  void changeWeight(int weight); // TODO for incoming vote results
  
  
  // infodroplet vars
  float timestamp_created;
  String title;
  int nid; // unique node id
  String style = "default";
  String objectModel = "default"; // for collision settings
  String body = "body";
  String author;
  String sourceURL;
  Object imagefield;
  int voteUp; // value of upvote
  int voteDown;
  float velocity_X;
  float velocity_Y;
  float velocity_Z;
  float weight;
  int width = 200;
  int height = 75;
  String tags[];
  int ttl; // time to live in frames  
}

interface Nozzle {
  void iterateNozzle();
  void createDroplet();
  void onNozzle();
  void offNozzle();
  void emptyNozzle(); // fires when array = 0
  int xPos;
  int yPos;
  int zPos;
  String flowModel = "default"; // constant, random, density more=faster, off, spew left,
  // could include initial velocity values
  float flowRate;
  float flowRate_Random;
  XMLElement[] feedItemArray;
  String backgroundImage; //path
}

interface Physics   // via http://processingjs.org/reference/articles/PomaxGuide
    {  
      // collision modifies the two force vectors in place. Nothing is returned.  
      void collide_objects(float[] forcevector1, float[] forcevector2, float collisionangle);  
      
      // get force vector returns a force vector  
      float[] get_force_vector(float[] startpoint, float[] distancevector, float acceleration);  
      
      // trajectory calculation returns a curve, represented as a lest of 2D coordinates  
      float[][] get_trajectory(float[] startpoint, float objectmass, float[] initialvector, float[] gravityvector, float gravitystrength);
    }  

//////////// IMPLEMENTATIONS!

class NewsDroplet extends InfoDroplet
{

  // startup vars
  
  NewsDroplet( ) { // constructor
    
    
  }
  
  void iterateDroplet() {
    step++;
    ttl--;
    if (this.ttl < 1) {
      this.deleteDroplet();
  }
  
  void deleteDroplet() {
    // remove droplet from flowsketch's array
  }
}

class InfoNozzle extends Nozzle
{
  InfoNozzle() {
    //constructor
  }
}


///////////// HANDLERS
void mousePressed() {

}
void mouseReleased() {

}
